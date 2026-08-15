import {parseStringPromise}  from 'xml2js';




/**
 *
 * @param {Buffer} xml
 * @returns Object with gpx details
 * @Definition Gets a track xml and converts it into an useable javascript object. Inorder to convert
 * a track of an gpx file, please use the xml2gpxTrack() version.  
 */
export function xml2gpxTrack(xml) {
    return parseStringPromise(xml)
        .then((formattedGpx => {
            // Sample return object
            const gpx = {
                routes: [
                    {
                        points: [],
                        distance: {
                            total: 0,
                        },
                    },
                ],
                elevationDifference: 0,
                elevation: {
                    min: 0,
                    max: 0,
                },
            };

            const routes = formattedGpx.gpx.rte[0].rtept;
            const heights = getHeights(gpx,routes);
            

            // Get the points from the given gpx object
            const points = gpx.routes[0].points;

            // Calculate Distance
            const totalDistance = calculateDistance(points);

            // Set the distance
            gpx.routes[0].distance.total = totalDistance;

            // Determine the max and min
            gpx.elevation.max = Math.max(...heights);
            gpx.elevation.min = Math.min(...heights);
            gpx.elevationDifference = Math.abs(gpx.elevation.max - gpx.elevation.min);

            return gpx;
        }))
}

/**
 *
 * @param {Buffer} xml
 * @returns Object with gpx details
 * @Definition Gets a Workout xml file and converts it into an useable javascript object. Inorder to convert
 * a track of an gpx file, please use the xml2gpxTrack() version.  
 */
export function xml2gpxWorkout(xml) {
    return parseStringPromise(xml)
        .then((formattedGpx => {
            // Sample return object
            const gpx = {
                routes: [
                    {
                        points: [],
                        distance: {
                            total: 0,
                        },
                    },
                ],
                elevationDifference: 0,
                elevation: {
                    min: 0,
                    max: 0,
                },
            };

            const routes = formattedGpx.gpx.trk[0].trkseg[0].trkpt;
            const heights = getHeights(gpx,routes);
            const startTime = Date.parse(routes[0].time);
            const endTime = Date.parse(routes[routes.length-1].time);
            

            // Get the points from the given gpx object
            const points = gpx.routes[0].points;

            // Calculate Distance
            const totalDistance = calculateDistance(points).toFixed(2);

            // Set the distance
            gpx.routes[0].distance.total = totalDistance;

            // Determine the max and min
            gpx.elevation.max = Math.max(...heights);
            gpx.elevation.min = Math.min(...heights);
            gpx.elevationDifference = Math.abs(gpx.elevation.max - gpx.elevation.min);

            return gpx;
        }))
}


/**
 * 
 * @param {Int16Array} routes 
 * @returns {Array} heights
 */
function getHeights(gpx, routes = []) {
    const heights = [];

    // format lines
    for (const route of routes) {
        const {$, ele, time} = route
        const height = ele[0];
        const { lat, lon } = $;

        gpx.routes[0].points.push({
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            height: parseFloat(height),
        });

        heights.push(parseFloat(height));
    }
    return heights;
}

function calculateDistance(points = []) {
    let totalDistance = 0;
    for (let i = 0; i < points.length - 1; i++) {
        const coord1 = [points[i]['lat'], points[i]['lon']];
        const coord2 = [points[i + 1]['lat'], points[i + 1]['lon']];

        const distance = haversine_distance(coord1, coord2);

        totalDistance += distance;
    }
    return totalDistance;
}

/**
 * 
 * @param {Object} coord1 
 * @param {Object} coord2 
 * @returns Distance {Number} between coord1 and coord2
 * @Definition calculates the distance between coord1 and coord2 using
 * the haversine distance, see https://en.wikipedia.org/wiki/Haversine_formula
 * for more details.
 */
function haversine_distance(coord1, coord2) {
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = coord1[0] * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = coord2[0] * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (coord2[1] - coord1[1]) * (Math.PI / 180); // Radian difference (longitudes)

    const d =
        2 *
        R *
        Math.asin(
            Math.sqrt(
                Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                    Math.cos(rlat1) *
                        Math.cos(rlat2) *
                        Math.sin(difflon / 2) *
                        Math.sin(difflon / 2),
            ),
        );

    // Converts miles into kilometers
    return d * 1.60934;
}
 
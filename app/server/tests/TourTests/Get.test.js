import checkPropertiesOfObjects from '../../src/util/objectChecker.js';
import formData from '../data/tours/formdata.js';
import tours from '../data/tours/tours.js';
import server from '../../server.js';
import request from 'supertest';
import assert from 'assert';
import fs from 'node:fs';
import path from 'path';


let createdTours = [];

describe('Tour GET Endpoint', function () {
    before((done) => {
        setTimeout(done, 1000);
    })

    beforeEach(async () => {
        await server.databaseConfig.dropCurrentDatabase(server.databaseConfig.connectionString);
    });

    describe('Happy Flow: Get all tours -> 200-OK', () => {
        it('It should get 3 tours and return a 200-OK', async () => {
            for (let i = 0; i < 3; i++) {
                const req = request(server).post('/api/tours');

                Object.entries(formData[i]).forEach(([key, value]) => {
                    req.field(key, value);
                });
                req.set('Content-Type', 'multipart/form-data');
                req.attach(
                    'xml_file',
                    fs.createReadStream(path.resolve(`./tests/data/tours/tour_${i + 1}.gpx`)),
                );

                // Check if everything went like planned.
                const res = await req.expect('Content-Type', /json/).expect(201);

                const body_post = res.body;

                createdTours.push(body_post);

                assert.equal(
                    checkPropertiesOfObjects(
                        body_post,
                        tours[i],
                        '_id',
                        'gpx_data',
                    ),
                    true,
                    'Objects need to match!',
                );
            }

            const res = await request(server)
                .get('/api/tours')
                .expect('Content-Type', /json/)
                .expect(200);

            const body = res.body;
            assert.equal(Array.isArray(body), true, 'Body needs to have the tours');
            assert.equal(body.length, 3, 'The Number of Tours needs to be 3');

            for (let i = 0; i < createdTours.length; i++) {
                assert.equal(checkPropertiesOfObjects(body[i], createdTours[i], 'images', '_id'), true, 'Objects need to match.')
            }
        });

        it('It should get 2 tours and return a 200-OK', async () => {

            for (let i = 0; i < 2; i++) {
                const req = request(server).post('/api/tours');

                Object.entries(formData[i]).forEach(([key, value]) => {
                    req.field(key, value);
                });
                req.set('Content-Type', 'multipart/form-data');
                req.attach(
                    'xml_file',
                    fs.createReadStream(path.resolve(`./tests/data/tours/tour_${i + 1}.gpx`)),
                );

                // Check if everything went like planned.
                const res = await req.expect('Content-Type', /json/).expect(201);

                const body_post = res.body;

                createdTours.push(body_post);

                assert.equal(
                    checkPropertiesOfObjects(
                        body_post,
                        tours[i],
                        '_id',
                        'gpx_data',
                    ),
                    true,
                    'Objects need to match!',
                );
            }

            const res = await request(server)
                .get('/api/tours')
                .expect('Content-Type', /json/)
                .expect(200);

            const body = res.body;
            assert.equal(Array.isArray(body), true, 'Body needs to have the tours');
            assert.equal(body.length, 2, 'The Number of Tours needs to be 3');

            for (let i = 0; i < createdTours.length; i++) {
                assert.equal(checkPropertiesOfObjects(body[i], createdTours[i], 'images', '_id'), true, 'Objects need to match.')
            }
        });

        it('It should get 1 tours and return a 200-OK', async () => {

            for (let i = 0; i < 1; i++) {
                const req = request(server).post('/api/tours');

                Object.entries(formData[i]).forEach(([key, value]) => {
                    req.field(key, value);
                });
                req.set('Content-Type', 'multipart/form-data');
                req.attach(
                    'xml_file',
                    fs.createReadStream(path.resolve(`./tests/data/tours/tour_${i + 1}.gpx`)),
                );

                // Check if everything went like planned.
                const res = await req.expect('Content-Type', /json/).expect(201);

                const body_post = res.body;

                createdTours.push(body_post);

                assert.equal(
                    checkPropertiesOfObjects(
                        body_post,
                        tours[i],
                        '_id',
                        'gpx_data',
                    ),
                    true,
                    'Objects need to match!',
                );
            }

            const res = await request(server)
                .get('/api/tours')
                .expect('Content-Type', /json/)
                .expect(200);

            const body = res.body;
            assert.equal(Array.isArray(body), true, 'Body needs to have the tours');
            assert.equal(body.length, 1, 'The Number of Tours needs to be 3');

            for (let i = 0; i < createdTours.length; i++) {
                assert.equal(checkPropertiesOfObjects(body[i], createdTours[i], 'images', '_id'), true, 'Objects need to match.')
            }
        });
    });

    describe('Get One Tour by ID -> 200 - OK', () => {
        it('It should get one tour and return a 200-OK', async () => {
            const req = request(server).post('/api/tours');

            Object.entries(formData[0]).forEach(([key, value]) => {
                req.field(key, value);
            });
            req.set('Content-Type', 'multipart/form-data');
            req.attach(
                'xml_file',
                fs.createReadStream(path.resolve(`./tests/data/tours/tour_1.gpx`)),
            );

            // Check if everything went like planned.
            const res_post = await req.expect('Content-Type', /json/).expect(201);

            const body_post = res_post.body;

            assert.equal(
                checkPropertiesOfObjects(
                    body_post,
                    tours[0],
                    '_id',
                    'gpx_data',
                ),
                true,
                'Objects need to match!',
            );

            const res = await request(server)
                .get(`/api/tours/${body_post['_id']}`)
                .expect('Content-Type', /json/)
                .expect(200);

            const body = res.body;
            assert.equal(typeof body, 'object', 'Body needs to have a tour');
            assert.equal(checkPropertiesOfObjects(body, body_post, '_id', 'images', 'timeStamp'), true, 'Objects need to match.')
        });
    });

    describe('Get One Tour by ID -> 404 - Not Found', () => {
        it('It should get no tour and return a 404 - Not Found', async () => {
            const res = await request(server)
                .get('/api/tours/671fd68d369d01ef9919f810')
                .expect('Content-Type', /json/)
                .expect(404);

            const body = res.body;
            assert.equal(typeof body, 'object', 'Body needs to have an error object');
            assert.equal(body['status-code'] != null, true, '404');
            assert.equal(body['message'] != null, true, 'Tour not found');
        });
    });
});
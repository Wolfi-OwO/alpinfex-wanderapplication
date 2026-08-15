import checkPropertiesOfObjects from '../../src/util/objectChecker.js';
import formData from '../data/tours/formdata.js';
import tours from '../data/tours/tours.js';
import server from '../../server.js';
import request from 'supertest';
import assert from 'assert';
import fs from 'node:fs';
import path from 'path';

describe('Tour PUT Endpoint', function () {
    before((done) => {
        setTimeout(done, 1000);
    })

    beforeEach(async () => {
        await server.databaseConfig.dropCurrentDatabase(server.databaseConfig.connectionString);
    });

    describe('PUT - Happy Flow -> 200 OK', () => {
        it ('it should update an existing objects description', async () => {
            const req = request(server).post('/api/tours');

            Object.entries(formData[0]).forEach(([key, value]) => {
                req.field(key, value);
            });
            req.set('Content-Type', 'multipart/form-data');
            req.attach(
                'xml_file',
                fs.createReadStream(path.resolve(`./tests/data/tours/tour_1.gpx`)),
            );

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

            const req_put = request(server).put('/api/tours');
            req.set('Content-Type', 'application/json');

            const updateObject = {
                heading: 'New Heading',
                condition: 2,
                technique: 5,

            }

            req.set('body', updateObject);
            
            const res_update = await req.expect('Content-Type', /json/).expect(200)
            

        });
    });

    describe('PUT - Alternate Flow -> 404 Not Found', () => {
        it ('it should fail to update an existing object', async () => {

        });
    });

    describe('PUT - Alternate Flow -> 400 Bad Request', () => {
        
    });

});
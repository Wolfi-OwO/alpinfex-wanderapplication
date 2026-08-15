import checkPropertiesOfObjects from '../../src/util/objectChecker.js';
import formData from '../data/tours/formdata.js';
import tours from '../data/tours/tours.js';
import server from '../../server.js';
import request from 'supertest';
import assert from 'assert';
import fs from 'node:fs';
import path from 'path';

describe('Tour POST Endpoint', function () {
    before((done) => {
        setTimeout(done, 1000);
    })

    beforeEach(async () => {
        await server.databaseConfig.dropCurrentDatabase(server.databaseConfig.connectionString);
    });

    describe('POST - Happy Flow -> 200 OK', () => {
        it('It should create a new Object in the database, which is the accessable for others', async () => {
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
            const res = await req.expect('Content-Type', /json/).expect(201);

            const body_post = res.body;

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

            // Check if it got saved in the database!
            const res_get = await request(server)
                .get(`/api/tours/${body_post['_id']}`)
                .expect('Content-Type', /json/)
                .expect(200);

            const body_get = res_get.body;
            assert.equal(
                typeof body_get,
                'object',
                'Body needs to have a tour',
            );

            assert.equal(
                checkPropertiesOfObjects(
                    body_get,
                    body_post,
                    '_id',
                    'gpx_data',
                    'images',
                ),
                true,
                'Objects need to match.',
            );
        });
    });

    describe('POST -> 400 Bad Request', () => {
        it('It should fail to create a new Object in the database, due to its missing xml file', async () => {
            const req = request(server).post('/api/tours');
            Object.entries(formData[1]).forEach(([key, value]) => {
                req.field(key, value);
            });
            req.set('Content-Type', 'multipart/form-data');

            const res = await req
                .expect('Content-Type', /json/)
                .expect(400);

            const error = res.body;

            assert.equal(
                checkPropertiesOfObjects(error, {
                    'status-code': 400,
                    message: "Validation failed: no xml file uploaded!",
                }),
                true,
                'Error Objects need to match!',
            );
        });
        it('It should fail to create a new Object in the database, due to its missing tourtype', async () => {
            const req = request(server).post('/api/tours');
            Object.entries(formData[3]).forEach(([key, value]) => {
                req.field(key, value);
            });
            req.set('Content-Type', 'multipart/form-data');
            req.attach(
                'xml_file',
                fs.createReadStream(path.resolve(`./tests/data/tours/tour_1.gpx`)),
            );

            const res = await req
                .expect('Content-Type', /json/)
                .expect(400);

            const error = res.body;

            assert.equal(
                checkPropertiesOfObjects(error, {
                    'status-code': 400,
                    message: "tours validation failed: type: Please enter the tour type",
                }),
                true,
                'Error Objects need to match!',
            );
        });
    });
});
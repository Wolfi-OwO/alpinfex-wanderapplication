import checkPropertiesOfObjects from '../../src/util/objectChecker.js';
import formData from '../data/tours/formdata.js';
import tours from '../data/tours/tours.js';
import server from '../../server.js';
import request from 'supertest';
import assert from 'assert';
import fs from 'node:fs';
import path from 'path';

let createdTours = [];

describe('Tour DELETE Endpoint', function () {
    before((done) => {
        setTimeout(done, 1000);
    })

    beforeEach(async () => {
        await server.databaseConfig.dropCurrentDatabase(server.databaseConfig.connectionString);
    });

    describe('Happy flow: Delete a Tour -> 204 No Content', () => {
        it('It should delete a tour from the database', async () => {
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
                .delete(`/api/tours/${body_post['_id']}`)
                .expect(204);

            const body = res.body;

            assert.equal(
                typeof body,
                'object',
                'Body needs to have an error object',
            );

            assert.equal(
                checkPropertiesOfObjects(body, {
                    'status-code': 204,
                    message: `Successfully deleted tour with id ${body_post['_id']}`,
                }),
                true,
                'Objects need to match!',
            );

            const res_get = await request(server)
                .get(`/api/tours/${body_post['_id']}`)
                .expect('Content-Type', /json/)
                .expect(404);

            const body_get = res_get.body;
            assert.equal(
                typeof body_get,
                'object',
                'Body needs to have an error object',
            );


            assert.equal(
                checkPropertiesOfObjects(body, {
                    'status-code': 404,
                    message: `Tour with the id ${body_post['_id']} not found`,
                }),
                true,
                'Objects need to match!',
            );
        });
    });

    describe('Alternate flow: Delete a Tour -> 404 Not Found', () => {
        it('It should fail to delete a tour from the database due to it´s wrong id', async () => {
            const res = await request(server)
                .delete(`/api/tours/672696d03becb4a1e69ff675`)
                .expect(404);

            const body = res.body;

            assert.equal(
                typeof body,
                'object',
                'Body needs to have an error object',
            );
            assert.equal(
                checkPropertiesOfObjects(body, {
                    'status-code': 404,
                    message: `Could not delete tour with the id 672696d03becb4a1e69ff675`,
                }),
                true,
                'Objects need to match!',
            );
        });
    });
});

import request from 'supertest';

import app from '../../app';
//import { response } from 'express';

describe('GET /api/v1', () => {
    it('responds with an array of users', (done) => {
        request(app)
            .get('/api/v1/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body[0]).toHaveProperty('userName');
                done();
            });
    });
});
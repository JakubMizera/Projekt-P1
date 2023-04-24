import request from 'supertest';

import app from '../../app';
import { Users } from './user.model';

//import { response } from 'express';

beforeAll(async ()=> {
    try {
        await Users.drop();
    } catch (error) {
        
    }
})

describe('GET /api/v1', () => {
    it('responds with an array of users', async () => {
        request(app)
            .get('/api/v1/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(0);
            });
    });
});
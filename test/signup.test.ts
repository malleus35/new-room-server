import express, { Request, Response } from 'express';
import request from 'supertest';
import { app } from '../src/app';

describe('make server and test login request', () => {
    it('POST /signup', async () => {
        const res = await request(app)
            .post('/api/auth/signup/')
            .send({
                id: 'maestroprog',
                pwd: '1234',
                grade: 4,
                school: 'seoultech',
                stdNum: 15109342,
            })
            .expect(200, { msg: 'Signup Success!' });
    });
});

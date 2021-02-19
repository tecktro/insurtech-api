import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer())
			.get('/')
			.expect(200)
			.expect('Hello World!');
	});

	it(`/Post bestOptionPerYear`, () => {
		return request(app.getHttpServer())
			.post('/bestOptionPerYear')
			.send({ year: 2005 })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(201)
			.expect( (res) => {
				res.body =  expect.any(Array)
			})
	});

	afterAll(async () => {
		await app.close();
	});

	it(`/Post quoteCar`, () => {
		return request(app.getHttpServer())
			.post('/quoteCar')
			.send({
				brand: "Chevrolet",
				year: 2006,
				hasAC: true
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(201)
			.expect( (res) => {
				res.body =  expect.any(Array)
			})
	});
});

import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app'
import SequelizeUser from '../database/models/SequelizeUser';
import { user, users } from './mocks/User.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Users Test', function() {
    it('should return all users', async function() {
      sinon.stub(SequelizeUser, 'findAll').resolves(users as any);
  
      const { status, body } = await chai.request(app).get('/users');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(users);
    });
  
    it('should return a user by id', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { status, body } = await chai.request(app).get('/users/1');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(user);
    });
  
    it('should return not found if the user doesn\'t exists', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
  
      const { status, body } = await chai.request(app).get('/users/1');
  
      expect(status).to.equal(404);
      expect(body.message).to.equal('User not found');
    });
  
    // it('should create a team', async function() {
    //   sinon.stub(SequelizeUser, 'create').resolves(team as any);
    // //   sinon.stub(Validations, 'validateBook').returns();
  
    //   const { id, ...sendData } = team;
  
    //   const { status, body } = await chai.request(app).post('/teams')
    //     .send(sendData);
  
    //   expect(status).to.equal(201);
    //   expect(body).to.deep.equal(team);
    // });
  
    // it.skip('shouldn\'t create a team with invalid body data', async function() {
    //   const { status, body } = await chai.request(app).post('/teams')
    //     .send({});
  
    //   expect(status).to.equal(400);
    //   expect(body.message).to.equal('teamName is required');
    // });
  
    // it('should update a team', async function () {
    //   sinon.stub(SequelizeUser, 'update').resolves([1] as any);
    //   sinon.stub(SequelizeUser, 'findByPk').resolves(team as any);
    // //   sinon.stub(Validations, 'validateBook').returns();
  
    //   const { id, ...sendData } = team;
  
    //   const { status, body } = await chai.request(app).put('/teams/1')
    //     .send(sendData);
  
    //   expect(status).to.equal(200);
    //   expect(body.message).to.equal('Team updated');
    // });
  
    // it('should return not found when the team to update does not exists', async function () {
    //   sinon.stub(SequelizeUser, 'findByPk').resolves(null);
  
    //   const { id, ...sendData } = team;
  
    //   const { status, body } = await chai.request(app).put('/teams/1')
    //     .send(sendData);
  
    //   expect(status).to.equal(404);
    //   expect(body.message).to.equal('Team 1 not found');
    // });
  
    // it('should return conflict when there is nothing to be updated', async function () {
    //   sinon.stub(SequelizeUser, 'findByPk').resolves(team as any);
    //   sinon.stub(SequelizeUser, 'update').resolves([0] as any);
  
    //   const { id, ...sendData } = team;
  
    //   const { status, body } = await chai.request(app).put('/teams/1')
    //     .send(sendData);
  
    //   expect(status).to.equal(409);
    //   expect(body.message).to.equal('There are no updates to perform in Team 1');
    // });
  
    // it('should delete a team', async function() {
    //   sinon.stub(SequelizeUser, 'destroy').resolves();
    //   sinon.stub(SequelizeUser, 'findByPk').resolves(team as any);
      
    //   const { status, body } = await chai.request(app).delete('/teams/1');
  
    //   expect(status).to.equal(200);
    //   expect(body.message).to.equal('Team deleted');
    // });
  
    // it('should return not found when the Team to delete does not exists', async function() {
    //   sinon.stub(SequelizeUser, 'findByPk').resolves(null);
      
    //   const { status, body } = await chai.request(app).delete('/teams/1')
  
    //   expect(status).to.equal(404);
    //   expect(body.message).to.equal('Team 1 not found');
    // });
  
    afterEach(sinon.restore);
  });
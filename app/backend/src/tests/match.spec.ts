import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app'
import SequelizeMatches from '../database/models/SequelizeMatches';
import { match, matches, sameteams, user } from './mocks/Match.mock';
import JwtUtils from '../utils/JwtUtils';
import Validations from '../middlewares/Validations';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Match Test', function() {
    it('should return all matches', async function() {
      sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
  
      const { status, body } = await chai.request(app).get('/matches');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matches);
    });
  
    // it('should return a user by id', async function() {
    //   sinon.stub(SequelizeMatches, 'findOne').resolves(user as any);
  
    //   const { status, body } = await chai.request(app).get('/users/1');
  
    //   expect(status).to.equal(200);
    //   expect(body).to.deep.equal(user);
    // });
  
    // it('should return not found if the user doesn\'t exists', async function() {
    //   sinon.stub(SequelizeMatches, 'findOne').resolves(null);
  
    //   const { status, body } = await chai.request(app).get('/users/1');
  
    //   expect(status).to.equal(404);
    //   expect(body.message).to.equal('User not found');
    // });
  



    // it('should create a match', async function() {
    //   sinon.stub(SequelizeMatches, 'create').resolves(match as any);
    //   sinon.stub(JwtUtils.prototype, 'verify').returns(user);
  
    //   const { id, ...sendData } = match;
  
    //   const { status, body } = await chai.request(app).post('/matches')
    //     .send(sendData).set('Authorization', 'teste');
  
    //   expect(status).to.equal(201);
    //   expect(body).to.deep.equal(match);
    // });
  
    // it.skip('shouldn\'t create a match with equal teams', async function() {
    //   const { status, body } = await chai.request(app).post('/matches')
    //     .send(sameteams);
  
    //   expect(status).to.equal(400);
    //   expect(body.message).to.equal('It is not possible to create a match with two equal teams');
    // });
    
    // it.skip('shouldn\'t create a match with a team that doenst exist', async function() {
    //     sinon.stub(SequelizeMatches, 'findByPk').resolves(null);
    //     const { status, body } = await chai.request(app).post('/matches')
    //       .send(sameteams);
    
    //     expect(status).to.equal(400);
    //     expect(body.message).to.equal('There is no team with such id!');
    //   });




    
    // it('should update a team', async function () {
    //   sinon.stub(SequelizeMatches, 'update').resolves([1] as any);
    //   sinon.stub(SequelizeMatches, 'findByPk').resolves(team as any);
    // //   sinon.stub(Validations, 'validateBook').returns();
  
    //   const { id, ...sendData } = team;
  
    //   const { status, body } = await chai.request(app).put('/teams/1')
    //     .send(sendData);
  
    //   expect(status).to.equal(200);
    //   expect(body.message).to.equal('Team updated');
    // });
  
    // it('should return not found when the team to update does not exists', async function () {
    //   sinon.stub(SequelizeMatches, 'findByPk').resolves(null);
  
    //   const { id, ...sendData } = team;
  
    //   const { status, body } = await chai.request(app).put('/teams/1')
    //     .send(sendData);
  
    //   expect(status).to.equal(404);
    //   expect(body.message).to.equal('Team 1 not found');
    // });
  
    // it('should return conflict when there is nothing to be updated', async function () {
    //   sinon.stub(SequelizeMatches, 'findByPk').resolves(team as any);
    //   sinon.stub(SequelizeMatches, 'update').resolves([0] as any);
  
    //   const { id, ...sendData } = team;
  
    //   const { status, body } = await chai.request(app).put('/teams/1')
    //     .send(sendData);
  
    //   expect(status).to.equal(409);
    //   expect(body.message).to.equal('There are no updates to perform in Team 1');
    // });
  
    // it('should delete a team', async function() {
    //   sinon.stub(SequelizeMatches, 'destroy').resolves();
    //   sinon.stub(SequelizeMatches, 'findByPk').resolves(team as any);
      
    //   const { status, body } = await chai.request(app).delete('/teams/1');
  
    //   expect(status).to.equal(200);
    //   expect(body.message).to.equal('Team deleted');
    // });
  
    // it('should return not found when the Team to delete does not exists', async function() {
    //   sinon.stub(SequelizeMatches, 'findByPk').resolves(null);
      
    //   const { status, body } = await chai.request(app).delete('/teams/1')
  
    //   expect(status).to.equal(404);
    //   expect(body.message).to.equal('Team 1 not found');
    // });
  
    afterEach(sinon.restore);
  });
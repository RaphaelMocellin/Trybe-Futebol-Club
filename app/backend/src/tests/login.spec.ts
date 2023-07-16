import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app'
import SequelizeUser from '../database/models/SequelizeUser';
import JwtUtils from '../utils/JwtUtils';
import { loginWithoutEmail, loginWithouPassword, loginFull, loginWithInvalidEmail, loginWithInvalidPassword, user } from './mocks/Login.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Login Test', function() {
    it('should login with valid credentials', async function() {
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { status, body } = await chai.request(app).post('/login').send(loginFull);
  
      expect(status).to.equal(200);
      expect(body).to.haveOwnProperty('token');
    });
  
    it('should not login with no email', async function() {
      // sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { status, body } = await chai.request(app).post('/login').send(loginWithoutEmail);
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({
        message: 'All fields must be filled'
      })
    });
  
    it('should not login with no password', async function() {
      // sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { status, body } = await chai.request(app).post('/login').send(loginWithouPassword);
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({
        message: 'All fields must be filled'
      })
    });

    it('should not login with invalid email', async function() {
      // sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { status, body } = await chai.request(app).post('/login').send(loginWithInvalidEmail);
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({
        message: 'Invalid email or password'
      })
    });
  
    it('should not login with invalid password', async function() {
      // sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
  
      const { status, body } = await chai.request(app).post('/login').send(loginWithInvalidPassword);
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({
        message: 'Invalid email or password'
      })
    });

    afterEach(sinon.restore);
  });
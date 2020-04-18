require('mocha');
let settings = require('../modules/runtime/settings');
let env = require('../modules/runtime/environments');
let deal = require('../modules/apis/deals');
let utils = require('../modules/runtime/utils');
let chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('DEALS', function () {
  let data = settings.runtimeData;
  let options = settings.options;
  let expect = settings.expect;
  this.timeout(options.apiCallTimeout);

  before('Use config from server', function () {
    settings.setEnvironment('dev');
    return env.loadAndSetConfig();
  });

  afterEach("Data cleanup.", function () {
  });

  describe('Deals Test Suite', function () {

    it('Should be able to get deals', async function () {
      // Given
      const query = '?deal_type=active&limit=10&offset=1&is_trashed=true';
      // When
      let response = await deal.get(query);
      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body[0]).to.have.property('state');
      expect(response.body[0].state).to.equal('CANCELLED');
    });

    it('Should be not be able to get deals when deal_type is missing', async function () {
      // Given
      const query = '?limit=10&offset=1&is_trashed=true';
      // When
      let response = await deal.get(query);
      // Then

      //console.log ("cia yra response:" + JSON.stringify(response.body))

      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(602) deal_type in query is required');
    });
    
    it('Should be not be able to get deals when deal_type is INVALID', async function () {
      // Given
      const query = '?deal_type=INVALID&limit=10&offset=1&is_trashed=true';
      // When
      let response = await deal.get(query);
      // Then

      //console.log ("cia yra response:" + JSON.stringify(response.body))

      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(606) deal_type in query should be one of [active signed]');
    });

    it('Should be not be able to get limit when limit is INVALID', async function () {
      // Given
      const query = '?deal_type=active&limit=INVALID&offset=1&is_trashed=true';
      // When
      let response = await deal.get(query);
      // Then

      //console.log ("cia yra response:" + JSON.stringify(response.body))

      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(601) limit in query must be of type int64: \"INVALID\"');
    });
    it('Should be not be able to get offset when offset is INVALID', async function () {
      // Given
      const query = '?deal_type=active&limit=1&offset=INVALID&is_trashed=true';
      // When
      let response = await deal.get(query);
      // Then

      //console.log ("cia yra response:" + JSON.stringify(response.body))

      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(601) offset in query must be of type int64: \"INVALID\"');
    });

    it('Should be not be able to get deals when Authorization is INVALID', async function () {
      // Given
      let Authorization = data.global.Authorization;

       //console.log ('good auth' + data.global.Authorization)

       data.global.Authorization ='fagaghsrhjjjj'; //autorizacija sugadinama ir padaroma INVALID

      // console.log ('bad auth'+ data.global.Authorization);

      const query = '?deal_type=active&limit=1&offset=1&is_trashed=true';
      // When
      let response = await deal.get(query);
      // Then

      //console.log ("cia yra response:" + JSON.stringify(response.body))

      expect(response.statusCode).to.equal(403);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('ACCESS_DENIED');
      expect(response.body.message).to.equal('Access to this API has been disallowed');
      
      data.global.Authorization=Authorization; //grazinama teisinga autorizacija

    });


  

  });
  
});

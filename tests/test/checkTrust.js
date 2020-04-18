require('mocha');
let settings = require('../modules/runtime/settings');
let env = require('../modules/runtime/environments');
let user = require('../modules/apis/users');
let chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('CHECK_TRUST', function () {
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

  describe('CHECK_TRUST Test Suite', function () {

    it('Should be able to get user by phone number', async function () {
      // Given
      const code = '370';
      const phone = '64846902'
      // When
      let response = await user.get(code, phone);
      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('address');
      expect(response.body.phone_number).to.equal('64846902');
    });

    it('Should not be able to get user when country code INVALID', async function () {
      // Given
      const code = '312345';
      const phone = '64846902'
      // When
      let response = await user.get(code, phone);
      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(603) country_code in path should be at most 4 chars long');
    });

    it('Should not be able to get user when phone number INVALID', async function () {
      // Given
      const code = '370';
      const phone = '6484690'
      // When
      let response = await user.get(code, phone);
      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('PHONE_NUMBER_INVALID');
      expect(response.body.message).to.equal('phone number invalid');
    });
    it('Should not be able to get user when phone number INVALID', async function () {
      // Given
      const code = '370';
      const phone = '6484690'
      // When
      let response = await user.get(code, phone);
      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('PHONE_NUMBER_INVALID');
      expect(response.body.message).to.equal('phone number invalid');
    });
    it('Should not be able to get user when phone number empty', async function () {
      // Given
      const code = '370';
      const phone = ''
      // When
      let response = await user.get(code, phone);
      // Then
      expect(response.statusCode).to.equal(404);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(404) path /mth/v1/users/phone/370/ was not found');
    });

    it('Should not be able to get user when country code empty', async function () {
      // Given
      const code = '';
      const phone = '64846902'
      // When
      let response = await user.get(code, phone);
      // Then
      expect(response.statusCode).to.equal(404);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(404) path /mth/v1/users/phone/64846902 was not found');
    });
    it('Should not be able to get user when country code and phone number empty', async function () {
      // Given
      const code = '';
      const phone = ''
      // When
      let response = await user.get(code, phone);
      // Then
      expect(response.statusCode).to.equal(404);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('RESOURCE_NOT_FOUND');
      expect(response.body.message).to.equal('user not found');
    });



  //  it('Should be able to call put request', async function () {
  //     // Given
  //     data.pm.first_name = utils.randomString(1, 'QWERTYUIOPLKJHGFDSAZXCVBNM') + utils.randomString(14, 'qwertyuioplkjhgfdsazxcvbnm');
  //     // When
  //     let response = await deal.putRequest();
  //     // Then
  //     expect(response.statusCode).to.equal(200);
  //     expect(response.body.data).to.have.property('first_name');
  //     expect(response.body.data.date_stamp).to.equal(utils.getDateStamp());
  //     expect(JSON.stringify(response.body)).to.contain(data.pm.first_name);
  //   });



    // it('Should be able to call post request', async function () {
    //   // Given
    //   data.pm.first_name = utils.randomString(1, 'QWERTYUIOPLKJHGFDSAZXCVBNM') + utils.randomString(14, 'qwertyuioplkjhgfdsazxcvbnm');
    //   // When
    //   let response = await deal.postRequest();
    //   // Then
    //   expect(response.statusCode).to.equal(200);
    //   expect(response.body.data).to.have.property('first_name');
    //   expect(response.body.data.date_stamp).to.equal(utils.getDateStamp());
    //   expect(JSON.stringify(response.body)).to.contain(data.pm.first_name);
    // });

    // it('Should be able to call patch request', async function () {
    //   // Given
    //   data.pm.first_name = utils.randomString(1, 'QWERTYUIOPLKJHGFDSAZXCVBNM') + utils.randomString(14, 'qwertyuioplkjhgfdsazxcvbnm');
    //   // When
    //   let response = await deal.patchRequest();
    //   // Then
    //   expect(response.statusCode).to.equal(200);
    //   expect(response.body.data).to.have.property('first_name');
    //   expect(response.body.data.date_stamp).to.equal(utils.getDateStamp());
    //   expect(JSON.stringify(response.body)).to.contain(data.pm.first_name);
    // });

    // it('Should be able to call delete request', async function () {
    //   // Given
    //   data.pm.id = utils.randomString(5, '123456789');
    //   // When
    //   let response = await deal.deleteRequest();
    //   // Then
    //   expect(response.statusCode).to.equal(200);
    //   expect(response.body.data).to.not.have.property('first_name');
    //   expect(JSON.stringify(response.body)).to.not.contain(data.pm.first_name);
    // });

  });
  
});

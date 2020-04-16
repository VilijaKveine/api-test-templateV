require('mocha');
let settings = require('../modules/runtime/settings');
let env = require('../modules/runtime/environments');
let user = require('../modules/apis/users');
let utils = require('../modules/runtime/utils');
let chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('USERS', function () {
  let data = settings.runtimeData;
  let options = settings.options;
  let expect = settings.expect;
  this.timeout(options.apiCallTimeout);

  before('Use config from server', function () {
    settings.setEnvironment('dev');
    return env.loadAndSetConfig();
  });

  afterEach("After.", function () {
     data.user.address = utils.randomString(120,'QWERTYUIOPLKJHGFDSAZXCVBNMĄČĘĖĮŠŲŪŽqwertyuioplkjhgfdsazxcvbnmąčęėįšųūž 1234567890/-');
     data.user.country_code_iso = utils.randomCountryCodeIso();
     data.user.email= utils.randomEmail();
     data.user.first_name = utils.randomString(1, 'QWERTYUIOPLKJHGFDSAZXCVBNMĄČĘĖĮŠŲŪŽ') + utils.randomString(14, 'qwertyuioplkjhgfdsazxcvbnmąčęėįšųūž');
     data.user.last_name = utils.randomString(1, 'QWERTYUIOPLKJHGFDSAZXCVBNMĄČĘĖĮŠŲŪŽ') + utils.randomString(24, 'qwertyuioplkjhgfdsazxcvbnmąčęėįšųūž');
     
  });

  describe('Users Test Suite', function () {

    it('Should be able to update user', async function () {
      // Given
      data.user.address=utils.randomString(120,'QWERTYUIOPLKJHGFDSAZXCVBNMĄČĘĖĮŠŲŪŽqwertyuioplkjhgfdsazxcvbnmąčęėįšųūž 1234567890/-');
      data.user.country_code_iso = utils.randomCountryCodeIso();
      data.user.email=utils.randomEmail();
      data.user.first_name = utils.randomString(1, 'QWERTYUIOPLKJHGFDSAZXCVBNMĄČĘĖĮŠŲŪŽ') + utils.randomString(14, 'qwertyuioplkjhgfdsazxcvbnmąčęėįšųūž');
      data.user.last_name = utils.randomString(1, 'QWERTYUIOPLKJHGFDSAZXCVBNMĄČĘĖĮŠŲŪŽ') + utils.randomString(24, 'qwertyuioplkjhgfdsazxcvbnmąčęėįšųūž');

      // When
      let response = await user.put();
     //console.log(response.body)
      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('address');
      expect(response.body.phone_number).to.equal("64846902");

      expect(response.body.address).to.equal(data.user.address);
      expect(response.body.country_code_iso).to.equal(data.user.country_code_iso);
      expect(response.body.email).to.equal(data.user.email);
      expect(response.body.first_name).to.equal(data.user.first_name);
      expect(response.body.last_name).to.equal(data.user.last_name);
      
      
    });

    it('Should not be able to update user when email is invalid', async function () {
      // Given
    
      data.user.email = utils.randomInvalidEmail();
  
      // When
      let response = await user.put();
      
      // Then
      //console.log(response.body)
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal("VALIDATION_ERROR");
      expect(response.body.message).to.equal(`(601) email in body must be of type email: "${data.user.email}"`);
     
    });

  it('Should not be able to update user when country_code_iso is invalid', async function () {

      // Given
    
     data.user.country_code_iso = utils.randomCountryCodeIso + 'h';
  
      // When
    let response = await user.put();
      
       // Then
      // console.log(response.body)
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal("VALIDATION_ERROR");
      expect(response.body.message).to.equal("not valid country code ISO");
      
      
    });

    it('Should not be able to update user when first_name is invalid', async function () {

      // Given
    
     data.user.first_name = '213LTv';
  
      // When
    let response = await user.put();
      
       // Then
       //console.log(response.body)
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal("INVALID_FIRST_NAME");
      expect(response.body.message).to.equal('(605) first_name in body should match \'only letters\'');
      
    });
    
    it('Should not be able to update user when last_name is invalid', async function () {

      // Given
    
     data.user.last_name = '213LTv';
  
      // When
    let response = await user.put();
      
       // Then
      // console.log(response.body)
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal("INVALID_LAST_NAME");
      expect(response.body.message).to.equal('(605) last_name in body should match \'only letters\'');
      
    });
    
    it('Should not be able to update user when address is too long', async function () {

      // Given
    
     data.user.address = utils.randomString(256,'QWE');
  
      // When
    let response = await user.put();
      
       // Then
       //console.log(response.body)
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal("VALIDATION_ERROR");
      expect(response.body.message).to.equal('(603) address in body should be at most 255 chars long');
      
    });
  
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

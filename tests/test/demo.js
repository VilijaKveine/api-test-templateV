require('mocha');
let chai = require('chai'), chaiHttp = require('chai-http');
let settings = require('../modules/runtime/settings');
chai.use(chaiHttp);
describe('Test Group', function () {
  let expect = settings.expect;
  before('Before', function () {
    console.log("Ivyksta pries testa");
  });
  after("After", function () {
    console.log("Ivyksta po testa");
  });
  describe('Test suite', function () {
    it('Test step 1', async function () {
      console.log("Vyksta testas");
      // Given
      // When
      // Then
      expect("A").to.equal("A");
    });
});
});
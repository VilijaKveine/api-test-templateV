let utils = require('./utils');

(function () {
  // define global data and default values - subject to change during runtime
  let data = {
    global: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODg0Mjg5OTMsImlhdCI6MTU4NTgzNjk5MywibmJmIjoxNTg1ODM2OTkzLCJpZCI6NjYyNiwiY2lkIjo2NjQ5MSwiZGV2X2lkIjoic3RyaW5nIn0.ISAgQTTBM2qzN4mUXka3qL3S-qNVdQ0AdtQqCVm3VBc ',
      newparam: "erwyrgkr"
    },
    user: {
      address: "ggngggg",
      country_code_iso: "LT",
      email: "email@email.com",
      first_name: "pavasaris",
      last_name: "vasaraitis",
      country_code: "370",
      device_id: "dsfafaf",
      phone_number: "64846902"
    }
  };
  exports.getDefaultEmptyValue = function () {
    return null;
  };
  exports.getAll = function () {
    return data;
  };
})();

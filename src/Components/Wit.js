const {Wit, log} = require('node-wit');

const Client = new Wit({
  accessToken: "ENTER SERVER ACCESS TOKEN HERE!",
  logger: new log.Logger(log.DEBUG) // optional
});

export default Client;
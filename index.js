const http = require('http');
const config = require('./server/config');
const { connect } = require('./server/database');
const app = require('./server');

const { mongodb_uri: uri, port } = config;

connect(uri);
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});

const http = require('http');
const route = require('./create-user');

const server = http.createServer(route);

server.listen(3000);
// first file to create 

const server = require('./server.js');

const port = process.env.PORT || 8000;

server.listen(port, () => 
console.log (`\n*** server is running on port ${port} ***\n`), 
)
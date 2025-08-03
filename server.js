const http = require('http');

const router = require('./src/router');

const server = http.createServer(router);
const port = 3000;

server.listen(port, () => {
  console.log(
    `Server is listening on port ${port} . Ready to accept requests! `
  );
});














//const fs = require('fs');
//const path = require('path');
// const { error } = require('console');
//const querystring = require('querystring');

// const fs = require('fs');
// const path = require('path');
// // ...existing code...

// const router = (request, response) => {
//   const endpoint = request.url;
//   const method = request.method;

//   // Serve static files from /public
//   const publicPath = path.join(__dirname, '..', 'public');
//   const filePath = path.join(publicPath, endpoint);

//   // Check if the request is for a static file
//   if (
//     endpoint.startsWith('/main.css') ||
//     endpoint.startsWith('/img/') ||
//     endpoint.startsWith('/favicon.ico')
//   ) {
//     fs.readFile(filePath, (err, data) => {
//       if (err) {
//         response.writeHead(404, { 'Content-Type': 'text/plain' });
//         response.end('Not found');
//       } else {
//         // Set correct content-type
//         let contentType = 'text/plain';
//         if (endpoint.endsWith('.css')) contentType = 'text/css';
//         else if (endpoint.endsWith('.jpg') || endpoint.endsWith('.jpeg')) contentType = 'image/jpeg';
//         else if (endpoint.endsWith('.png')) contentType = 'image/png';
//         else if (endpoint.endsWith('.ico')) contentType = 'image/x-icon';
//         response.writeHead(200, { 'Content-Type': contentType });
//         response.end(data);
//       }
//     });
//     return; // Stop further routing
//   }

//   // ...existing code...
// };

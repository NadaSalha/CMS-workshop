// const message = 'I am so happy to be part of the Node Girls workshop!';

// const fs = require('fs');
// const path = require('path');
// const querystring = require('querystring');

// function readFile(filePath, response) {
//   fs.readFile(filePath, (error, file) => {
//     if (error) {
//       console.log(error);
//       return;
//     } else {
//       response.writeHead(200, { 'Content-Type': 'text/html' });
//       response.end(file);
//     }
//   });
// }
// const router = (request, response) => {
//   const endpoint = request.url;
//   const method = request.method;

//   console.log(`Request for ${endpoint} received.`);
//   console.log(`Method used: ${method}`);

//   if (endpoint === '/') {
//     const filePath = path.join(__dirname, '..', 'public', 'index.html');
//     readFile(filePath, response);

//   } else if (endpoint === '/node') {
//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     response.end('Node.js is awesome!');
//   } else if (endpoint === '/girls') {
//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     response.end('Welcome to the Girls page !');
//   } else if (endpoint === '/create-post') {
//     let allData = '';
//     request.on('data', (chunk) => {
//       allData += chunk;
//     });
//     request.on('end', () => {
//       const convertedData = querystring.parse(allData);
//       console.log(convertedData);
//       response.writeHead(200, { 'Content-Type': 'text/html' });
//       response.end(
//         `<h1 class="text-3xl italic  font-bold underline "> Your Message :</h1> <p>${convertedData.blogpost}</p>`
//       );
//     });
//   } else {
//     response.writeHead(404, { 'Content-Type': 'text/html' });
//     response.end('<h1>Page Not Found!</h1>');
//   }

//   // if(endpoint ==='/'){

//   //     const filePath = path.join(__dirname,'public','index.html');
//   //     fs.readFile(filePath,(error,file)=>{
//   //         if(error){
//   //             console.log(error);
//   //              return;

//   //          }else{

//   //                   response.writeHead(200, {'Content-Type':'text/plain'});
//   //           response.end(file);
//   //          }

//   //     })
//   //     fs.readFile('path to the file ', callback);
//   //     path.join([...path]);

//   // }else if(endpoint === '/node'){

//   // }else if(endpoint === '/girls'){

//   // }else if (endpoint === '/create-post'){
//   //     //when data is arrive , do something
//   //     let allData='';
//   //     request.on('data',chunkOfData =>{
//   //         allData+=chunkOfData;
//   //     });

//   //     request.on('end',()=>{
//   //         const convertedData = querystring.parse(allData);
//   //         console.log(convertedData);
//   //         response.writeHead(200, {"Content-Type": "text/html"});
//   //         response.end();
//   //     });
//   // }else{
//   //     response.writeHead(404,{'Content-Type':'text/html'})
//   //     response.end('<h1>Page Not Found!</h1>')
//   // }

//   //   response.writeHead(200, { "Content-Type": "text/plain" });
//   //   response.end(message);
// };

// module.exports = router;

const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const { json } = require('stream/consumers');

//Save your blog post data into posts.json
///GET/POSTS

function readStaticFile(filePath, contentType, response) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('File not found');
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(data);
    }
  });
}
const router = (request, response) => {
  const method = request.method;
  const endpoint = request.url;
  if (endpoint === '/' || endpoint === 'index.html') {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    readStaticFile(filePath, 'text/html', response);

  } else if (endpoint === '/public/script.js') {
    const scriptPath = path.join(__dirname, '..', 'public', 'script.js');
    readStaticFile(scriptPath, 'application/javascript', response);

  } else if (endpoint === '/public/main.css') {
    const cssPath = path.join(__dirname, '..', 'public', 'main.css');
    readStaticFile(cssPath, 'text/css', response);

  } else if (endpoint === '/public/favicon.ico') {
    const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico');
    readStaticFile(faviconPath, 'image/x-icon', response);

  } else if (endpoint === '/public/img/image.png') {
    const logoPath = path.join(__dirname, '..', 'public', 'img', 'image.png');
    readStaticFile(logoPath, 'image/png', response);

  } else if (endpoint === '/public/img/logo1.png') {
    const logoPath = path.join(__dirname, '..', 'public', 'img', 'logo1.png');
    readStaticFile(logoPath, 'image/png', response);

  } else if (endpoint === '/public/img/logo2.png') {
    const logoPath = path.join(__dirname, '..', 'public', 'img', 'logo2.png');
    readStaticFile(logoPath, 'image/png', response);

  } else if (method === 'GET' && endpoint === '/posts') {
    const filePath = path.join(__dirname, 'posts.json');
    readStaticFile(filePath , 'application/json', response);

  } else if (method === 'POST' && endpoint === '/create-post') {
    let allData = '';
    request.on('data', (chunk) => {
      allData += chunk;
    });
    request.on('end', () => {
    //  const postData =  querystring.parse(allData);

      const filePath = path.join(__dirname, 'posts.json');
      fs.readFile(filePath, 'utf-8', (error, data) => {
        if (error) {
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Internal Server Error');
          return;
        } else {
          const postsFile = JSON.parse(data);
           const timeNow = new Date(Date.now()).getTime().toString();
          
          postsFile[timeNow]=allData;
          fs.writeFile(
            filePath,
            JSON.stringify(postsFile, null, 2),
            (error) => {
              if (error) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Internal Server Error');
              } else {
                response.writeHead(201, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(postsFile));
              }
            }
          );
        }
      });
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h1>Page Not Found!</h1>');
  }
};

module.exports = router;

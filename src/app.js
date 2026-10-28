
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const q = Object.fromEntries(url.searchParams.entries());
  const pathname = url.pathname;

  res.setHeader('Content-Type', 'text/html');

  if (pathname === '/calc') {
    const a = Number(q.a);
    const b = Number(q.b);
    let result;

    switch (q.operation) {
      case 'add':
        result = a + b;
        break;
      case 'sub':
        result = a - b;
        break;
      case 'mul':
        result = a * b;
        break;
      case 'div':
        result = a / b;
        break;
      default:
        res.statusCode = 400;
        res.end('Operation unknown');
        return;
    }

    res.statusCode = 200;
    res.end(String(result));
    return;
  }

  if (pathname === '/fs') {
    if (q.operation === 'create') {
   const filePath = path.join(process.cwd(), q.filename);

      fs.writeFile(filePath, q.text ?? '', (err) => {
        if (err) {
          res.statusCode = 400;
          res.end('Operation unknown');
          return;
        }

        res.statusCode = 201;
        res.end(`${q.filename} was created`);
      });
      return;
    }

    if (q.operation === 'read') {
     const filePath = path.join(process.cwd(), q.filename);

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          res.statusCode = 400;
          res.end('File not found');
          return;
        }

        res.statusCode = 201;
        res.end(data);
      });
      return;
    }

    res.statusCode = 400;
    res.end('Operation unknown');
    return;
  }

  res.statusCode = 400;
  res.end('Operation unknown');
});

module.exports = app;

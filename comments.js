// Create web server
const http = require('http');
const fs = require('fs');

const comments = [];

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            // Serve HTML form for submitting comments
            fs.readFile('index.html', 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else if (req.url === '/comments') {
            // Serve comments as JSON
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(comments));
        } else {
            // Handle other routes
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    } else if (req.method === 'POST' && req.url === '/submit-comment') {
        // Handle POST requests for submitting comments
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const { name, comment } = JSON.parse(body);
            if (name && comment) {
                const newComment = { name, comment };
                comments.push(newComment);
                res.writeHead(302, { 'Location': '/' });
                res.end();
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Bad Request');
            }
        });
    } else {
        // Handle other HTTP methods
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

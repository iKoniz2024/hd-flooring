// 1. Load environment variables (.env) immediately before anything else
require('dotenv').config();

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// 2. Production settings for cPanel / CloudLinux Passenger
const dev = process.env.NODE_ENV === 'development';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

// 3. Initialize Next.js app
const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error handling request:', req.url, err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> HD Flooring ready on port ${port} (mode: ${dev ? 'dev' : 'production'})`);
    });
  })
  .catch((err) => {
    console.error('Next.js preparation failed:', err);
    process.exit(1);
  });

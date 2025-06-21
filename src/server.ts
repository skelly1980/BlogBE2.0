import http from 'http';
import { app } from './app';

const port = process.env.PORT;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Express server listening on ${process.env.BASE_URL}:${port}`);
});

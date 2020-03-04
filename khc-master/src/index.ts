import * as express from 'express';
import * as controllers from "./controllers";

const app = express();
const port = !process.env.PORT ? 3001 : typeof(process.env.PORT) === 'string' ? Number.parseInt(process.env.PORT) : 3001;

app.get('/healthz', controllers.get_healthz);

app.listen(port, '0.0.0.0', () => console.log(`http://localhost:${port}/healthz`));

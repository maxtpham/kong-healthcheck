import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as controllers from "./controllers";

const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.get('/healthz', controllers.get_healthz);
app.post('/worker', controllers.post_worker);

const port = !process.env.PORT ? 3001 : typeof(process.env.PORT) === 'string' ? Number.parseInt(process.env.PORT) : 3001;
app.listen(port, '0.0.0.0', () => {
    console.log(`[MASTER] http://localhost${port === 80 ? '' : (':' + port)}/healthz`);
});

import * as express from 'express';
import * as controllers from "./controllers";
import * as task from "./task";

const app = express();

app.get('/healthz', controllers.get_healthz);

const port = !process.env.PORT ? 3002 : typeof(process.env.PORT) === 'string' ? Number.parseInt(process.env.PORT) : 3002;
app.listen(port, '0.0.0.0', () => {
    console.log(`[WORKER-${task.NAME}] http://localhost${port === 80 ? '' : (':' + port)}/healthz`);
    task.start();
});

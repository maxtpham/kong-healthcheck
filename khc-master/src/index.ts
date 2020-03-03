import * as express from 'express';
import * as controllers from "./controllers";

const app = express();

app.get('/healthz', controllers.get_healthz);

app.listen(process.env.PORT || 3001, () => console.log(`http://localhost:${process.env.PORT || 3001}/healthz`));

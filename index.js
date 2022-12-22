const { config } = require('./config/config');
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  ormErrorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const app = express();
const port = config.port;

app.use(express.json());

app.use(cors());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Port: ' + port);
});

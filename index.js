const express = require(`express`);
const morgan = require(`morgan`);
const helmet = require(`helmet`);
const middleware = require(`./middleware`);
const setup = require(`./setup`);
// colorful console
require(`console-info`);
require(`console-warn`);
require(`console-error`);

const app = express();
setup.envSetup();
setup.dbSetup();

app.use(middleware.rateLimiter());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan(`common`));
app.use(helmet());
app.use(setup.corsSetup());

app.use(middleware.modifyResponseBody);

app.get(`/`, (_req, res) => {
  res.json({
    message: `🚀`,
  });
});

app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = process.env.PORT || 2999;
app.listen(port, () => {
  console.info(`******************************`);
  console.info(`Listening on port ${port}`);
  console.info(`******************************`);
});

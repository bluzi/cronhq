const express = require('express')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/api.routes');
const cron = require('./cron');
const logger = require('./logger');

const app = express()
const port = process.env.port || 3000;

(async () => {
    await cron.start();

    logger.success({
        message: `Cron server is running`,
        tags: ['server']
    });

    app.use(bodyParser.json());

    app.use(apiRoutes);

    app.listen(port, () => logger.success({
        message: `API is running on port ${port}`,
        tags: ['server'],
        port
    }))
})();
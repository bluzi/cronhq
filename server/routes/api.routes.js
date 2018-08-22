const express = require('express');
const logger = require('./../logger');
const cron = require('./../cron');

const router = express.Router();

router.post('/', (req, res) => {
    const time = new Date().getTime();
    const { url, interval } = req.body;

    if (!url || !interval || isNaN(parseInt(interval))) {
        const errorMessage = 'Invalid post request, send url and interval';
        return res.status(400).send({
            error: errorMessage,
            url,
            interval,
            ok: false,
        });

        logger.error({
            message: error,
            tags: ['route', 'start'],
            url,
            interval,
            time
        });
    }

    if (cron.startJob(url, interval, time)) {
        return res.status(200).send({
            ok: true,
        });

        logger.success({
            message: `Job started successfully for URL ${url}, every ${interval} seconds`,
            tags: ['route', 'start'],
            url,
            interval,
            time
        });
    } else {
        const errorMessage = 'An error occurred while trying to start job';

        return res.status(500).send({
            error: errorMessage,
            ok: false,
        });

        logger.error({
            message: error,
            tags: ['route', 'start'],
            url,
            interval,
            time
        });
    }
});

router.delete('/', (req, res) => {
    const { url } = req.body;

    if (!url || !interval || isNaN(parseInt(interval))) {
        const errorMessage = 'Invalid delete request, send url';
        return res.status(400).send({
            error: errorMessage,
            ok: false,
        });

        logger.error({
            message: error,
            tags: ['route', 'stop'],
            url,
            interval,
            time
        });
    }

    if (cron.stopJob(url)) {
        return res.status(200).send({
            ok: true,
        });

        logger.success({
            message: `Job stopped successfully for URL ${url}`,
            tags: ['route', 'stop'],
            url,
        });
    } else {
        const errorMessage = 'An error occurred while trying to stop job';

        return res.status(500).send({
            error: errorMessage,
            ok: false,
        });

        logger.error({
            message: error,
            tags: ['route', 'stop'],
            url,
        });
    }
});

module.exports = router;
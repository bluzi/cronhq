const logger = require('../logger');

class Queue {
    constructor() {
        this.queue = {};
    }

    get(time) {
        return this.queue[this.scaleTime(time)] || [];
    }

    scaleTime(time) {
        const timeInSeconds = parseInt(time / 1000);
        return timeInSeconds;
    }

    async populateQueue(jobs) {
        const basetime = new Date().getTime();
        jobs.forEach(job => {
            this.addToQueue(job, basetime);
        });

        logger.success({
            message: `Successfully populated ${jobs.length} jobs to queue`
        })

        return true;
    }

    addToQueue(job, basetime) {
        const time = this.scaleTime(basetime) + job.interval;
        
        if (!this.queue[time]) this.queue[time] = [];
        this.queue[time].push(job);

        return true;
    }

    removeFromQueue({ url }) {
        const queueIndex = this.queue.indexOf(url);
        if (queueIndex > -1) {
            this.queue.splice(queueIndex, 1);
            return true;
        }

        return false;
    }
}

module.exports = Queue;
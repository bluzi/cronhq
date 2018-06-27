const request = require('request');
const logger = require('./../logger');
const database = require('./../database');
const Queue = require('./queue');

const cronService = {
    jobs: undefined,
    queue: undefined,

    async start() {
        this.jobs = (await database.getAllJobs()) || [];
        this.queue = new Queue();
        
        await this.queue.populateQueue(this.jobs);

        this.interval = setInterval(() => {
            const time = new Date().getTime();
            this.queue.get(time).forEach(job => {
                request.post(job.url, { form: { time } }, (error) => {
                    if (error) logger.error({ 
                        message: `Error sending request to ${job.url}: ${error}`, 
                        tags: ['stop', 'database'],
                        url: job.url, 
                        error 
                    });
                    else logger.success({ 
                        message: `Request sent successfully to ${job.url}`, 
                        url: job.url 
                    });
                });

                this.queue.addToQueue(job, time);
            });
        }, 250);

        return true;
    },

    startJob(url, interval, basetime) {
        const job = {
            url,
            interval,
        };
        
        this.jobs.push(job);

        this.queue.addToQueue(job, basetime);

        database.createJob(job)
            .catch(error => logger.error({ 
                message: `Could not create job entry for ${url}: ${error}`, 
                tags: ['stop', 'database'],
                url,
                error 
            }))
            .then(() => logger.success({
                message: `Job entry created successfully for ${url}`,
                tags: ['stop', 'database'],
                url
            }));

        return true;
    },

    stopJob(url) {
        const job = this.jobs.find(job => job.url === url);
        if (job) {
            this.removeFromQueue(job);
            const jobIndex = this.jobs.indexOf(job);
            this.jobs.splice(jobIndex, 1);
            
            database.removeJob(job)
                .catch(error => logger.error({ 
                    message: `Could not create job entry for ${url}: ${error}`, 
                    tags: ['stop', 'database'],
                    url,
                    error 
                }))
                .then(() => logger.success({
                    message: `Job entry created successfully for ${url}`,
                    tags: ['stop', 'database'],
                    url
                }))

            return true;
        }

        return false;
    }
};

module.exports = cronService;
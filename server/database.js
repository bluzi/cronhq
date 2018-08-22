const Jsonstore = require('jsonstore.io');

const token = process.env.token || 'b0685daeb580c12b16cb037a1e4ecfcb0addece47c14c776061c0582b359a76f';

if (!token) throw new Error('Could not find jsonstore key');
const store = new Jsonstore(token);

const database = {
    getAllJobs() {
        return store.read('jobs')
            .then(jobs => Object.entries(jobs || {}).map(([url, interval]) => ({ url: this.decodeUrl(url), interval })));
    },

    createJob({ url, interval }) {
        const encodedUrl = this.encodeUrl(url);
        return store.write(`jobs/${encodedUrl}`, parseInt(interval));
    },

    removeJob({ url }) {
        const encodedUrl = this.encodeUrl(url);
        return store.delete(`jobs/${url}`);
    },

    encodeUrl(url) {
        return Buffer.from(url).toString('base64');
    },

    decodeUrl(encodedUrl) {
        return Buffer.from(encodedUrl, 'base64').toString('utf-8')
    }
};

module.exports = database;
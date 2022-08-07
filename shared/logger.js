/* eslint-disable no-console */
class Logger extends console.Console {
    constructor(name) {
        super({ stdout: process.stdout, stderr: process.stderr });
        this.name = name;
    }

    log(data) {
        if (process.env.NODE_ENV === 'test') return;

        console.log(`[${this.name}]`, data);
    }

    info(data) {
        if (process.env.NODE_ENV === 'test') return;

        console.info(`[${this.name}]`, data);
    }

    error(data) {
        if (process.env.NODE_ENV === 'test') return;

        console.error(`[${this.name}]`, data);
    }
}

module.exports = {
    Logger,
};

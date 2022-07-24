import { client } from '../../db/client.js';
import fs from 'fs';
import readline from 'readline';

const SUCCESS = 'Data created successfully';
const FAIL = 'Something went wrong';
const EXIT = 'Exit script. Bye!';
const WARNING = `
    This script will delete all products in the database (if it is not empty)
    and populate products table with seed values.
    Are you sure? Type \'yes\' to continue:
> `;

const logger = (...args) => {
    console.log('[SEEDER]', ...args);
}

const main = async () => {
    await client.connect();
    const sql = await fs.promises.readFile('./scripts/seed/seed.sql', {
        encoding: 'ascii'
    });
    await client.query(sql);    
    await client.end();
}

const byeFunction = () => {
    logger(EXIT);
    process.exit(0);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('close', byeFunction);

rl.question(WARNING, (answer) => {
    if (answer === 'yes') {
        main()
            .then(() => {
                logger(SUCCESS);
                rl.close();
            })
            .catch((err) => {
                logger(FAIL, err);
                process.exit(1);
            });
    } else {
        rl.close();
    }
});

import { S3 } from 'aws-sdk';
import csvParser from 'csv-parser';
import { Logger } from '../../shared/logger';

const { REGION, BUCKET } = process.env;
const UPLOAD_PATH = 'uploaded';
const PARSED_PATH = 'parsed';

class S3Service {
    constructor(options) {
        this.s3 = new S3(options);
        this.logger = new Logger(this.constructor.name);
    }

    prepareSignedUrl(fileName) {
        const params = {
            Bucket: BUCKET,
            Key: `${UPLOAD_PATH}/${fileName}`,
            Expires: 60,
            ContentType: 'text/csv',
        };

        const url = this.s3.getSignedUrl('putObject', params);

        return url;
    }

    async parseCsvFile(key) {
        const params = {
            Bucket: BUCKET,
            Key: key,
        };

        const s3Srteam = this.s3.getObject(params).createReadStream();
        const result = [];

        const fileStream = new Promise((res, rej) => {
            s3Srteam.pipe(csvParser())
                .on('data', (data) => {
                    this.logger.log(data);

                    result.push(data);
                })
                .on('error', (err) => {
                    this.logger.error(err);

                    rej(err);
                })
                .on('end', () => res());
        });

        await fileStream;
        await this.copyFile(key);

        return result;
    }

    async copyFile(key) {
        const copyParams = {
            Bucket: BUCKET,
            CopySource: `${BUCKET}/${key}`,
            Key: key.replace(UPLOAD_PATH, PARSED_PATH),
        };
        const deleteParams = {
            Bucket: BUCKET,
            Key: key,
        };

        try {
            await this.s3.copyObject(copyParams).promise();
            await this.s3.deleteObject(deleteParams).promise();
        } catch (err) {
            this.logger.error('Could not move parsed file', err);
        }

        this.logger.log('Parsed file successfully moved to /parsed folder');
    }
}

export default new S3Service({
    region: REGION,
});

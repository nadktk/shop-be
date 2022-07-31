import { S3 } from 'aws-sdk';
import csvParser from 'csv-parser';

const { REGION, BUCKET } = process.env;
const UPLOAD_PATH = 'uploaded';

class S3Service {
    constructor(options) {
        this.s3 = new S3(options); 
    }

    prepareSignedUrl(fileName) {
        const params = {
            Bucket: BUCKET,
            Key: `${UPLOAD_PATH}/${fileName}`,
            Expires: 60,
            ContentType: 'text/csv'
        }

        const url = this.s3.getSignedUrl('putObject', params);

        return url;
    }

    async parseCsvFile(key) {
        const params = {
            Bucket: BUCKET,
            Key: key,
        }

        const s3Srteam = this.s3.getObject(params).createReadStream();
        const result = [];

        const fileStream = new Promise((res, rej) => {
            s3Srteam.pipe(csvParser())
                .on('data', (data) => {
                    console.log(data);

                    result.push(data);
                })
                .on('error', (err) => {
                    console.log(err);

                    rej(err);
                })
                .on('end', () => res());
        });

        await fileStream;

        return result;
    }
}

export default new S3Service({
    region: REGION,
});

import { S3 } from 'aws-sdk';
import csvParser from 'csv-parser';

import { successResponse, serverErrorResponse } from '../../shared/utils';

const { REGION, BUCKET } = process.env;

const s3 = new S3({
    region: REGION,
});

/**
 * importFileParser
 */
export const importFileParser = async (event) => {
    try {
        console.log(`
            import file parser function was invoked [${new Date()}]
            with event ${JSON.stringify(
                event,
                null,
                2
            )}
        `);

        const key = event.Records[0].s3.object.key;

        const params = {
            Bucket: BUCKET,
            Key: key,
        }

        const s3Srteam = s3.getObject(params).createReadStream();
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

        return successResponse(result);
    } catch (e) {
        console.log(e);

        return serverErrorResponse({
            message: e.message,
        });
    }
};

import { S3 } from 'aws-sdk';

import { successResponse, serverErrorResponse } from '../../shared/utils';

const { REGION, BUCKET } = process.env;
const UPLOAD_PATH = 'uploaded';

const s3 = new S3({
    region: REGION,
});

/**
 * importProductsFile
 */
export const importProductsFile = async (event) => {
    try {
        console.log(`
            import file parser function was invoked [${new Date()}]
            with event ${JSON.stringify(
                event,
                null,
                2
            )}
        `);

        const fileName = event.queryStringParameters.name;

        const params = {
            Bucket: BUCKET,
            Key: `${UPLOAD_PATH}/${fileName}`,
            Expires: 60,
            ContentType: 'text/csv'
        }

        const url = s3.getSignedUrl('putObject', params);

        return successResponse(url);
    } catch (e) {
        console.log(e);

        return serverErrorResponse({
            message: e.message,
        });
    }
};

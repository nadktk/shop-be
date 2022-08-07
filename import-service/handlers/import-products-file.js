import s3Service from '../services/s3';
import { successResponse, serverErrorResponse } from '../../shared/utils';

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

        const url = s3Service.prepareSignedUrl(fileName);

        return successResponse(url); 
    } catch (e) {
        console.log(e);

        return serverErrorResponse({
            message: e.message,
        });
    }
};

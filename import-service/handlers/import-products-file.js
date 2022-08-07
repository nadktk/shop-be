import { successResponse, serverErrorResponse } from '../../shared/utils';
import s3Service from '../services/s3';
import { Logger } from '../../shared/logger';

const logger = new Logger('importProductsFile');

/**
 * importProductsFile
 */
export const importProductsFile = async (event) => {
    try {
        logger.error(`
            import file parser function was invocation
            with event ${JSON.stringify(
        event,
        null,
        2,
    )}
        `);

        const fileName = event.queryStringParameters.name;

        const url = s3Service.prepareSignedUrl(fileName);

        return successResponse(url);
    } catch (e) {
        logger.log(e);

        return serverErrorResponse({
            message: e.message,
        });
    }
};

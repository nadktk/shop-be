import { successResponse, serverErrorResponse, badRequest } from '../../shared/utils';
import s3Service from '../services/s3';
import { Logger } from '../../shared/logger';

const logger = new Logger('importFileParser');

/**
 * importFileParser
 */
export const importFileParser = async (event) => {
    try {
        logger.log(`
            import file parser function was invocation
            with event ${JSON.stringify(
        event,
        null,
        2,
    )}
        `);

        const key = event.Records && event.Records[0]?.s3?.object?.key;

        if (!key) {
            return badRequest({
                message: 'No file key value',
            });
        }

        await s3Service.parseCsvFile(key);

        return successResponse('ok');
    } catch (e) {
        logger.error(e);

        return serverErrorResponse({
            message: e.message,
        });
    }
};

import s3Service from '../services/s3';
import { successResponse, serverErrorResponse, badRequest } from '../../shared/utils';

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

        const key = event.Records && event.Records[0]?.s3?.object?.key;

        if (!key) {
            return badRequest({
                message: 'No file key value',
            });
        }

        await s3Service.parseCsvFile(key);

        return successResponse('ok');
    } catch (e) {
        console.log(e);

        return serverErrorResponse({
            message: e.message,
        });
    }
};

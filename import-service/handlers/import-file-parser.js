import { successResponse, serverErrorResponse } from '../../shared/utils';

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

        return successResponse('Hello world importFileParser');
    } catch (e) {
        console.log(e);

        return serverErrorResponse({
            message: e.message,
        });
    }
};

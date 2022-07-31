import { successResponse, serverErrorResponse } from '../../shared/utils';

/**
 * importProductsFile
 */
export const importProductsFile = async (event) => {
    try {
        console.log(`
            import file parser function was invoked [${new Date()}]
            with event ${event}
        `);

        return successResponse('Hello world importProductsFile');
    } catch (e) {
        console.log(e);

        return serverErrorResponse({
            message: e.message,
        });
    }
};

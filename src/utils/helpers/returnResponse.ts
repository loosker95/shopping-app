export const returnResponse = (statusCode: number, message: string, data = null) => ({
    statusCode, message, data,
});


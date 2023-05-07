import AWS from "aws-sdk";

export const getTasks = async () => {
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();

        const { Items } = await dynamoDb.scan({ TableName: "TaskTable" }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                tasks: Items,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error al obtener las tareas",
                error: error.message,
            }),
        };
    }
};

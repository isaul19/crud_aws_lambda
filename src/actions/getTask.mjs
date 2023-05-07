import AWS from "aws-sdk";

export const getTask = async (event) => {
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;

        const { Item } = await dynamoDb.get({ TableName: "TaskTable", Key: { id } }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                task: Item,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error al obtener la tarea",
                error: error.message,
            }),
        };
    }
};

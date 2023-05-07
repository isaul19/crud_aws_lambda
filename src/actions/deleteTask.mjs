import AWS from "aws-sdk";

export const deleteTask = async (event) => {
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;

        await dynamoDb
            .delete({
                TableName: "TaskTable",
                Key: { id },
            })
            .promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Tarea eliminada correctamente",
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error al eliminar la tarea",
                error: error.message,
            }),
        };
    }
};

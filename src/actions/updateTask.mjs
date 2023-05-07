import AWS from "aws-sdk";

export const updateTask = async (event) => {
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;
        const { title, description } = JSON.parse(event.body);

        if (!title || !description) {
            throw new Error("Se requiere el título y la descripción para actualizar la tarea");
        }

        const updateAt = new Date().toISOString();

        const updatedTask = {
            id,
            title,
            description,
            updateAt,
        };

        await dynamoDb
            .update({
                TableName: "TaskTable",
                Key: { id },
                ExpressionAttributeValues: {
                    ":title": title,
                    ":description": description,
                    ":updateAt": updateAt,
                },
                UpdateExpression: "set title = :title, description = :description, updateAt = :updateAt",
            })
            .promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Tarea actualizada correctamente",
                task: updatedTask,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error al actualizar la tarea",
                error: error.message,
            }),
        };
    }
};

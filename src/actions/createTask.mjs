import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";

export const createTask = async (event) => {
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();

        const { title, description } = JSON.parse(event.body);

        if (!title || !description) {
            throw new Error("Se requiere el título y la descripción");
        }

        const createAt = new Date().toISOString();

        const newTask = {
            id: uuid(),
            title,
            description,
            createAt,
            updateAt: createAt,
        };

        await dynamoDb
            .put({
                TableName: "TaskTable",
                Item: newTask,
            })
            .promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Tarea creada correctamente",
                task: newTask,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error al crear la tarea",
                error: error.message,
            }),
        };
    }
};

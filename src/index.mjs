"user strict";

export const handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Bienvenido a la API de Serverless con AWS",
                crear_tarea: {
                    method: "POST",
                    url: `{url}/tasks`,
                    body: {
                        title: "string",
                        description: "string",
                    },
                },
                listar_tareas: {
                    method: "GET",
                    url: `{url}/tasks`,
                },
                obtener_tarea: {
                    method: "GET",
                    url: `{url}/tasks/{id}`,
                },
                actualizar_tarea: {
                    method: "PUT",
                    url: `{url}/tasks/{id}`,
                    body: {
                        title: "string",
                        description: "string",
                    },
                },
                eliminar_tarea: {
                    method: "DELETE",
                    url: `{url}/tasks/{id}`,
                },
            },
            null,
            2
        ),
    };
};

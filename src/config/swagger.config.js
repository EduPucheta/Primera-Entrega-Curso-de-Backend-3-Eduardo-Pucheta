import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Users API',
        version: '1.0.0',
        description: 'API documentation for Users endpoints',
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Development server',
        },
    ],
    components: {
        schemas: {
            User: {
                type: 'object',
                required: ['first_name', 'last_name', 'email', 'age', 'password'],
                properties: {
                    _id: {
                        type: 'string',
                        description: 'MongoDB ObjectId',
                        example: '507f1f77bcf86cd799439011',
                    },
                    first_name: {
                        type: 'string',
                        description: 'User first name',
                        example: 'John',
                    },
                    last_name: {
                        type: 'string',
                        description: 'User last name',
                        example: 'Doe',
                    },
                    email: {
                        type: 'string',
                        description: 'User email address',
                        example: 'john.doe@example.com',
                    },
                    age: {
                        type: 'number',
                        description: 'User age',
                        example: 30,
                    },
                    password: {
                        type: 'string',
                        description: 'User password',
                        example: 'securePassword123',
                    },
                    role: {
                        type: 'string',
                        enum: ['user', 'admin'],
                        default: 'user',
                        description: 'User role',
                        example: 'user',
                    },
                    pets: {
                        type: 'array',
                        items: {
                            type: 'string',
                            description: 'Pet ObjectId reference',
                        },
                        default: [],
                        description: 'Array of pet references',
                        example: [],
                    },
                },
            },
            UserInput: {
                type: 'object',
                required: ['first_name', 'last_name', 'email', 'age', 'password'],
                properties: {
                    first_name: {
                        type: 'string',
                        description: 'User first name',
                        example: 'John',
                    },
                    last_name: {
                        type: 'string',
                        description: 'User last name',
                        example: 'Doe',
                    },
                    email: {
                        type: 'string',
                        description: 'User email address',
                        example: 'john.doe@example.com',
                    },
                    age: {
                        type: 'number',
                        description: 'User age',
                        example: 30,
                    },
                    password: {
                        type: 'string',
                        description: 'User password',
                        example: 'securePassword123',
                    },
                    role: {
                        type: 'string',
                        enum: ['user', 'admin'],
                        description: 'User role',
                        example: 'user',
                    },
                },
            },
            Error: {
                type: 'object',
                properties: {
                    error: {
                        type: 'string',
                        description: 'Error message',
                    },
                    message: {
                        type: 'string',
                        description: 'Detailed error message',
                    },
                    details: {
                        type: 'string',
                        description: 'Additional error details',
                    },
                },
            },
            SuccessMessage: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'Success message',
                    },
                    user: {
                        $ref: '#/components/schemas/User',
                    },
                },
            },
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/users.router.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;



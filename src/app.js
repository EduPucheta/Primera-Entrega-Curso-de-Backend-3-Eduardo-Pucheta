import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config.js';
import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter); 


app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});

// Only start the server if this file is run directly (not imported for testing)
if (import.meta.url === `file://${process.argv[1]}`.replace(/\\/g, '/')) {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);  
    });
}

export default app;
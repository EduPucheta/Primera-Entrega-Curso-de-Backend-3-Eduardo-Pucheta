import express from 'express';
import mongoose from 'mongoose';
import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';


const app = express();
const PORT = 8080;


app.use(express.json());

mongoose.connect('mongodb+srv://EduPucheta:AR1FuE1jz9FeEyNC@coderhouse.awd0ehk.mongodb.net/?retryWrites=true&w=majority&appName=CoderHouse');

app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter); 


app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);  
});
import { Router } from 'express';
import UserModel from '../dao/models/user.model.js';
import mongoose from 'mongoose';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users in the database
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Error al obtener usuarios."
 */
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios.' });
    }
});

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a specific user by their MongoDB ObjectId
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid ObjectId provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "El ID proporcionado no es un ObjectId válido."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Usuario no encontrado."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Error al obtener el usuario."
 *               details: "Error details"
 */
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'El ID proporcionado no es un ObjectId válido.' });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario.', details: error.message });
    }
});

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Update user by ID
 *     description: Update an existing user's information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *           example:
 *             first_name: "Jane"
 *             last_name: "Smith"
 *             email: "jane.smith@example.com"
 *             age: 28
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *             example:
 *               message: "Usuario actualizado con éxito"
 *               user:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 first_name: "Jane"
 *                 last_name: "Smith"
 *                 email: "jane.smith@example.com"
 *                 age: 28
 *       400:
 *         description: Invalid ObjectId provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "El ID proporcionado no es un ObjectId válido."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Usuario no encontrado para actualizar."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Error al actualizar el usuario."
 *               details: "Error details"
 */
router.put('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedData = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'El ID proporcionado no es un ObjectId válido.' });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado para actualizar.' });
        }

        res.status(200).json({ message: 'Usuario actualizado con éxito', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario.', details: error.message });
    }
});

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user from the database
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *             example:
 *               message: "Usuario eliminado con éxito"
 *               user:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 first_name: "John"
 *                 last_name: "Doe"
 *                 email: "john.doe@example.com"
 *       400:
 *         description: Invalid ObjectId provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "El ID proporcionado no es un ObjectId válido."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Usuario no encontrado para eliminar."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Error al eliminar el usuario."
 *               details: "Error details"
 */
router.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'El ID proporcionado no es un ObjectId válido.' });
        }

        
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado para eliminar.' });
        }

        res.status(200).json({ message: 'Usuario eliminado con éxito', user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario.', details: error.message });
    }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the database
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *           example:
 *             first_name: "John"
 *             last_name: "Doe"
 *             email: "john.doe@example.com"
 *             age: 30
 *             password: "securePassword123"
 *             role: "user"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *             example:
 *               message: "Usuario creado con éxito"
 *               user:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 first_name: "John"
 *                 last_name: "Doe"
 *                 email: "john.doe@example.com"
 *                 age: 30
 *                 role: "user"
 *                 pets: []
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Error al crear el usuario."
 */
router.post('/', async (req, res) => {
    const newUser = req.body;
    
    try {
        const result = await UserModel.create(newUser);
        res.status(201).json({ message: 'Usuario creado con éxito', user: result });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario.' });
    }
});

export default router;
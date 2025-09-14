import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

const generateMockPet = () => {
return {
    _id: new mongoose.Types.ObjectId(),
    name: faker.animal.petName(),
    species: faker.animal.type(),
    birthDate: faker.date.birthdate().toISOString(),
};
};

export const generateMockPets = (count) => {
const pets = [];
for (let i = 0; i < count; i++) {
    pets.push(generateMockPet());
}
return pets;
};
// database.test.js

import { createUser } from './database';
import connection from './connection'; // Suponiendo que tienes un módulo de conexión similar

describe('Database Infrastructure Tests', () => {
    // Mockear la función de conexión antes de cada prueba
    beforeEach(() => {
        jest.spyOn(connection, 'query').mockImplementation((query, values, callback) => {
            // Simular la respuesta de la base de datos
            callback(null, 'Mocked result');
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should create a user in the database', async () => {
        const user = {
            name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            password: 'securepassword',
            status: 'active',
        };

        const createdUser = await createUser(user);

        // Realizar aserciones sobre el resultado
        expect(createdUser).toEqual(user);
    });

    it('should handle database errors', async () => {
        // Mockear un error en la función de conexión
        jest.spyOn(connection, 'query').mockImplementation((query, values, callback) => {
            // Simular un error en la base de datos
            callback(new Error('Database error'));
        });

        const user = {
            name: 'Jane',
            last_name: 'Doe',
            email: 'jane@example.com',
            password: 'securepassword',
            status: 'active',
        };

        // Debe arrojar un error cuando se produce un error en la base de datos
        await expect(createUser(user)).rejects.toThrow('Database error');
    });
});

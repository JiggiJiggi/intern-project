const { fetchUsers, addUser, getUserPasswordFormDatabase, isUserConfirmed } = require('../src/services/users');
const fs = require('fs/promises');

const mockData = [
    {
        firstName: "John",
        lastName: "Doe",
        email: "john@mail.co",
        password: "tujyktsafdghtjykmt",
        role: "mentee",
        confirmed: false
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@mail.co",
        password: "dsfsdfdadasdsade",
        role: "mentee",
        confirmed: true
    }
];

// Mock the 'fs/promises' module
jest.mock('fs/promises', () => ({
    readFile: jest.fn(),
    writeFile: jest.fn()
}));

describe('Fetching user data from database', () => {
    beforeEach(() => {
        fs.readFile.mockResolvedValue(JSON.stringify(mockData));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch and return users data from the JSON file', async () => {
        const users = await fetchUsers();
        expect(users).toEqual(mockData);
    });

    it('should throw an error if there is a problem reading the file', async () => {
        fs.readFile.mockRejectedValue(new Error('File not found'));
        await expect(fetchUsers()).rejects.toThrow('Could not fetch users from database!');
    });
});

describe("Adding user to the database", () => {
    beforeEach(async () => {
        fs.readFile.mockResolvedValue(JSON.stringify(mockData));

        await fetchUsers();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
    
    const firstName = "Alice";
    const lastName = "Jason";
    const email = "alice@gmail.com";
    const password = "Pa$sW0rD";

    it("Should add user to the database", async () => {
        expect(async () => {
            await addUser(firstName, lastName, email, password)
        }).not.toThrow();
    });
});

describe("Receiving user password", () => {
    beforeEach(async () => {
        fs.readFile.mockResolvedValue(JSON.stringify(mockData));

        await fetchUsers();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("Should match the password of the given email", async () => {
        const password0 = await getUserPasswordFormDatabase(mockData[0].email);
        expect(password0).toEqual(mockData[0].password);
        
        const password1 = await getUserPasswordFormDatabase(mockData[1].email);
        expect(password1).toEqual(mockData[1].password);

        expect(password0).not.toEqual(mockData[1].password);
        expect(password1).not.toEqual(mockData[0].password);
    });
});

describe("Receiving confirmation status of a user", () => {
    beforeEach(async () => {
        fs.readFile.mockResolvedValue(JSON.stringify(mockData));

        await fetchUsers();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("Should throw error if the account is not confirmed", () => {
        expect(() => {
            isUserConfirmed(mockData[0].email);
        }).toThrow(`Account is not confirmed!`);

        expect(() => {
            isUserConfirmed(mockData[1].email);
        }).not.toThrow();
    });
});
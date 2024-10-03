const { signupAuth, signinAuth } = require('../src/services/auth');

describe('sign-up authentication', () => {
    
    const usersArr = [
        {
            firstName: "John",
            lastName: "Doe",
            email: "john@gmail.com",
            password: "20b08f4c3e4f9bfc4477a83275190463:51cda6b40763d79ad4ed4529e647d3adf451507dea33fecd4feae995a6711b9a3d767e2d4d7381220b5bebc3702368b02c8aef4f0e7730b43eb3de50b14b023e",
            role: "mentee",
            confirmed: false
        }
    ];

    it('should throw error for missing data', () => {
        expect(() => {
            signupAuth('', 'Doe', 'new@email.com', 'Password1!', usersArr);
        }).toThrow('Missing data!');

        expect(() => {
            signupAuth('John', '', 'new@email.com', 'Password1!', usersArr);
        }).toThrow('Missing data!');

        expect(() => {
            signupAuth('John', 'Doe', '', 'Password1!', usersArr);
        }).toThrow('Missing data!');

        expect(() => {
            signupAuth('John', 'Doe', 'new@email.com', '', usersArr);
        }).toThrow('Missing data!');

        expect(() => {
            signupAuth('', '', '', '', usersArr);
        }).toThrow('Missing data!');
    });

    it('should throw error for invalid first name', () => {
        expect(() => {
            signupAuth('John!', 'Doe', 'jane@gmail.com', 'Password1!', usersArr);
        }).toThrow('Name is not valid!');

        expect(() => {
            signupAuth('John', 'Doe23', 'jane@gmail.com', 'Password1!', usersArr);
        }).toThrow('Name is not valid!');

        expect(() => {
            signupAuth('2312', 'Doe23', 'jane@gmail.com', 'Password1!', usersArr);
        }).toThrow('Name is not valid!');

        expect(() => {
            signupAuth('John', '!@#$@!ewq', 'jane@gmail.com', 'Password1!', usersArr);
        }).toThrow('Name is not valid!');
    });

    it('should throw error for invalid email format', () => {
        expect(() => {
            signupAuth('John', 'Doe', 'invalid-email-format', 'Password1!', usersArr);
        }).toThrow('Email is not valid!');

        expect(() => {
            signupAuth('John', 'Doe', 'email@gg.', 'Password1!', usersArr);
        }).toThrow('Email is not valid!');

        expect(() => {
            signupAuth('John', 'Doe', '@e.c', 'Password1!', usersArr);
        }).toThrow('Email is not valid!');

        expect(() => {
            signupAuth('John', 'Doe', 'dws.com', 'Password1!', usersArr);
        }).toThrow('Email is not valid!');
    });

    it('should throw error for existing email', () => {
        expect(() => {
            signupAuth('John', 'Doe', 'john@gmail.com', 'Password1!', usersArr);
        }).toThrow('Email already exists!');
    });

    it('should throw error for invalid password format', () => {
        expect(() => {
            signupAuth('Jane', 'Doe', 'jane@email.com', 'weakPassword', usersArr);
        }).toThrow('Password is not valid!');

        expect(() => {
            signupAuth('Jane', 'Doe', 'jane@email.com', '12345', usersArr);
        }).toThrow('Password is not valid!');

        expect(() => {
            signupAuth('Jane', 'Doe', 'jane@email.com', '!@#$%!@', usersArr);
        }).toThrow('Password is not valid!');

        expect(() => {
            signupAuth('Jane', 'Doe', 'jane@email.com', 'Pa$$word', usersArr);
        }).toThrow('Password is not valid!');

        expect(() => {
            signupAuth('John', 'Doe', 'new@email.com', '1234!@#', usersArr);
        }).toThrow('Password is not valid!');
    });

    it('should not throw error for valid input', () => {
        expect(() => {
            signupAuth('John', 'Doe', 'new@email.com', 'Password1!', usersArr);
        }).not.toThrow();

        expect(() => {
            signupAuth('Jane', 'Doe', 'jane@email.com', 'Pa$$word2', usersArr);
        }).not.toThrow();
    });
});

describe('sign-in authentication', () => {
    const usersArr = [
        {
            firstName: "John",
            lastName: "Doe",
            email: "john@gmail.com",
            password: "20b08f4c3e4f9bfc4477a83275190463:51cda6b40763d79ad4ed4529e647d3adf451507dea33fecd4feae995a6711b9a3d767e2d4d7381220b5bebc3702368b02c8aef4f0e7730b43eb3de50b14b023e",
            role: "mentee",
            confirmed: false
        }
    ];

    it('should throw error for missing data', () => {
        expect(() => {
            signinAuth('', 'Password1!', usersArr);
        }).toThrow('Missing data!');

        expect(() => {
            signinAuth('new@email.com', '', usersArr);
        }).toThrow('Missing data!');

        expect(() => {
            signinAuth('', '', usersArr);
        }).toThrow('Missing data!');
    });

    it('should throw error for non-existing email', () => {
        expect(() => {
            signinAuth('new@email.com', 'Password1!', usersArr);
        }).toThrow('Email doesn\'t exists!');
    });

    it('should not throw error', () => {
        expect(() => {
            signinAuth('john@gmail.com', 'Password1!', usersArr);
        }).not.toThrow();
    });
});
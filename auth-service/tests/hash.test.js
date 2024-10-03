const { hashPassword, validatePassword } = require('../src/services/hash');

describe('Hashing password and validation', () => {
    const plainPassword1 = 'TestPassword1!';
    let hashedPassword1;

    const plainPassword2 = 'TestPassword2!';
    let hashedPassword2;

    it('Should resolve when hashing a password', async () => {
        hashedPassword1 = await hashPassword(plainPassword1);
        expect(hashedPassword1).toBeDefined();

        hashedPassword2 = await hashPassword(plainPassword2);
        expect(hashedPassword1).toBeDefined();
    });

    it('Should resolve to true when passwords match', async () => {
        await expect(validatePassword(plainPassword1, hashedPassword1)).resolves.not.toThrow();
        
        await expect(validatePassword(plainPassword2, hashedPassword2)).resolves.not.toThrow();
    });

    it('Should reject when passwords do not match', async () => {
        await expect(validatePassword(plainPassword2, hashedPassword1)).rejects.toThrow('Passwords do not match!');

        await expect(validatePassword(plainPassword1, hashedPassword2)).rejects.toThrow('Passwords do not match!');
    });
});

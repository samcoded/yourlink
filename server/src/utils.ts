import bcrypt from 'bcrypt';
const iplocate = require('node-iplocate');

export const getIpLocation = async (ipAddress: string) => {
    try {
        const location = await iplocate(ipAddress);
        return location;
    } catch (err) {
        // console.log(err);
        return {};
    }
};

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
    password: string,
    receivedPassword: string
) => {
    return await bcrypt.compare(password, receivedPassword);
};

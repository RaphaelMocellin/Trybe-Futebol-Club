const loginWithoutEmail = { password: '123456' };
const loginWithouPassword = { email: 'test@test.com' }
const loginFull = { email: 'test@test.com', password: '123456' };
const loginWithInvalidEmail = { email: 'notvalid.com', password: '123456' };
const loginWithInvalidPassword = { email: 'test@test.com', password: '123' };

const user = { 
    id: 1,
    username: 'Rapha Mocellin',
    email: 'rapha@rapha.com',
    password: '123456',
    role: 'admin'
};

export { 
    loginWithoutEmail,
    loginWithInvalidPassword,
    loginFull,
    loginWithouPassword,
    user,
    loginWithInvalidEmail
};
const  User  = require("../model/user.js");

const login = async (dni) => {
    const user = await User.findOne({ dni });

    return user;
};

const signUp = async (dni) => {
    const existingUser = await User.findOne({ dni }).maxTimeMS(15000);
    if (existingUser) {
        throw new Error('User already exists');
    }
    
    const newUser = new User({
        dni
    });
    await newUser.save();
    return newUser;
};

module.exports = {
    login,
    signUp
}
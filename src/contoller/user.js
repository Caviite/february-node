
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwt_secrect, expire_in } = require("../Config/env");
const env = require("../Config/env");
const saltRound = 10;

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(401).json({ message: "all field are require" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(402).json({ message: "user Already Exist" });
        }

        const salt = bcrypt.genSaltSync(saltRound);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password: hashedPassword,
        };

        await User.create(user);

        return res.status(201).json({ message: "account creates Successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
};

const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).json({ message: "all field are require" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(402).json({ message: "Invalid Credential" });
        }

        console.log(user, "user");
        const comparePassword = bcrypt.compareSync(password, user.password);
        console.log("comparePassword", comparePassword);

        if (!comparePassword) {
            return res.status(402).json({ message: "Invalid Credential" });
        }

        const token = jwt.sign(
            { email: user.email, id: user._id, name: user.name },
            env.jwt_secret,
            { expiresIn: env.expire_in },
        );

        console.log(user, "userdeatils");

        const users = {
            name: user.name,
            email: user.email,
            role: user.role
        };

        return res.status(200).json({ message: "Login Successful", token, users });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
};

module.exports = { register, logIn };
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/Feature.js";
import ErrorHandler from "../middlewares/Error.js";



export const login = async (res, req, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");


    if (!user) return next(new ErrorHandler("invalid email or password", 400));



    const isMatch = await bcrypt.compare(password, user.password)


    if
        (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400));


    sendCookie(user, res, `welcome back, $(user.name`, 200)

}

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10)

    user = await User.create({ name, email, password: hashedPassword });
    sendCookie(user, res, "registrred succesfully", 201)
}



export const getMyProfile = (req, res) => {




    res.status(200).json({
        success: true,
        user: req.user,
    })
};


export const logout = (req, res) => {

    res.status(200).cookie("token", "", { expires: new Date(Date.now()) }).json({
        success: true,
        user: req.user,
    })
}; 

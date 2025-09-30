import {body} from "express-validator";

const userRegisterValidator=()=>{
    return [
            body("email")
                .trim()
                .notEmpty()
                .withMessage("Email is required")
                .isEmail().
                withMessage("Email is invalid"),
            body("username")
                .trim()
                .notEmpty()
                .withMessage("Username is required")
                .isLowercase()
                .withMessage("Username must be in lower case")
                .isLength({min:3})
                .withMessage("Username must be at least 3 characters long"),
            body("password")
                .trim()
                .notEmpty()
                .withMessage("Password is required")
                .isLength({min:8})
                .withMessage("Password must have atleast 8 characters")
                .matches(/[!@#$%^&*(),.?":{}|<>]/)
                .withMessage("Password must contain at least one special character")
                .matches(/\d/)
                .withMessage("Password must contain at least one number")
                .matches(/[A-Z]/)
                .withMessage("Password must contain atleast one uppercase letter")
                .matches(/[a-z]/)
                .withMessage("Password must contain at least one lowercase letter"),
            
    ]
}

const userLoginValidator=()=>{
    return [
        body("email")
            .optional()
            .isEmail()
            .withMessage("Email is invalid"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ]
}

export{
    userRegisterValidator,
    userLoginValidator
}
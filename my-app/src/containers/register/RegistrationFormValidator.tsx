import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { FormikValidatorBase } from "formik-class-validator";

export class RegistrationFormValidator extends FormikValidatorBase {
    @IsNotEmpty({message: "Please enter your email address"})
    @IsString()
    username: string = "";

    @IsNotEmpty({message: "Please enter your email address"})
    @IsEmail({}, {message: "Please enter a valid email address"})
    @IsString()
    email: string = "";

    @IsNotEmpty({message: "Please enter your password"})
    @IsString()
    password: string = "";

    @IsNotEmpty({message: "Please enter your password"})
    @IsString()
    confirmPassword: string = "";
    
}

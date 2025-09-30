import { UserModel } from "../../data";
import { CustomError, RegisterUserDto } from "../../domain";

export class AuthService{

    constructor(){}

    public async registerUser(registerUserDto:RegisterUserDto){

        const existUser=await UserModel.findOne({email:registerUserDto.email});
        if(existUser) throw CustomError.badRequest('Email already exist');

        try {
            const user=new UserModel(registerUserDto);
            await user.save();

            //todo: encriptar la contraseña

            //todo: generar un JWT para autenticar el usuario

            //todo: mandar el email de confirmación

            return user;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

}
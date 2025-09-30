import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService{

    constructor(){}

    public async registerUser(registerUserDto:RegisterUserDto){

        const existUser=await UserModel.findOne({email:registerUserDto.email});
        if(existUser) throw CustomError.badRequest('Email already exist');

        try {
            const user=new UserModel(registerUserDto);
            

            //todo: encriptar la contraseña
            user.password=bcryptAdapter.hash(registerUserDto.password);
            await user.save();

            //todo: generar un JWT para autenticar el usuario

            //todo: mandar el email de confirmación

            const {password,...userEntity}=UserEntity.fromObject(user);

            return {
                user:userEntity,
                token:'ABC'
            };

        } catch (error) {

            throw CustomError.internalServer(`${error}`);

        }

    }

    public async loginUser(loginUserDto:LoginUserDto){

        const user=await UserModel.findOne({email:loginUserDto.email});
        if(!user) throw CustomError.badRequest('Email not exist');

        const isMatching=bcryptAdapter.compare(loginUserDto.password,user.password);
        if(!isMatching) throw CustomError.badRequest('Password is not valid');

        const {password,...userEntity}=UserEntity.fromObject(user);

        return {
            user:userEntity,
            token:'ABC'
        }
    }

}
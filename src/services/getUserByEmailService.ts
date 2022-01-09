import { instanceToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../database/repositories/userRepositories"



class GetUserByEmailService {
    async execute(email: any){
        const userRepository = getCustomRepository(UserRepositories)
        const user = await userRepository.find(
            {where: { email: email}}
        );
            
        return instanceToPlain(user);
    }
    

}
export { GetUserByEmailService }
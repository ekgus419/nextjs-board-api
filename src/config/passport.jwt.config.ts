import { IAuthModuleOptions } from "@nestjs/passport";

const passportJwtConfig: IAuthModuleOptions = {
    defaultStrategy: 'jwt'
}

export default passportJwtConfig;
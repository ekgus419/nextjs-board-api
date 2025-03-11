
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { config } from 'dotenv';

config();

const serveStaticModuleConfig: ServeStaticModuleOptions = {
    rootPath: process.env.FILE_PATH
};

export default serveStaticModuleConfig;
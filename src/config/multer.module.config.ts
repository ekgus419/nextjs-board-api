import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";

import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
import { ImageFileFilter } from "filter";

config();

const multerModuleConfig: MulterOptions = {
    storage: diskStorage({
        destination: process.env.FILE_PATH,
        filename: (request, file, callback) => callback(null, uuidv4() + '.' + file.mimetype.split('/')[1])
    }),
    // 확장자 제한
    fileFilter: ImageFileFilter,
    // 사이즈 제한
    limits: {
        fileSize: 1024 * 1024 * 100
    }
};

export default multerModuleConfig;
import { InternalServerErrorException } from "@nestjs/common";

const ImageFileFilter = (request, file, callback) => {
    const isImage = file.originalname.match(/\.(jpg|jpeg|png)$/);
    if (!isImage) return callback(new InternalServerErrorException({ code: 'NI', message: 'Only image files are allowed.'}), false);
    callback(null, true);
}

export default ImageFileFilter;
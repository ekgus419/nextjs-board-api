// 공통 반환 메시지 선언
enum ResponseMessage {
    // HTTP Status 200
    SUCCESS = 'Success.',

    // HTTP Status 400
    VALIDATION_FAIL = 'Validation failed.',
    DUPLICATE_EMAIL = 'Duplicate email.',
    DUPLICATE_NICKNAME = 'Duplicate nickname.',
    DUPLICATE_TEL_NUMBER = 'Duplicate tel number.',
    NO_EXIST_USER = 'This user does not exist.',
    NO_EXIST_BOARD = 'This board does not exist.',

    // HTTP Status 401
    SIGN_IN_FAIL = 'Login information mismatch.',
    AUTHORIZATION_FAIL = 'Authorization Failed.',

    // HTTP Status 403
    NO_PERMISSION = 'Do not have permission.',

    // HTTP Status 500
    DATABASE_ERROR = 'Database error.',
};

export default ResponseMessage;
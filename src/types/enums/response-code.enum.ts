// 공통 반환 코드 선언
enum ResponseCode {
    // HTTP Status 200
    SUCCESS = 'SU',

    // HTTP Status 400
    VALIDATION_FAIL = 'VF',
    DUPLICATE_EMAIL = 'DE',
    DUPLICATE_NICKNAME = 'DN',
    DUPLICATE_TEL_NUMBER = 'DT',
    NO_EXIST_USER = 'NU',
    NO_EXIST_BOARD = 'NB',

    // HTTP Status 401
    SIGN_IN_FAIL = 'SF',
    AUTHORIZATION_FAIL = 'AF',

    // HTTP Status 403
    NO_PERMISSION = 'NP',

    // HTTP Status 500
    DATABASE_ERROR = 'DBE',
};

export default ResponseCode;
export default interface GetBoardResultSet {
    boardNumber: number;
    title : string;
    content : string;
    writeDatetime : string;
    writerEmail : string;
    writerNickname : string;
    writerProfileImage : string | null;
}
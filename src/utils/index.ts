import * as dayjs from 'dayjs'

export const nowDatetime = dayjs().format('YYYY-MM-DD HH:mm:ss');
export const aweekAgoDatetime = dayjs().subtract(1, 'weeks').format('YYYY-MM-DD HH:mm:ss');
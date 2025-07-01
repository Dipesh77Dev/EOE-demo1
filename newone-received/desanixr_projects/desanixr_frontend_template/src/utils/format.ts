import { default as dayjs } from 'dayjs';

const formatDateTime = (date: number | Date) => dayjs(date).format('DD-MMM-YYYY HH:mm');
const formatDate = (date: number | Date) => dayjs(date).format('DD-MMM-YYYY');
const formatTime = (date: number | Date) => dayjs(date).format('HH:mm');
const formatCustom = (date: number | Date, format: string) => dayjs(date).format(format);

export { formatDateTime, formatDate, formatTime, formatCustom };

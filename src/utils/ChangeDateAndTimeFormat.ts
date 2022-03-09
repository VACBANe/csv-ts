import {dataType} from "../@types/types";
const changeDateAndTimeFormat = (data: dataType) => {
    return data.map((item) => {
        const date = item[0].toString().split('.');
        const temp = date[0];
        date[0] = date[1];
        date[1] = temp;
        const day = new Date(date.join('')).getDay();
        item[0] = day === 0 ? 7 : day;
        const time = item[3];
        const timestamp = +(+time).toFixed(2) * 60;
        const hours = Math.trunc(timestamp / 60);
        const minutes = parseFloat((timestamp % 60).toFixed());
        item[3] = [hours, minutes];
        return item;
    });
};
export default changeDateAndTimeFormat;

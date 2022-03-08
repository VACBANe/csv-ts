const changeDateAndTimeFormat = ([...data]: any[]) => {
    return data.map((item) => {
        item[0] = item[0].split('.');
        const temp = item[0][0];
        item[0][0] = item[0][1];
        item[0][1] = temp;
        const day = new Date(item[0].join('')).getDay();
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

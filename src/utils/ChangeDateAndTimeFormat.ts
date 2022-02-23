const changeDateAndTimeFormat = (data: any[]) => {
    return data.map((item) => {
        item[0] = item[0].split('.');
        let temp = item[0][0];
        item[0][0] = item[0][1];
        item[0][1] = temp;
        let day = new Date(item[0].join('')).getDay();
        item[0] = day === 0 ? 7 : day;
        let time = item[3];
        let timestamp = +(+time).toFixed(2) * 60;
        let hours = Math.trunc(timestamp / 60);
        let minutes = parseFloat((timestamp % 60).toFixed());
        item[3] = [hours, minutes];
        return item;
    });
};
export default changeDateAndTimeFormat;

const changeDateFormat = (data: any[]) => {
    return data.map((item) => {
        item[0] = item[0].split('.');
        let temp = item[0][0];
        item[0][0] = item[0][1];
        item[0][1] = temp;
        let day = new Date(item[0].join('')).getDay();
        item[0] = day === 0 ? 7 : day;
        return item;
    });
};
export default changeDateFormat;

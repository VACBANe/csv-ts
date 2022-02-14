const changeDateFormat = (data: any[]) => {
    return data.map((item) => {
        item[0] = item[0].split('.');
        let temp = item[0][0];
        item[0][0] = item[0][1];
        item[0][1] = temp;
        item[0] = item[0].join('.');
        return item;
    });
};
export default changeDateFormat;

import dayjs from 'dayjs';

const dateFunc = () => {
  const weekDay = ['日', '一', '二', '三', '四', '五', '六'];
  let showData = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
  };
  const getYearMonthDay = (data: Date) => {
    const year = data.getFullYear();
    const month = data.getMonth();
    const day = data.getDate();
    return {year, month, day};
  };
  const getShowDate = (date: { year: number,month: number, day:number }) => {
    const {year, month, day} = date;
    showData = {
      year,
      month,
      day
    }
  };

  const showDays = (date: { year: number,month: number, day:number }) => {
    const days = [];
    const monthFirstDay = new Date(date.year, date.month, 1);
    const firstDayWeek = monthFirstDay.getDay();
    const showStartDay = +monthFirstDay - firstDayWeek * 24 * 60 * 60 * 1000;
    for (let i = 0; i < 42; i++) {
      days.push(new Date(showStartDay + i * 24 * 60 * 60 * 1000));
    }
    return days;
  };

  const onSelectDay = (date: Date) => {
    getShowDate(getYearMonthDay(date))
  };
  const isThisMonthDay = (date: Date) => {
    const {year, month} = getYearMonthDay(date);
    const {year: showYear, month: showMonth} = showData;
    return year === showYear && month === showMonth;
  };
  const isToday = (date: Date) => {
    if (dayjs(date).isSame(new Date(), 'day')) {
      return true;
    }
  };
  const isSelectDay = (date: Date) => {
    const {year, month, day} = getYearMonthDay(date);
    const {year: selectYear, month: selectMonth, day: selectDay} = showData;
    return year === selectYear && month === selectMonth && day === selectDay;
  };
  const onChangMonth = (type: string) => {
    const moveMonth = type === 'last' ? -1 : 1;
    const {year, month, day} = showData;
    const changMonth = new Date(year, month, day);
    changMonth.setMonth(month + moveMonth);
    const {year: Year, month: Month, day: Day} = getYearMonthDay(changMonth);
    showData.year = Year;
    showData.month = Month;
    showData.day = Day;
  };
  const onChangYear = (type: string) => {
    const moveYear = type === 'last' ? -1 : 1;
    showData.year += moveYear;
  };
  return {weekDay,showData, getYearMonthDay, getShowDate,showDays,onSelectDay,isThisMonthDay,isToday,isSelectDay,onChangMonth,onChangYear};
};


export {dateFunc};
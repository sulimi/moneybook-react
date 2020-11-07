import dayjs, {Dayjs} from 'dayjs';
import {useState} from 'react';
import {useUpdate} from './useUpdate';

const useDate = () => {
  const weekDay = ['日', '一', '二', '三', '四', '五', '六'];
  const obj = {
    year: dayjs().year(),
    month: dayjs().month(),
    day: dayjs().date()
  };
  const [showData, setShowData] = useState(obj);
  const [onSelectedDay,setOnSelectedDay]=useState(dayjs())
  useUpdate(() => {
    if (showData.month > 11) {
      setShowData({...showData,year:showData.year+1,month: 0})
    } else if (showData.month < 0) {
      setShowData({...showData,year:showData.year-1,month: 11})
    }
  }, [showData]);
  const getYearMonthDay = (data: Dayjs) => {
    const year = data.year();
    const month = data.month();
    const day = data.date();
    return {year, month, day};
  };
  const updateShowDate = (date: { year: number, month: number, day: number }) => {
    const {year, month, day} = date;
    setShowData({
      year,
      month,
      day
    });
  };
  const showDays = (date: { year: number, month: number, day: number }) => {
    const days = [];
    const monthFirstDay = new Date(date.year, date.month, 1);
    const firstDayWeek = monthFirstDay.getDay();
    const showStartDay = +monthFirstDay - firstDayWeek * 24 * 60 * 60 * 1000;
    for (let i = 0; i < 42; i++) {
      days.push(dayjs(showStartDay + i * 24 * 60 * 60 * 1000));
    }
    return days;
  };

  const onSelectDay = (date: Dayjs) => {
    updateShowDate(getYearMonthDay(date));
    setOnSelectedDay(date)
  };
  const isThisMonthDay = (date: Dayjs) => {
    const {year, month} = getYearMonthDay(date);
    const {year: showYear, month: showMonth} = showData;
    return year === showYear && month === showMonth;
  };
  const isToday = (date: Dayjs) => {
    if (dayjs(date).isSame(dayjs(), 'day')) {
      return true;
    }
  };
  const isSelectDay = (date: Dayjs) => {
    const {year, month, day} = getYearMonthDay(date);
    const {year: selectYear, month: selectMonth, day: selectDay} = showData;
    return year === selectYear && month === selectMonth && day === selectDay;
  };
  const onChangMonth = (type: string) => {
    if (type==='last'){
      setShowData({...showData, month: showData.month -1});
    }else {
      setShowData({...showData, month: showData.month + 1});
    }
  };
  const onChangYear = (type: string) => {
    const moveYear = type === 'last' ? -1 : 1;
    setShowData({...showData, year: showData.year + moveYear});
  };
  return {
    weekDay,
    showData,
    setShowData,
    onSelectedDay,
    updateShowDate,
    getYearMonthDay,
    getShowDate: updateShowDate,
    showDays,
    onSelectDay,
    isThisMonthDay,
    isToday,
    isSelectDay,
    onChangMonth,
    onChangYear
  };
};


export {useDate};
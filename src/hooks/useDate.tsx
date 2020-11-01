import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';

const useDate = () => {
  const weekDay = ['日', '一', '二', '三', '四', '五', '六'];
  const obj = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
  };
  const [showData, setShowData] = useState(obj);
  const [selectedDay, setSelectedDay] = useState(new Date());
  useUpdate(() => {
    if (showData.month > 11) {
      setShowData({...showData,year:showData.year+1,month: 0})
    } else if (showData.month < 0) {
      setShowData({...showData,year:showData.year-1,month: 11})
    }
  }, [showData]);
  const getYearMonthDay = (data: Date) => {
    const year = data.getFullYear();
    const month = data.getMonth();
    const day = data.getDate();
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
      days.push(new Date(showStartDay + i * 24 * 60 * 60 * 1000));
    }
    return days;
  };

  const onSelectDay = (date: Date) => {
    updateShowDate(getYearMonthDay(date));
    setSelectedDay((selectedDay) => date);
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
    setShowData({...showData, month: showData.month + moveMonth});
  };
  const onChangYear = (type: string) => {
    const moveYear = type === 'last' ? -1 : 1;
    setShowData({...showData, year: showData.year + moveYear});
  };
  return {
    weekDay,
    showData,
    setShowData,
    selectedDay,
    setSelectedDay,
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
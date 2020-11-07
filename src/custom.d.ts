import {Dayjs} from 'dayjs';

type RecordItem = {
  id: number
  tag: Tag
  note: string
  category: Category
  amount: number
  createdAt: Dayjs
}
type newRecordItem = Omit<RecordItem, 'id'>
type Tag = {
  id: number;
  name: string;
  icon: string;
  category: Category;
}
type Category = '-' | '+'

type sDate = {
  year: number,
  month: number,
  day: number
}

type HashRecord = [string, RecordItem[]]

type ByTagList = [string, number]
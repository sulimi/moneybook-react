type RecordItem = {
  id: number
  tag:Tag
  note: string
  category: Category
  amount: number
  createdAt: Date
}
type newRecordItem = Omit<RecordItem, 'id'>
type Tag = {
  id: number;
  name: string;
  icon: string;
  category: Category;
}
type Category = '-' | '+'

type sDate={
  year:number,
  month:number,
  day:number
}

type HashRecord=[string, RecordItem[]]
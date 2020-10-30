type RecordItem = {
  id: number
  tag:Tag
  note: string
  category: Category
  amount: number
  createdAt: string
}
type newRecordItem = Omit<RecordItem, 'id' | 'createdAt'>
type Tag = {
  id: number;
  name: string;
  icon: string;
  category: Category;
}
type Category = '-' | '+'
type RecordItem = {
  id: number
  tagsId: number[]
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
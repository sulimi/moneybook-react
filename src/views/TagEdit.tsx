import React from 'react';
import {useTags} from '../useTags';
import {useParams} from 'react-router-dom'

type Params={
  id: string
}
const TagEdit: React.FC=(props)=>{
  const {tags}=useTags()
  const {id}=useParams<Params>()
  const tag=tags.filter(tag=>tag.id===parseInt(id))[0]
return (
  <div>{tag.name}</div>
)
}

export {TagEdit}
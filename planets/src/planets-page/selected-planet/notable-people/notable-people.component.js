import React, { useEffect, useState } from 'react'
import { getPeopleByIds } from '../../../utils/api.js'

export default function NotablePeople (props) {
  const { people } = props
  const [ notablePeople, setPeople ] = useState([])
  useEffect(() => {
    if (people && people.length > 0) {
      const ids = people.map(person => person.replace('https://swapi.co/api/people/', '').replace('/', ''))
      const sub = getPeopleByIds(ids).subscribe(
        (response) => {
          setPeople(response)
        }
      )
    }
  }, [people])
  return (
    <div className='planetAttribute'>
      <div className='attributeTitle'>Notable People</div>
      <div className='attribute'>
        <PeopleList people={notablePeople}/>
      </div>
    </div>
  )
}

function PeopleList (props) {
  const { people } = props
  console.log('people', people)
  return (
    null
  )
}

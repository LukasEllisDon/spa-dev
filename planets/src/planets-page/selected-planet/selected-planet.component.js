import React, {useEffect, useState} from 'react'
import {useCss} from 'kremling'
import NotablePeople from './notable-people/notable-people.component.js'
import css from './selected-planet.krem.css'
import { getPlanet } from '../../utils/api.js'

export default function SelectedPlanet (props) {
  const { selectedId } = props
  const [selectedPlanet, setPlanet] = useState({})
  const scope = useCss(css)

  useEffect(() => {
    if (selectedId) {
      const sub = getPlanet(selectedId).subscribe(
        (planet) => {
          setPlanet(planet)
        }
      )
      return () => {
        sub.unsubscribe()
      }
    }
  }, [selectedId])

  return (
    <div {...scope}>
      <div className='planetAttribute'>
        <div className='attributeTitle'>Climate</div>
        <div className='attribute'>{selectedPlanet.climate}</div>
      </div>
      <div className='planetAttribute'>
        <div className='attributeTitle'>Diameter</div>
        <div className='attribute'>{formatDiameter(selectedPlanet.diameter)}</div>
      </div>
      <div className='planetAttribute'>
        <div className='attributeTitle'>Gravity</div>
        <div className='attribute'>{selectedPlanet.gravity}</div>
      </div>
      <div className='planetAttribute'>
        <div className='attributeTitle'>Terrain</div>
        <div className='attribute'>{selectedPlanet.terrain}</div>
      </div>
      <NotablePeople people={selectedPlanet.residents} />
    </div>
  )
}

function formatDiameter (value) {
  if (value === undefined) {
    return ''
  } else {
    const parsedValue = parseInt(value)
    if (isNaN(parsedValue)) {
      return value
    } else {
      return `${value} Kilometers (${value * 0.621371} Miles)`
    }
  }
}

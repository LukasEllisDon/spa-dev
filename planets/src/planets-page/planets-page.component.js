import React, { useReducer, useEffect } from 'react'
import PlanetList from '../planet-list/planet-list.component.js'
import { getPlanets } from '../utils/api.js'
import { useCss } from 'kremling'
import css from './planets-page.krem.css'

export default function PlanetPage (props) {
  const initialState = {
    planets: [],
    loading: false,
    page: 0,
    nextPage: false,
    selectedPlanet: undefined,
  }

  const [ state, dispatch ] = useReducer(reducer, initialState)
  const scope = useCss(css)

  useEffect(() => {
    dispatch({type: 'fetchPlanets'})
  }, [])

  useEffect(() => {
    if (state.page > 0) {
      debugger
      const req$ = getPlanets(state.page).subscribe(
        (results) => {
          dispatch({type: 'addPlanets', payload: {
            nextPage: !!results.next,
            results: results.results
          }})
        }
      )
    }
  }, [`${state.page}`])

  return (
    <div {...scope} className='planetPage'>
      <div className='planetPageContents'>
        <div className='listWrapper'>
          <PlanetList {...state}/>
        </div>
        <div className='selectedWrapper'>
          <div className='selectedPlanet'>
            selected
          </div>
        </div>
      </div>
    </div>
  )
}

function reducer (state, action) {
  console.log('state', JSON.stringify(state.page))
  switch(action.type) {
    case 'addPlanets':
      debugger
      const {payload} = action
      return {
        ...state,
        loading: false,
        nextPage: payload.nextPage,
        planets: [...state.planets, ...payload.results]
      }
    case 'fetchPlanets':
      state.loading = true
      state.page = state.page + 1
      return state
    default:
      return state
  }

}

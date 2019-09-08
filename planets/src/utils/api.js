import fetchWithCache from '@portal/fetchWithCache'

export function getPlanets(pageNum = 1) {
  return fetchWithCache(
    `planets?page=${pageNum}`
  )
}

export function getPlanet(id) {
  return fetchWithCache(
    `planets/${id}/`
  )
}

export function getPerson(peronNumber) {
  return fetchWithCache(
    `people/${peronNumber}/`
  )
}

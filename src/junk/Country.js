import React from 'react'

function getCountryData(data) {
  const countries = {}
  for (let i = 0, entries, len1 = data.length; i < len1; i++) {
    entries = data[i].entries
    for (let j = 0, entry, country, units, len2 = entries.length; j < len2; j++) {
      entry = entries[i]
      country = entry.country
      if (country === "") { country = 'unknown' }
      units = Number(entry.units)
      if (!countries[country]) { countries[country] = 0 }
      countries[country] += units
    }
  }
  return countries
}

function sortData(data) {
  return data.sort((a,b) => Number(a[1]) < Number(b[1]) ? 1 : -1)
}

export const Country = (props) => {
  const { dataRange } = props
  const countries = getCountryData(dataRange)
  const entries = Object.entries(countries)
  const sorted = sortData(entries)
  const total = Object.values(countries).reduce((a, b) => a + b, 0)
  // console.log(entries);
  return (
    <div id="country-data-container">
      {
        sorted.map((entry, i) => {
          return (
            <div key={i}>
              <span>{ entry[0] }</span>
              <span>{ entry[1] }</span>
              <span>{ (entry[1] / total).toFixed(3) }</span>
            </div>
          )
        })
      }
    </div>
  )
}

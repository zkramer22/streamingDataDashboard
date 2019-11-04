import React from 'react'

function getAgeData(data) {
  const ages = {}
  for (let i = 0, entries, len1 = data.length; i < len1; i++) {
    entries = data[i].entries
    for (let j = 0, entry, age, units, len2 = entries.length; j < len2; j++) {
      entry = entries[i]
      age = entry.age
      if (age === '') { age = 'unknown' }
      units = Number(entry.units)
      if (!ages[age]) { ages[age] = 0 }
      ages[age] += units
    }
  }
  return ages
}

function sortDataByFieldName(data) {
  // sorting by age group ascending, not by top age groups
  return data.sort((a,b) => Number(a[0].substring(0,2)) > Number(b[0].substring(0,2)) ? 1 : -1)
}

export const Age = (props) => {
  const { dataRange } = props
  const ages = getAgeData(dataRange)
  const entries = Object.entries(ages)
  const sorted = sortDataByFieldName(entries)
  const total = Object.values(ages).reduce((a, b) => a + b, 0)
  // console.log(entries);
  return (
    <div id="age-data-container">
      {
        sorted.map((entry, i) => {
          return (
            <div key={i}>
              <span>{ entry[0] }</span>
              <span>{ entry[1] }</span>
              <span>{ (entry[1] / total).toFixed(2) }</span>
            </div>
          )
        })
      }
    </div>
  )
}

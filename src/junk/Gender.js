import React from 'react'

function getGenderData(data) {
  const genders = {}
  for (let i = 0, entries, len1 = data.length; i < len1; i++) {
    entries = data[i].entries
    for (let j = 0, entry, gender, units, len2 = entries.length; j < len2; j++) {
      entry = entries[i]
      gender = entry.gender
      units = Number(entry.units)
      if (!genders[gender]) {
        genders[gender] = 0
      }
      genders[gender] += units
    }
  }
  return genders
}

function sortData(data) {
  return data.sort((a,b) => Number(a[1]) < Number(b[1]) ? 1 : -1)
}

export const Gender = (props) => {
  const { dataRange } = props
  const genders = getGenderData(dataRange)
  const entries = Object.entries(genders)
  const sorted = sortData(entries)
  const total = Object.values(genders).reduce((a, b) => a + b, 0)

  return (
    <div id="gender-data-container">
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

import React from 'react'

function getFieldData(data, field) {
  const dataObj = {}
  for (let i = 0, entries, len1 = data.length; i < len1; i++) {
    entries = data[i].entries
    for (let j = 0, entry, datum, units, len2 = entries.length; j < len2; j++) {
      entry = entries[j]
      datum = entry[field]
      if (datum === '') { datum = 'unknown' }
      if (datum === '<18') { datum = '17' }
      units = Number(entry.units)
      if (!dataObj[datum]) { dataObj[datum] = 0 }
      dataObj[datum] += units
    }
  }
  return dataObj
}

function sortDataByStreams(data) {
  // sorting by stream percentage descending, "top" in field first
  return data.sort((a,b) => Number(a[1]) < Number(b[1]) ? 1 : -1)
}

function sortDataByFieldName(data) {
  // sorting by age group ascending,
  return data.sort((a,b) => Number(a[0].substring(0,2)) > Number(b[0].substring(0,2)) ? 1 : -1)
}

export const DataField = (props) => {
  const { dataRange, field, color } = props
  const dataObj = getFieldData(dataRange, field)
  const entries = Object.entries(dataObj)
  // console.log(entries);
  const sorted = field === 'age' ? sortDataByFieldName(entries) : sortDataByStreams(entries)
  const total = Object.values(dataObj).reduce((a, b) => a + b, 0)

  return (
    <div className="list">
      {
        sorted.map((entry, i) => {
          let property = entry[0],
              value = entry[1],
              decimal = (entry[1] / total)
          let percentage = `${(decimal * 100).toFixed(1)}%`

          if (property === '17') { property = '<18' }

          return (
            <div className="data-row" key={i}>
              <div className="property">{ property }</div>
              <div className="value-bar-container">
                <div className="value-bar" style={{ width: `${percentage}`, backgroundColor: color }}></div>
                <div className="value">{ value }</div>
              </div>
              <div className="percentage">{ percentage }</div>
            </div>
          )
        })
      }
    </div>
  )
}

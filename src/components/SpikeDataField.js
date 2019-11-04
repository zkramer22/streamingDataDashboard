import React from 'react'

function sortDataByStreams(data) {
  // sorting by stream percentage descending, "top" in field first
  return data.sort((a,b) => Number(a[1]) < Number(b[1]) ? 1 : -1)
}

function sortDataByFieldName(data) {
  // sorting by age group ascending,
  return data.sort((a,b) => Number(a[0].substring(0,2)) > Number(b[0].substring(0,2)) ? 1 : -1)
}

export const SpikeDataField = (props) => {
  const { countryData, field, color } = props
  let entries, sorted, total
  if (countryData) {
    entries = Object.entries(countryData[field])
    sorted = field === 'age' ? sortDataByFieldName(entries) : sortDataByStreams(entries)
    total = countryData.total
    console.log(sorted);
    console.log(total);
  }
  else {
    sorted = []
  }

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

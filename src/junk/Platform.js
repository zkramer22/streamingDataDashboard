import React from 'react'

function getPlatformData(data) {
  const platforms = {}
  for (let i = 0, entries, len1 = data.length; i < len1; i++) {
    entries = data[i].entries
    for (let j = 0, entry, platform, units, len2 = entries.length; j < len2; j++) {
      entry = entries[i]
      platform = entry.platform
      units = Number(entry.units)
      if (!platforms[platform]) {
        platforms[platform] = 0
      }
      platforms[platform] += units
    }
  }
  return platforms
}

function sortData(data) {
  return data.sort((a,b) => Number(a[1]) < Number(b[1]) ? 1 : -1)
}

export const Platform = (props) => {
  const { dataRange } = props
  const platforms = getPlatformData(dataRange)
  const entries = Object.entries(platforms)
  const sorted = sortData(entries)
  const total = Object.values(platforms).reduce((a, b) => a + b, 0)

  return (
    <div id="platform-data-container" className="list">
      {
        sorted.map((entry, i) => {
          let property = entry[0],
              value = entry[1],
              percentage = (entry[1] / total).toFixed(3)
          let barWidth = Math.floor((percentage * 100))
          return (
            <div className="data-row" key={i}>
              <div className="property">{ property }</div>
              <div className="value-bar-container">
                <div className="value-bar" style={{ width: `${barWidth}%` }}></div>
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

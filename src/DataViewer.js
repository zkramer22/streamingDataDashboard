import React from 'react'
import streamData from './data.json'

class DataViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: 0,
      end: 6000,
      data: {},
      days: {},
    }
  }

  componentDidMount() {
    const { start, end } = this.state
    const dateSortedData = this.sortData(streamData, 'date')
    const sample = this.grabSomeData(dateSortedData, start, end)
    const days = this.normalizeByDay(sample)

    this.setState({ data: sample, days: days })
  }

  sortData(data, field) {
    // console.log(data);
    if (field === 'date') {
      return data.sort((a,b) => (new Date(a.date) > new Date(b.date)) ? 1 : -1)
    }
  }

  grabSomeData(streamData, start, end) {
    return streamData.slice(start, end)
  }

  normalizeByDay(data) {
    const days = {}
    for (let i = 0, day, datum, units, len = data.length; i < len; i++) {
      datum = data[i]
      day = datum.date
      units = Number(datum.units)
      if (!days[day]) {
        days[day] = { 'entries': [], 'totalUnits': 0 }
      }
      days[day]['entries'].push(datum)
      days[day]['totalUnits'] += units
    }
    return days
  }

  render() {
    const days = this.state.days || {}
    console.log(days);
    // console.log(this.state);
    // example of data below, folded
    /*

    days = {
      '1/1/19': {
        allData: [
          {units, artist, gender, age, userID},
          {units, artist, gender, age, userID},
        ],
        totalUnits: 456,

      },
      '1/10/19': {
        allData: [
          {units, artist, gender, age, userID},
          {units, artist, gender, age, userID},
          {units, artist, gender, age, userID},
          {units, artist, gender, age, userID},
          {units, artist, gender, age, userID},
        ],
        totalUnits: 123,

      },
      ...
      ...
      ...
    }

    */

    return (
      <div id="data-viewer-container">
        <div id="data-viewer">
          <div id="y-axis">

          </div>
          <div id="x-axis">
            {
              Object.keys(days).slice(0,10).map((date, i) => {
                return (
                  <div key={i} className="date-container">
                    <span>{date.substring(0, date.length - 3)}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default DataViewer

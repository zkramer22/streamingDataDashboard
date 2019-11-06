import React from 'react'
import streamData from '../data/data.json'
import { DataField } from './DataField'
import LineGraph from './LineGraph'

class DataViewer extends React.Component {
  constructor() {
    super()
    this.state = {
      range: 365,
      days: {}
    }
  }

  componentDidMount() {
    const dateSortedData = this.sortData(streamData, 'date')
    const days = this.normalizeByDay(dateSortedData)
    this.setState({ days: days })
  }

  sortData(data, field) {
    if (field === 'date') {
      // chose < for descending sort so we view data from today backwards
      return data.sort((a,b) => (new Date(a.date) < new Date(b.date)) ? 1 : -1)
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
      if (isNaN(units)) {
        units = Number(datum.units.replace(/,/, ''))
      }
      if (!days[day]) {
        days[day] = { 'day': day, 'entries': [], 'totalUnits': 0 }
      }
      days[day]['entries'].push(datum)
      days[day]['totalUnits'] += units
    }
    return days
  }

  handleRangeChange(e) {
    this.setState({ range: e.target.value })
  }

  render() {
    const { days, range } = this.state
    const dataRange = Object.values(days).slice(0, range).reverse()

    return (
      <section>
        <nav>
          <div id="nav-wrapper">
            <h1>Streamdata Dashboard</h1>
            <div id="range-container">
              <span>Show data from the last </span>
              <select defaultValue='365' onChange={ e => this.handleRangeChange(e) }>
                <option value="7">7</option>
                <option value="30">30</option>
                <option value="90">90</option>
                <option value="365">365</option>
              </select>
              <span> days</span>
            </div>
          </div>
        </nav>


        <div id="line-graph-wrapper">
          <LineGraph dataRange={ dataRange }/>
        </div>

        <div id="data-wrapper">
          <div id="country-units" className="data-container">
            <h3>Top Countries</h3>
            <DataField dataRange={ dataRange } field='country' color='#2299ff'/>
          </div>

          <div id="platform-units" className="data-container">
            <h3>Top Platforms</h3>
            <DataField dataRange={ dataRange } field='platform' color='#42c264'/>
          </div>

          <div id="gender-units" className="data-container">
            <h3>Gender</h3>
            <DataField dataRange={ dataRange } field='gender' color='#9a59ab'/>
          </div>

          <div id="age-units" className="data-container">
            <h3>Age</h3>
            <DataField dataRange={ dataRange } field='age' color='#ffcf4d'/>
          </div>
        </div>

      </section>
    )
  }
}

export default DataViewer

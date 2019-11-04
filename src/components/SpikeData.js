import React from 'react'
import { SpikeDataField } from './SpikeDataField'

class SpikeData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      country: null,
      index: 0
    }
  }

  parseSpikeData(day) {
    const dataObj = {}
    let country, age, gender, platform, units
    day.entries.forEach((entry, i) => {
      country = entry.country
      age = entry.age
      gender = entry.gender
      platform = entry.platform
      if (country === '') { country = 'unknown'}
      if (age === '<18') { age = '17' }
      if (age === '') { age = 'unknown' }
      if (gender === '') { gender = 'unknown' }
      units = Number(entry.units)
      if (isNaN(units)) {
        units = Number(entry.units.replace(/,/, ''))
      }
      if (!dataObj[country]) {
        dataObj[country] = {
          country: country,
          age: {
            '17': 0,
            '18-24': 0,
            '25-34': 0,
            '35-44': 0,
            '45-54': 0,
            '55-64': 0,
            '65+': 0,
            'unknown': 0
          },
          gender: {
            'men': 0,
            'women': 0,
            'unknown': 0
          },
          platform: {
            'Spotify': 0,
            'Pandora': 0,
            'Amazon Unlimited': 0,
            'iTunes/Apple': 0,
            'Deezer': 0,
            'Google Play': 0,
            'Napster': 0,
            'Amazon Digital Services Inc.': 0
          },
          total: 0
        }
      }
      dataObj[country]['age'][age] += units
      dataObj[country]['platform'][platform] += units
      dataObj[country]['gender'][gender] += units
      dataObj[country]['total'] += units
    })
    return dataObj
  }

  sortDataByStreams(data) {
    // sorting by stream percentage descending, "top" in field first
    return data.sort((a,b) => Number(a.total) < Number(b.total) ? 1 : -1)
  }

  changeCountry(country, i) {
    this.setState({ country: country, index: i })
    const containers = document.querySelectorAll('#spike-data-wrapper .data-container')
    containers.forEach(container => {
      container.classList.add('active')
    })
  }

  render() {
    const { day } = this.props
    const spikeData = this.parseSpikeData(day);
    const spikeEntries = Object.values(spikeData)
    const spikeSorted = this.sortDataByStreams(spikeEntries)
    const countryData = spikeSorted[this.state.index]

    return (
      <div id="spike-data-wrapper">
        <div id="spike-data-container">
          {
            spikeSorted.map((entry, i) => {
              return (
                <div onClick={ () => this.changeCountry(entry.country, i) } key={i} className="spike-entry">
                  <div className="spike-country">
                    { entry.country }
                  </div>
                  <div className="spike-total">
                    { entry.total }
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="data-container">
          <h3>{ this.state.country } by Platform</h3>
          <SpikeDataField countryData={ countryData } field='platform' color='#42c264'/>
        </div>
        <div className="data-container">
          <h3>{ this.state.country } by Gender</h3>
          <SpikeDataField countryData={ countryData } field='gender' color='#9a59ab'/>
        </div>
        <div className="data-container">
          <h3>{ this.state.country } by Age</h3>
          <SpikeDataField countryData={ countryData } field='age' color='#ffcf4d'/>
        </div>
      </div>
    )

  }
}

export default SpikeData

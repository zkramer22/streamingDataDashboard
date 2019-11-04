import React from 'react'
import { CanvasJSReact } from '../canvasjs.react.js'
import SpikeData from './SpikeData'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      day: {
        entries: []
      }
    }
  }

  getAbbrDates(dates, num) {
    let abbrDates = []
    const interval = parseInt(num / 7)
    for (let i = 0, len = dates.length; i < len; i++) {
      if (i % interval === 0) {
        abbrDates.push(dates[i])
      }
    }
    return abbrDates.reverse()
  }

  setDataPoints(dataRange) {
    let dataPoints = []
    let rollingAvg = []

    dataRange.forEach((datum, i) => {
      let dataObj = {},
          avg,
          spike = null,
          spikeColor

      // calculate rolling avgerage
      if (i >= 2) {
        avg = ((datum.totalUnits + dataRange[i - 1].totalUnits + dataRange[i - 2].totalUnits) / 3).toFixed(2)
      }
      rollingAvg.push(Number(avg))

      // set graph x and y value
      dataObj['x'] = new Date(datum.day)
      dataObj['y'] = datum.totalUnits

      // determine if the new rolling Avg is a spike from the previous and how spiky
      if (rollingAvg[i] > (rollingAvg[i - 1] * 1.15)) {
        spike = '+15%'
      } else if (rollingAvg[i] > (rollingAvg[i - 1] * 1.1)) {
        spike = '10%'
      } else if (rollingAvg[i] > (rollingAvg[i -1] * 1.05)) {
        spike = '5%'
      }

      // give this data point extra options to place a spike 'flag'
      if (spike) {
        if (spike === '5%') {
          spikeColor = 'yellow'
        } else if (spike === '10%') {
          spikeColor = 'orange'
        } else if (spike === '+15%') {
          spikeColor = 'red'
        }
        dataObj['indexLabel'] = spike
        dataObj['markerType'] = 'triangle'
        dataObj['markerColor'] = spikeColor
        dataObj['markerSize'] = 10
        dataObj['click'] = (e) => {
          this.spikeClickHandler(e, datum)
        }
      }
      dataPoints.push(dataObj)
    })
    return dataPoints
  }

  spikeClickHandler(e, datum) {
    document.getElementById('spike-data-modal').classList.add('active')
    this.setState({ day: datum })
  }

  closeModal() {
    document.getElementById('spike-data-modal').classList.remove('active')
  }


  render() {
    const { dataRange } = this.props
    const { day } = this.state
    const dataPoints = this.setDataPoints(dataRange)
    const options = {
			animationEnabled: true,
			axisY : {
				title: "streams",
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			data: [
        {
  				type: "splineArea",
  				name: "Streams",
          dataPoints: dataPoints
  			}
      ]
		}

    return (
      <div>
        <CanvasJSChart options={ options }/>
        <div id="spike-data-modal">
          <div onClick={ this.closeModal } id="close-modal">close (X)</div>
          <h3>Spike Data for {day.day} <span>(click country for breakdown)</span></h3>
          <SpikeData day={ day }/>
        </div>
      </div>
    )
  }
}


export default LineGraph


/*
export const LineGraph = (props) => {
  const { dates, dataRange } = props
  let abbrDates = [],
      len = dates.length
  if (len === 7) {
    abbrDates = dates.slice()
  } else if (len === 28) {
    abbrDates = getAbbrDates(dates.reverse(), 28)
  } else if (len === 84) {
    abbrDates = getAbbrDates(dates.reverse(), 84)
  } else if (len > 84) {
    abbrDates = getAbbrDates(dates.reverse(), 365)
  }

  const lineGraph = document.querySelector('#line-graph')
  const graphHeight = lineGraph ? lineGraph.clientHeight : 400
  const pixelRatio = graphHeight / 2000

}

<div id="line-graph">
<div id="data-points" className="">
{
dataRange.map((datum, i) => {
return (
<div key={i} className="total-unit-container" style={{ bottom: `${datum.totalUnits * pixelRatio}px` }}>
<span>{datum.totalUnits}</span>
</div>
)
})
}
</div>
<div id="y-axis">
<div>2000</div>
<div>1750</div>
<div>1500</div>
<div>1250</div>
<div>1000</div>
<div>750</div>
<div>500</div>
<div>250</div>
<div>0</div>
</div>
<div id="x-axis">
{
abbrDates.map((date, i) => {
return (
<div key={i} className="date">
<span>{date.substring(0, date.length - 3)}</span>
</div>
)
})
}
</div>

</div>
*/

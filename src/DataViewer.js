import React from 'react';
import streamData from './data.json';

class DataViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startIndex: 0,
      endIndex: 1000,
      data: []
    };
  }

  componentDidMount() {
    const start = this.state.startIndex;
    const end = this.state.endIndex;
    const dateSortedData = this.sortData(streamData, 'date');
    const sample = this.grabSomeData(dateSortedData, start, end);

    this.setState({ data: sample });
  }

  sortData(streamData, field) {
    return streamData.sort((a,b) => (a.date > b.date) ? 1 : -1)
  }

  grabSomeData(streamData, start, end) {
    return streamData.slice(start, end);
  }

  render() {
    return (
      <div id="data-viewer-container">
        <div id="data-viewer">

        </div>
      </div>
    );
  }
}

export default DataViewer;

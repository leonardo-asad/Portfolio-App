import React, { Component } from "react";
import Chart from "react-apexcharts";

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'pie'
        },
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
      },
      series: [44, 55, 41, 17, 15],
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="pie"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BarChart;

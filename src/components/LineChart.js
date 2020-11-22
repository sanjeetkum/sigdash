import React from 'react';
import Chart from 'chart.js';

// LineChart
class LineChart extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidUpdate() {
		this.myChart.data.labels = this.props.datas.data.map((d) => d.publisherId);
		this.myChart.data.datasets[0].data = this.props.datas.data.map((d) => d.impressions_offered);
		this.myChart.update();
	}

	componentDidMount() {
		this.myChart = new Chart(this.canvasRef.current, {
			type: 'bar',
			options: {
				maintainAspectRatio: true
			},
			data: {
				labels: this.props.datas.data.map((d) => d.publisherId),
				datasets: [
					{
						label: 'Publisher vs Impressions',
						data: this.props.datas.data.map((d) => d.impressions_offered),
						fill: 'none',
						pointRadius: 2,
						borderWidth: 1,
						lineTension: 0,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						]
					}
				]
			}
		});
	}

	render() {
		return <canvas ref={this.canvasRef} />;
	}
}

export default LineChart;

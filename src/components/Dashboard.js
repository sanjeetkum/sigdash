import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import { AUTH_TOKEN } from '../token';
import axios from 'axios';
import LineChart from './LineChart';
import DataTable from './DataTable';
import moment from 'moment';
import { Spin } from 'antd';

const { RangePicker } = DatePicker;

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: null,
			endDate: null,
			datas: null,
			defaultStart: null,
			defaultEnd: null,
			loading: false
		};
	}
	componentDidMount() {
		const headers = {
			'X-Auth-Token': AUTH_TOKEN,
			'content-type': 'application/json'
		};

		const postRequest = {
			organization: 'DemoTest',
			view: 'Auction'
		};
		axios.post('https://sigviewauth.sigmoid.io/api/v1/getDateRange', postRequest, { headers }).then((response) => {
			this.setState({
				defaultStart: response.data.result.startDate,
				defaultEnd: response.data.result.endDate
			});
		});
	}
	dateChangeHandler = (event) => {
		if (event) {
			let start = event[0]._d;
			let end = event[1]._d;

			this.setState({ startDate: start, endDate: end, loading: true }, function () {
				this.getData(start, end);
			});
		}
	};
	getData = (startDate, endDate) => {
		const headers = {
			'X-Auth-Token': AUTH_TOKEN,
			'content-type': 'application/json'
		};

		const postRequest = {
			_id: 'dashboard1516252439345',
			emailId: 'candidate@sigmoid.com',
			orgViewReq: {
				organization: 'DemoTest',
				view: 'Auction'
			},
			chartObject: {
				metadata: {
					title: 'chartobject:1516252439345',
					img_thumbnail: '../img/chart.png',
					chartType: 'table',
					dataLimit: 50
				},
				requestParam: {
					granularity: 'hour',
					timeZone: {
						name: 'UTC (+00:00)',
						location: 'UTC'
					},
					dateRange: {
						startDate: startDate.getTime().toString(),
						endDate: endDate.getTime().toString()
					},
					xAxis: ['D044'],
					yAxis: ['M002'],
					approxCountDistinct: [],
					specialCalculation: [],
					filter: [],
					orderBy: {
						metricOrdByList: [{ id: 'M002', desc: true }]
					},
					percentCalList: []
				}
			}
		};
		axios.post('https://sigviewauth.sigmoid.io/api/v1/getData', postRequest, { headers }).then((response) =>
			this.setState({
				datas: response.data.result,
				loading: false
			})
		);
	};
	render() {
		const defaultStartDate = new Date(this.state.defaultStart);
		const defaultEndDate = new Date(this.state.defaultEnd);

		return (
			<div>
				<Space direction="vertical" size={12}>
					<RangePicker
						onChange={this.dateChangeHandler}
						defaultValue={[moment(defaultStartDate, 'YYYY/MM/DD'), moment(defaultEndDate, 'YYYY/MM/DD')]}
					/>
				</Space>
				<br></br>
				<Spin spinning={this.state.loading} size="large"></Spin>
				{this.state.datas ? <LineChart datas={this.state.datas} /> : 'No data available for graph'}

				<hr style={{ padding: '20px 0', backgroundColor: '#e0e0e0' }} />
				{this.state.datas ? <DataTable datas={this.state.datas} /> : 'No data Available for table'}
			</div>
		);
	}
}

export default Dashboard;

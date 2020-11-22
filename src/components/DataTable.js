import React, { Component } from 'react';
import { Table } from 'antd';
const columns = [
	{
		title: 'publisherId',
		dataIndex: 'publisherId',
		key: 'publisherId'
	},
	{
		title: 'impressions_offered',
		dataIndex: 'impressions_offered',
		key: 'impressions_offered'
	}
];

class DataTable extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const flatData = this.props.datas.data;
		flatData.map((obj, index) => ({ ...obj, key: index + 1 }));
		return (
			<div>
				<Table columns={columns} dataSource={flatData} />
			</div>
		);
	}
}

export default DataTable;

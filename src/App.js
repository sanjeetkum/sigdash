import './App.css';
import Dashboard from './components/Dashboard';
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

function App() {
	return (
		<div className="App">
			<Layout>
				<Header style={{ backgroundColor: '#e0e0e0' }}>SIGMOID DASHBOARD</Header>
				<Content>
					<Dashboard />
				</Content>
				<Footer style={{ width: '100%', bottom: 0, backgroundColor: '#e0e0e0' }}>Footer</Footer>
			</Layout>
		</div>
	);
}

export default App;

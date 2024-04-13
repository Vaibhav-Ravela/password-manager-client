import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path='/register' element={<Register />} /> 
					<Route path='/login' element={<Login />} />
					<Route path='/' element={<Dashboard />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
	}

export default App;

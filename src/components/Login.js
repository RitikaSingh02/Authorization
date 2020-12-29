import	React from 'react'
import Axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { checkAuth } from '../services/checkauth.js'
import { Redirect, useHistory } from "react-router-dom"

const loginReducer = (state, action) => {
	switch (action.type) {
		case 'field': {
			return {
				...state,
				[action.field]: action.value,
				// error: '',
			};
		}
		case 'login':
			return {
				...state,
				// isLoading: true,
				error: '',
			};
		case 'error':
			return {
				...state,
				password: '',
				error: 'Invalid UserName or Password',
			};
		case 'success':
			return {
				...state,
				error: '',
				// isLoading: false,
			};
		default:
			break;
	}
	return state;
};

const initialState = {
	username: '',
	password: '',
	// isLoading: false,
	error: '',
};

function Login() {
	const history = useHistory();
	const [auth, setauth] = React.useState(false);
	React.useEffect(() => {
		setauth(checkAuth());
		console.log(checkAuth());
	}, []);
	const [state, dispatch] = React.useReducer(loginReducer, initialState);
	const { username, password, isLoading, error } = state;
	const onSubmit = () => {
		const Send = 'Basic: ' + btoa(username.trim() + ':' + password.trim());
		Axios({
			method: 'POST',
			url: "http://127.0.0.1:8000/student_login/",
			headers: {
				Authorization: Send,
			},
			withCredentials: true,
		}).then(
			response => {
				if (response.status === 200) {
					console.log(response.data);
					// setUserData(response.data);
                    history.push('/erp/dashboard');
                    // <p>DASHBOARD</p>
				}
			},
			response => {
				if (response.status === 400) {
					dispatch({ type: 'error' });
				} else {
					console.log('falied login');
				}
			}
		);
	};
	return (
		<>
			{auth ? (
				<>
					<Redirect to='/erp/dashboard' exact />
                    {/* <p>have to redirect to the dashboard</p> */}
				</>
			) : (
				<>
					<form noValidate autoComplete='off' style={{ overflow: 'hidden' }}>
						<div
							style={{
								height: '90vh',
								width: '100vw',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<TextField
								label='Library ID'
								value={username}
								onChange={e => {
									dispatch({
										type: 'field',
										field: 'username',
										value: e.currentTarget.value,
									});
								}}
							/>
							<TextField
								type={'password'}
								label='Password'
								value={password}
								onChange={e => {
									dispatch({
										type: 'field',
										field: 'password',
										value: e.currentTarget.value,
									});
								}}
							/>
							<Button
								onClick={() => {
									onSubmit();
								}}
								variant='contained'
								color='primary'
								style={{ marginTop: '20px' }}
							>
								{isLoading ? 'loading...' : 'Submit'}
							</Button>
							<p style={{ color: 'red', marginTop: '10px' }}> {error}</p>
						</div>
					</form>
				</>
			)}
		</>
	);
}
export default Login
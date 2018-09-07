import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import DataList from './components/DataList';
import Customize from './components/Customize';

const RouterComponent = () => {
	return ( 
		<Router sceneStyle={{ backgroundColor: 'white' }}>
			<Scene key="root" hideNavBar>
				<Scene key="auth">
					<Scene key="start" component={LoginForm} title="Login"  initial/>
					<Scene key="customize" component={Customize} title="Select" />
					<Scene key='list' component={DataList} />
				</Scene>
			</Scene>
		</Router>
	);
};

export default RouterComponent;
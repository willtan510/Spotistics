import React, { Component } from 'react';
import { WebBrowser, Linking } from 'expo';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import { Card, CardSection, Button } from './common';

class LoginForm extends Component {
	state = {
		failedLogin: false,
		unparsedToken: ''
	};

	async loginUser() {
		const clientId = '35031cd1f3b34162aba687d179b3bcb3';
		const responseType = 'token';
		const redirectUri = 'exp://192.168.1.4:19000';
		const scope = 'user-top-read';
		const showDialog = 'true';
		const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&scope=${scope}&show_dialog=${showDialog}&redirect_uri=${encodeURIComponent(redirectUri)}`;

		Linking.addEventListener('url', this.eventHandler.bind(this));

		await WebBrowser.openBrowserAsync(url)
		.catch(err => console.error('An error occurred', err));

		Linking.removeEventListener('url', this.eventHandler.bind(this));
	}

	eventHandler(event) {
		WebBrowser.dismissBrowser();
		const unparsedRedirect = Linking.parse(event.url);
		if (unparsedRedirect.path === '') {
			this.setState({failedLogin: true});
		} else {
			Actions.customize({unparsedRedirect: unparsedRedirect});
		}
	}	

	render() {
		return (
			<Card>
				<CardSection style={{height: 100, width: undefined}}>
					<Image 
					source={require('../images/Spotify_Logo_RGB_Green.png')}
					style={{flex:1 , height: undefined, width: undefined}}
					resizeMode="contain"
					/>
				</CardSection>

				<CardSection>
					<Button 
					onPress={this.loginUser.bind(this)}
					>
						Login
					</Button>
				</CardSection>
			</Card>
		);
	}
}

export default LoginForm;
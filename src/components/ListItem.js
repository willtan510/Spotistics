import React, {Component} from 'react';
import {Linking} from 'expo';
import {Text, View, Image, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import {CardSection, Card, Confirm} from './common';

class ListItem extends Component {

	state= {
		showModalConfirm: false,
		showModalAlbum: false
	}
	artist = (this.props.result.item.type === 'artist');

	artistsToArray(artists) {
		const arr = [];
		for (let i = 0; i < artists.length; i++ ) {
			arr[i] = artists[i].name;
		}
		return arr;
	}

	returnArtistString() {
		if (!this.artist){
			const artistString = this.artistsToArray(this.props.result.item.artists).join(', ');
			return (
				<Text style={[styles.titleStyle, {fontSize:14}]}>
					{artistString}
				</Text>				
			);
		}
	}

	onAccept() {
		this.setState({showModalConfirm: false});
		const url = this.props.result.item.external_urls.spotify;
		Linking.openURL(url);
	}

	onDecline() {
		this.setState({showModalConfirm: false});
	}

	render() {
		const {name, ordering} = this.props.result.item;

		const { images } = 
		(this.props.result.item.type === 'artist') ? 
		this.props.result.item : this.props.result.item.album;		

		return (
				<Card >	
					<CardSection>
						<View style={styles.numberViewStyle}>
							<Text style={styles.numberStyle}>{ordering}</Text>
						</View>

						<TouchableOpacity
						activeOpacity={.2} 
						onPress={() => this.setState({ showModalAlbum: !this.state.showModalAlbum})}
						>
						<Image source={{uri: images[0].url}} style={{height:75, width:75}}/>
						</TouchableOpacity>

						<View style={styles.textViewStyle}>
							<Text style={styles.titleStyle}>
								{name}
							</Text>
							{this.returnArtistString()}
						</View>

						<TouchableOpacity 
						activeOpacity={.2} 
						onPress={() => this.setState({ showModalConfirm: !this.state.showModalConfirm})}
						style={{alignSelf:'center', marginRight:10}}
						>
							<View >
								<Image 
								source={require('../images/Spotify_Icon_RGB_Green.png')}
								style={{height: 40, width: 40}}
								/>
							</View>
						</TouchableOpacity>	

					</CardSection>


					<Confirm
					visible={this.state.showModalConfirm}
					onAccept={this.onAccept.bind(this)}
					onDecline={this.onDecline.bind(this)}
					>
					{(this.artist)? "View this artist on Spotify?": "View this track on Spotify?"}
					</Confirm>

					<Modal
					animationType="fade"
					onRequestClose={() => {}}
					transparent
					visible={this.state.showModalAlbum}
					>	
						<TouchableWithoutFeedback onPress={()=>this.setState({showModalAlbum: false})}>
							<View style={styles.bigAlbum}>
								<Image source={{uri: images[0].url}} resizeMode={'contain'} style={{width: '100%', height: '100%'}}/>
							</View>
						</TouchableWithoutFeedback>
					</Modal>

				</Card>
			
		);
	}
}

const styles = {
	numberViewStyle:{
		paddingRight:15,
		paddingLeft:12,
		justifyContent: 'center',
	},
	numberStyle:{
		fontSize:18
	},
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15
	},
	textViewStyle:{
		flex:1,
		flexDirection:'column',
		justifyContent: 'space-around'
	},
	bigAlbum:{
		backgroundColor: 'rgba(0,0,0,0.5)',
		position: 'relative',
		flex: 1,
	}
};

export default ListItem;
import React, { Component } from 'react';
import {View, FlatList} from 'react-native';
import { Card, Spinner } from './common';
import ListItem from './ListItem';

class DataList extends Component {
	state = {
		topValues: null,
		artist: false
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.state.params ? navigation.state.params.screenTitle : 'Default Screen Title'
		};
	}

	componentWillMount() {
		this.retrieveData();
	}

	rowID=0;

	retrieveData() {
		const regex = 'access_token=(.+)&token_type';
		const token = ((this.props.unparsedRedirect.path).match(regex))[1];
		
		const url = `https://api.spotify.com/v1/me/top/${this.props.customType}?time_range=${this.props.timeFrame}&limit=${this.props.limit}`;
		fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(data => {
			const orderLimit = (data.total < this.props.limit)? data.total : this.props.limit;
			for (let i = 1; i < orderLimit + 1; i++){
				(data.items)[i - 1].ordering = i;
			}
			this.setState({topValues: data.items});
			this.setState({artist: data.items[0].type==='artist'});
			const title= this.state.artist ? 'Top Artists' : 'Top Tracks';
			this.props.navigation.setParams({screenTitle: title});
			});
	}

	returnList() {
		if (this.state.topValues) {
			return ( 
				<FlatList 
						data={this.state.topValues}
						renderItem={this.renderItem.bind(this)}
						keyExtractor={(item, index) => index.toString()}
						initialNumToRender={50}
						refreshing={false}
				/>
			);
		}
		return <Spinner size="large" />;
	}

	renderItem(result) {
		return <ListItem result={result} />;
	}	

	render() {
		return (
		<View style={{flex: 1}}>
			<Card style={{flex:1}}>	
				{this.returnList()}		
			</Card>
		</View>
		);
	}
}

export default DataList;
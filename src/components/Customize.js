import React, {Component} from 'react';
import {Text, ScrollView,View, Image, Switch, Slider, Picker} from 'react-native';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {CardSection, Card,Button} from './common';
import { customizeUpdate } from '../actions';
import { SHORT_TERM, MEDIUM_TERM, LONG_TERM } from '../constants';

class Customize extends Component {

	renderPicks(){
		const arr = [];
		for (let i = 1; i < 51; i++) {
			const temp = i.toString();
			arr[i-1] = <Picker.Item label={temp} value={temp} key={temp} />
		}
		
		return (
			arr
		);
	}

	onButtonPress() {
		const customType = (this.props.selection === true) ? 'tracks':'artists';
		let timeFrame = '';
		switch (this.props.sliderLength) {
			case SHORT_TERM:
				timeFrame='short_term';
				break;
			case MEDIUM_TERM:
				timeFrame='medium_term';
				break;
			case LONG_TERM:
				timeFrame='long_term';
				break;
			default:
				timeFrame='short_term';
		}
		Actions.list({
			unparsedRedirect: this.props.unparsedRedirect,
			customType: customType,
			timeFrame: timeFrame,
			limit: parseInt(this.props.limit) });
	}

	render() { 
		return (
			<Card style={{flex:1, justifyContent:'space-between'}}>
			<ScrollView>

				<View style={[styles.sectionStyle, {paddingBottom: 30}]}>
					<Text style={[styles.textStyle,{paddingBottom:15}]}>Type</Text>
					<View style={{flexDirection:'row', justifyContent: 'space-around' }}>
						<Text style={styles.typeTextStyle}>Artists</Text>
						<Switch 
						style={{backgroundColor:'#1db954', borderRadius: 17}}
						onTintColor= '#1db954'
						tintColor='#1db954'
						thumbTintColor='#191414'
						value={this.props.selection}
						onValueChange={value => {
							this.props.customizeUpdate({prop: 'selection', value: value});
							}
						} 
						/>
						<Text style={styles.typeTextStyle}>Tracks</Text>
					</View>
				</View>

				<View style={[styles.sectionStyle,{paddingBottom:30}]}>
					<Text style={styles.textStyle}>Time Period</Text>
					<View style={styles.pickerViewStyle}>
						<Text>Short Term</Text>
						<Text>Medium Term</Text>
						<Text>Long Term</Text>
					</View>

					<View style={{marginHorizontal:30}}>
						<Slider 
						//thumbImage={require('../images/Spotify_Icon_RGB_Black.png')}
						minimumTrackTintColor='#1db954'
						maximumTrackTintColor='#191414'
						step={0.5}
						onValueChange={value => this.props.customizeUpdate({prop:'sliderLength', value: value})}
						/>
					</View>
				</View>
				<View style={styles.sectionStyle}>
					<Text style={styles.textStyle}>Amount to be displayed</Text>
					<Picker 
					selectedValue={this.props.limit}
					onValueChange={value => this.props.customizeUpdate({prop: 'limit', value: value})}
					>
						{this.renderPicks()}
					</Picker>
				</View>
				<Button
				onPress={this.onButtonPress.bind(this)}
				>
				See your listening stats!
				</Button>
			</ScrollView>
			</Card>
		);
	}
}

const styles = {
	sectionStyle: {
		flexDirection:'column',
	},
	typeTextStyle:{
		fontSize:20,
		paddingTop:3
	},
	textStyle: {
		textAlign: 'center',
		fontSize:24,
		textDecorationLine: 'underline',
		textDecorationColor: '#bbb'
	},
	pickerViewStyle:{
		flexDirection:'row',
		justifyContent:'space-between',
		marginTop:20,
		paddingHorizontal:3
	}
};

const mapStateToProps = (state) => {
	const { selection, sliderLength, limit } = state.custom;
	return { selection, sliderLength, limit };
};

export default connect(mapStateToProps, {customizeUpdate})(Customize);
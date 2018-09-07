//import libraries
import React, {Component} from 'react';
import {View,Text} from 'react-native';
//make component
class Header extends Component {
	render(){
		const {textStyle,viewStyle}=styles;
		return (<View style={viewStyle}>
				<Text style={textStyle}>{this.props.headerText}</Text>
				</View>
		);
	}
};

const styles = {
	viewStyle:{
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems:'center',
		height:60,
		paddingTop:15,
		shadowColor:'#000',
		shadowOffset:{width:0,height:2},
		shadowOpacity:0.6,
		elevation:2,
		position:'relative'
	},
	textStyle:{
		fontSize:20
	}
};

//make component avail to other parts
export  {Header};
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';

export default class Logo extends Component {
	render() {
		return (
			<View style='container'>
				<View >
					<Text style={styles.row}>MyNotePad</Text>
					<Image style={styles.TopMenu} source={require('../images/logo.jpg')} />
				</View>

			
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	TopMenu:{
   
		width:80,
		height:80,
		marginTop:-80,
		marginLeft:40

	},

	row:{
	
		width:400,
		height:80,
		backgroundColor: '#0048bc',
		fontSize:25,
		color:'white',
		paddingLeft:130,
		paddingTop:20,
		fontWeight:'800'

	},

});
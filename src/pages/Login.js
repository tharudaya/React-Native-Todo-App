import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import bgImage from '../images/back2.jpg';

import Logo from '../components/Logo';
import FormLog from '../components/logform';

import {Actions} from 'react-native-router-flux';

export default class Login extends Component{

	signup() {
		Actions.signup()
	}

	render() {
		return(
      <ImageBackground source={bgImage} style={styles.bgimge}>
			<View >
				<Logo/>
			<FormLog/>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Don't have an account yet?</Text>
					<TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
				</View>
			</View>	
      </ImageBackground>
			)
	}
}

const styles = StyleSheet.create({
  bgimge : {
    flex: 1,
    width:null,
    height:null,
    justifyContent: "center",
    alignItems: "center",
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row',
    marginTop:-20,
    marginBottom:60,
  },
  signupText: {
    color:'rgba(255,255,255,1)',
    backgroundColor:'rgba(0, 0,0,0.2)',
    fontSize:18,
    fontWeight:'400'
    
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:18,
    fontWeight:'500',
    backgroundColor:'rgba(0, 0,0,0.3)',
  }
});

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import bgImage from '../images/back2.jpg';

import Logo from '../components/Logo';
import FormReg from '../components/regform';

import { Actions } from 'react-native-router-flux';

export default class Signup extends Component {

  goBack() {
    Actions.login();
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.bgimge}>
        <View >
          <Logo/>
          <FormReg/>
          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>Back to </Text>
            <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  bgimge: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
  },

  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
    marginTop: -40,
    marginBottom: 20,
  },
  signupText: {
    color: 'rgba(255,255,255,1)',
    backgroundColor: 'rgba(0, 0,0,0.2)',
    fontSize: 18,

  },
  signupButton: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: 'rgba(0, 0,0,0.2)',
  }
});

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({ name: "todo.db", createFromLocation: "~todo.db" });


export default class Logo extends Component {

  constructor(props) {
    super(props)

    this.state = {

      username: '',
      password: '',

    }
  }

  home = () => {

    //alert(db)

    const { username } = this.state;
    console.log(this.state.username);

    const { password } = this.state;
    console.log(this.state.password);

    db.transaction(tx=> {

      tx.executeSql('SELECT * FROM User where Username = ? and Password = ?', [username, password], (tx, results) => {
        var len = results.rows.length;
        console.log('len', len);

        if (len > 0) {

          Actions.home({username:username})

          const saveUserId = async username => {
              await AsyncStorage.setItem('username', username);            
          };

        } else {

          Alert.alert('Error', 'Email or Password is incorrect', [{
            text: 'OK'
          }]);
        }

      })

    })


  }

  render() {
    return (
      <View style={styles.container}>

        <View>
          <Text style={styles.Text}>Welcome to Login</Text>
        </View>

        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Email"
          onChangeText={(text) => this.setState({ username: text })}
          placeholderTextColor="black"
          selectionColor="#fff"
          keyboardType="email-address"
          onSubmitEditing={() => this.password.focus()}
        />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          onChangeText={(text) => this.setState({ password: text })}
          secureTextEntry={true}
          placeholderTextColor="black"
          ref={(input) => this.password = input}
        />
        <TouchableOpacity onPress={() => this.home()} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.8)',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: 'black',
    marginVertical: 10
  },
  button: {
    width: 300,
    backgroundColor: '#0048bc',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,

  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },


  Text: {
    marginVertical: 50,
    marginBottom: 30,
    fontSize: 25,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '800'
  }

});
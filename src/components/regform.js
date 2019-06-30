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
            name: ''

        };
    }

    reg = () => {

        var that = this;
        const { username } = this.state;
        const { password } = this.state;
        const { name } = this.state;

        if (name) {
            if (username) {
                if (password) {
                    db.transaction(tx=> {
                        tx.executeSql('INSERT INTO User (Username,Password,Name) VALUES (?,?,?)', [username,password,name],  (tx, results) => {

                                console.log('Results', results.rowsAffected);
                                if (results.rowsAffected > 0) {
                                    
                                    Alert.alert('Success', 'Successfully Registered', [{ text: 'OK' }]);

                                        Actions.login()

                                    // alert('kk')

                                } else {
                                    alert('Registration Failed');
                                }
                            }
                        );
                    });
                } 
                else {
                    alert('Please fill Password field');
                }
            } else {
                alert('Please fill Username field');
            }
        } else {
            alert('Please fill Name field');
        }

    }

    render() {
        return (
            <View style={styles.container}>

                <View>
                    <Text style={styles.Text}>Welcome to Registration</Text>
                </View>

                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Name"
                    onChangeText={(text) => this.setState({ name: text })}
                    placeholderTextColor="black"
                    selectionColor="#fff"
                    onSubmitEditing={() => this.password.focus()}
                />
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
                <TouchableOpacity onPress={() => this.reg()} style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
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
        fontSize: 25,
        color: 'rgba(255, 255, 255, 1)',
        marginBottom: 30,
        fontWeight: '800'
    }

});
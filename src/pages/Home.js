import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    FlatList,
    Alert,
    TouchableOpacity
} from 'react-native';

import Logo from '../components/Logo';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({ name: "todo.db", createFromLocation: "~todo.db" });

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteText: '',
            username:username,
            FlatListItems: [],

        }
    }


    

    addNote = () => {

        // const getUserId = async () => {           
        //      let username = await AsyncStorage.getItem('username') || 'none';                   
        //     return username;
        //   }

         // alert(getUserId.username)

        var that = this;
        const { noteText } = this.state;
        const { username } = this.state;


        if (noteText) {
            db.transaction(function(tx) {
                tx.executeSql('INSERT INTO Note (Username,Details) VALUES (?,?)', [username,noteText], (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {

                        alert('added')

                    } else {
                        alert('Failed')
                    }
                }
                );
            });
        } else {

            Alert.alert('Failed', 'No notes Found', [{ text: 'OK' }]);
        }


        db.transaction(tx1 => {
            tx1.executeSql(
                'SELECT * FROM Note where Username = ?',
                [username],
                (tx1, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    this.setState({
                        FlatListItems: temp,
                    });
                }
            );
        });

    }

        // if (this.state.noteText) {

        //     var d = new Date();
        //     this.state.NoteArray.push({

        //         'date': d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(),
        //         'note':this.state.noteText
        //     });

        //     this.setState({NoteArray:this.state.NoteArray})
        //     this.setState({ noteText: '' });


        // }
    


    deleteNote = () => {

        var that = this;
        const { username } = this.state;

        db.transaction(tx2 => {
            tx2.executeSql(
                'DELETE FROM Note where Username = ?',
                [username],
                (tx2, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {

                        alert('Deleted')

                    } else {
                        alert('Failed')
                    }
                }
            );
        });

    }



    render() {

        return (
            <View style={styles.container}>
                <Logo />

                <ScrollView style={styles.scroll}>
                    <FlatList
                        data={this.state.FlatListItems}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (

                            <View key={item.username} style={styles.displayitems}>
                                <Text style={styles.displaytext}>{item.Details}</Text>
                            </View>

                        )}
                    />   

                </ScrollView>

                <View style={styles.footer}>

                    <TextInput style={styles.input}
                        placeholder='> Type Here'
                        onChangeText={(noteText) => this.setState({ noteText })}
                        value={this.state.noteText}
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'>
                    </TextInput>

                </View>

                <View>
                        <TouchableOpacity onPress={() => this.deleteNote()} style={styles.noteDelete}>
                            <Text style={styles.noteDeleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                <TouchableOpacity onPress={() => this.addNote()} style={styles.addButton}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }

}



const styles = StyleSheet.create({

    container: {

        flex: 1,
        width: null,
        height: null,
        alignItems: "center",
    },

    scroll: {

        flex: 1,
        marginBottom: 100,

    },

    footer: {

        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,

    },

    input: {

        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
        fontSize: 18

    },

    addButton: {

        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#0048bc',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,

    },

    buttonText: {

        color: '#fff',
        fontSize: 24
    },

    displaytext: {

        color: 'black',
        fontSize: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#0048bc'
    },

    displayitems: {

        backgroundColor: 'white',
        padding: 10,
        position: 'relative',
        width: 400

    },

    noteDelete: {

        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0048bc',
        padding: 10,
        bottom: 200,
        left: 70,
        borderRadius: 5

    },

    noteDeleteText: {
        color: 'white',
        backgroundColor: '#0048bc',
        fontWeight: '500',

    },


});

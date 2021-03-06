import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    Image,
    TextInput,
    ScrollView
} from 'react-native';
import { NavBar } from './../components/navBar';
import Database from '../firebase/database';

const { height, width, } = Dimensions.get( 'window' );
const NAVBAR_TEXT = 'Edit Profile';

let _scrollView: ScrollView;

export default class Edit extends Component
{
    constructor( props )
    {
        super( props );
        this.state =
        {
            userFirstName: '',
            userLastName: '',
            userEmail: '',
            userYear: '',
        };
    }

    navigate(routeName, transitionType = 'normal')
    {
        this.props.navigator.push({ name: routeName, transitionType });
    }

    componentWillMount()
    {
        Database.listenUserFirstName(( value ) =>
        {
            this.setState({ userFirstName: value });
        });
        Database.listenUserLastName(( value ) =>
        {
            this.setState({ userLastName: value });
        });
        Database.listenUserYear(( value ) =>
        {
            this.setState({ userYear: value });
        });
        Database.listenUserEmail(( value ) =>
        {
            this.setState({ userEmail: value });
        });
    }

    saveAllSettings(first, last, email, year)
    {
        Database.writeUserData(first, last, email, year);
        this.navigate('root');
    };

    scrollScreen = (yVal) => {
      _scrollView.scrollTo({y: yVal});
    }

    render()
    {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT}/>

                <ScrollView ref={(scrollView) => { _scrollView = scrollView; }}>
                <View style={{marginTop: 25}}>
                    <Text style={styles.textHeader}>First Name</Text>
                    <TextInput
                        style={styles.userText}
                        ref="Name"
                        placeholder={this.state.userFirstName}
                        onChangeText={userFirstName => this.setState({ userFirstName })}
                        selectionColor='#058e4b'
                        />
                </View>

                <View style={{marginTop: 20}}>
                    <Text style={styles.textHeader}>Last Name</Text>
                    <TextInput
                        style={styles.userText}
                        ref="Last Name"
                        placeholder={this.state.userLastName}
                        onChangeText={userLastName => this.setState({ userLastName })}
                        selectionColor='#058e4b'
                        onFocus={() => _scrollView.scrollTo({y: 30})}
                        onEndEditing={() => _scrollView.scrollTo({y: 0})}
                        />
                </View>

                <View style={{marginTop: 20}}>
                    <Text style={styles.textHeader}>Email</Text>
                    <TextInput
                        style={styles.userText}
                        ref="Email"
                        placeholder={this.state.userEmail}
                        onChangeText={userEmail => this.setState({ userEmail })}
                        selectionColor='#058e4b'
                        onFocus={() => _scrollView.scrollTo({y: 50})}
                        onEndEditing={() => _scrollView.scrollTo({y: 0})}
                        />
                </View>

                <View style={{marginTop: 20}}>
                    <Text style={styles.textHeader}>Class Year</Text>
                    <TextInput
                        style={styles.userText}
                        ref="Year"
                        placeholder={this.state.userYear}
                        onChangeText={userYear => this.setState({ userYear })}
                        selectionColor='#058e4b'
                        onFocus={() => _scrollView.scrollTo({y: 100})}
                        onEndEditing={() => _scrollView.scrollTo({y: 0})}
                        />
                </View>

                <View style={{flexDirection: 'column', alignItems: 'center', marginTop: 50}}>
                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => this.saveAllSettings(this.state.userFirstName, this.state.userLastName,
                        this.state.userEmail, this.state.userYear)}>
                        <Image
                            style={{height: height / 19, width: width / 2}}
                            source={require('../Icons/Settings/rectangle_button.png')}>
                            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Text style={{color: 'white', fontSize: 15, fontFamily: 'Lato', marginTop: 8}}>
                                    Save Changes</Text>
                            </View>
                        </Image>
                    </TouchableHighlight>
                </View>
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    textHeader: {
        marginLeft: 32,
        fontSize: 18,
        color: 'rgba(7, 128, 75, 1)',
        marginBottom: 4,
        fontFamily: 'Lato',
        fontWeight: 'bold'
    },
    divider: {
        height: 1,
        width: width,
        backgroundColor: 'rgba(206, 206, 206, 1)',
        marginLeft: 34
    },
    userText: {
        width: width / 1.22,
        height: height / 18,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        paddingLeft: 8,
        marginLeft: 37,
        marginTop: 8,
        marginRight: 37,
        fontFamily: 'Lato',
        fontSize: 16,
        color: 'rgba(0, 0, 0, 1)'
    }
});

AppRegistry.registerComponent( 'Edit', ( ) => Edit );

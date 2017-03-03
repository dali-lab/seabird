import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Dimensions,
    ScrollView,
    ListView,
    Animated,
    WebView,
    TouchableOpacity
} from 'react-native';
import {NavBar} from './components/navBar';

const NAVBAR_TEXT = '';
const {height, width} = Dimensions.get('window');

export default class Tutorial extends Component {
    // Initialize the hardcoded data

    navigate(routeName, transitionType = 'normal') {
        this.props.navigator.push({name: routeName, transitionType: transitionType})
    }

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0)
        }
    };

    onNavigationStateChange = (navState) => {
        this.setState({canGoBack: navState.canGoBack, forwardButtonEnabled: navState.canGoForward, url: navState.url});
    };

    render() {
        return (
            <View style={styles.container}>
                <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT}/>
                <View style={styles.mainContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.header1}>Welcome to</Text>
                        <Text style={styles.header1}>Combo Keeper.</Text>
                        <Text style={styles.header3}>1. Create a secure password</Text>
                        <Text style={styles.header3}>2. Enter your password and other secure information</Text>
                        <Text style={styles.header3}>3. Save everything</Text>
                        <Text style={styles.header3}>4. Access your passwords whenever you want!</Text>
                    </View>
                    <TouchableHighlight style={styles.CTA} onPress={this.navigate.bind(this, 'schedule', 'normal')}>
                        <Text style={styles.CTAText}>Let's Go!</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    /* Styles the entire container to hold multiple views */
    container: {
        flex: 1
    },

    /* Style for the main section that will hold all the of the DDS content */
    mainContent: {
        width: width,
        height: height,
        backgroundColor: '#4CCE8B',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -2
    },

    /* Style for the text container */
    textContainer: {
        width: width / 1.5,
        marginTop: -(height / 3.5)
    },

    /* Styles the main header for the page */
    header1: {
        color: '#000',
        fontSize: 30
    },

    /* Styles the third main header for the page */
    header3: {
        color: '#fff',
        fontSize: 16,
        marginTop: 18
    },

    /* Style for the Call To Action button */
    CTA: {
        width: width / 2,
        height: 50,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 25,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },

    /* Style for the text of the Call To Action button */
    CTAText: {
        color: '#fff'
    }
});

AppRegistry.registerComponent('News', () => News);

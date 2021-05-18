import React from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';

class TopBar extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={{ width: 280, height: 200}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // alignSelf: 'stretch',
        // height: 52,
        flexDirection: 'row', // row
        alignItems: 'center',
        justifyContent: 'space-between', // center, space-around
        paddingLeft: 10,
        paddingRight: 10
    }
});

export default TopBar;
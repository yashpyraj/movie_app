import { Box, Text } from 'native-base';
import React, { useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
const MovieItem = (props) => {

    const releaseDate = props.item.releaseDate?.year && new Date(props.item.releaseDate.year, props.item.releaseDate.month - 1, props.item.releaseDate.day);


    return (
        <Box style={styles.item} flex={1} borderWidth={3} borderColor={'lime.500'}  >
            <View style={styles.imageContainer}>
                {props.item.primaryImage ? (
                    <Image
                        source={{ uri: props.item.primaryImage.url }}
                        style={styles.poster}
                        defaultSource={require('../assets/splash.png')}
                    />
                ) : (
                    <Image
                        source={require('../assets/splash.png')}
                        style={styles.poster}
                    />
                )}
            </View>
            <View style={styles.details}>
                <Text color={'white'} style={styles.title}>{props.item.titleText?.text || ''}</Text>
                {releaseDate && <Text color={'white'} style={styles.releaseDate}>{releaseDate.toDateString()}</Text>}
            </View>
        </Box >
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    poster: {
        width: 150,
        height: 225,
        marginRight: 16,

    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    releaseDate: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    overview: {
        fontSize: 14,
        marginTop: 8,
    },
    loadingIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: 150,
        height: 225,
        marginRight: 16,
        backgroundColor: 'grey'
    }

});

export default MovieItem;

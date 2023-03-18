
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import movieReducer from '../redux/movieReducer';

const store = createStore(movieReducer)
const container = ({ children }) => {
    return (
        <NavigationContainer >
            <NativeBaseProvider>
                <Provider store={store}>
                    <StatusBar style='light' />
                    {children}
                </Provider>
            </NativeBaseProvider>
        </NavigationContainer>

    )
}

export default container
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers/';

import View_Login from './screens/View_Login';
import View_Main from './screens/View_Main';
import View_Form from './screens/View_Form';

import Style from './config/Styles';

export default props => (
    <Provider store={createStore(reducers)}>
        <RootStack />
    </Provider>
);

const RootStack = createStackNavigator(
    {
        Login: {
            screen: View_Login,
        },
        Main: {
            screen: View_Main,
        },
        Form: {
            screen: View_Form,
        },
    },
    {
        initialRouteName: 'Login',
        navigationOptions: {
            display: 'none',
            headerStyle: {
                display: 'none',
                backgroundColor: Style.COLOR_PRIMARY,
            },
            headerTintColor: Style.COLOR_TEXT_DARK,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });
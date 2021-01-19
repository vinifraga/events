import React from 'react';
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings(['Unrecognized WebSocket'])

import Routes from './routes';

const src = () => <Routes />

export default src;

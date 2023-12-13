/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Main from './js/main';

 

const App: () => Node = () => {
  return (
    <SafeAreaView style={Colors.darker}>
    <StatusBar
      barStyle={ 'light-content'}
      backgroundColor={Colors.darker}
    />
        <Main/>  
  </SafeAreaView>

  );
};

 
export default App;

import {Dimensions, StyleSheet} from 'react-native';
let {height, width} = Dimensions.get('window');

export const Colors = {
  mainColor: '#418EE8',
  height: height,
  width: width,
  blue: 'rgba(54, 127, 254, 1)',
  lightGreen: 'rgba(73, 150, 248, 1)',
  green: 'rgba(144,227,201,1)',
  lightOrange: 'rgba(255, 203, 92, 1)',
  darkOrange: 'rgba(255, 170, 66, 1)',
  lightGray: '#E2E2E2',
  darkGray: 'rgba(118,122,127,1)',
  c230: 'rgb(248, 248, 248)',
  c245: 'rgb(248, 248, 248)',
  lightBlue: 'rgba(51, 187, 255, 1)',
  gray: 'rgb(153,153,153)',
  red: 'rgba(237, 90, 72, 1)',
  lightRed: 'rgba(255,72,86,1)',
  background: 'rgb(248, 248, 248)',
  assist: '#505A60',
};

export let StylesPublic;
StylesPublic = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButton: {
    width: 315,
    height: 46,
    borderRadius: 6,
    backgroundColor: '#4696f5',
  },
});

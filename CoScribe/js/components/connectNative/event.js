import {NativeModules, Platform} from 'react-native';
let native;
if (Platform.OS === 'android') {
  native = NativeModules.ConnectJS;
}else{
  native = NativeModules.ConnectJS;
}

export default native;

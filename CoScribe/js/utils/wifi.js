import NetInfo from '@react-native-community/netinfo';
import { Linking, Platform } from 'react-native';
import native from '../components/connectNative/event';
import message from '../components/message';
import { language } from './language';
import WifiView, { WifiViewHide } from '../components/wifi/wifiView';
import { appData, changeLanguage } from '../store/counter/action';


export function wifiNew(name, props) {
  let { data } = props.counter;
  let type = 1;
  let number = 1;
  data.wifi.forEach((v, index) => {
    if (v && v.name.indexOf(name) != -1) {
      type = 0;
      number = index + 1;
    }
  });
  let wifi = {
    name: name,
  };
  if (type !== 0) {
    data.wifi.push(wifi);
    props.dispatch(appData(data));
    number = data.wifi.length
  }
  WifiView(1, props, number);
}

export function wifiState(e) {
  return new Promise(function (resolve) {
    if (Platform.OS === 'android') {
      native.getWifi(r => {
        resolve(r.replace(/\"/g, ""));
      });
    } else {
      native.getWifi("1", r => {
        let data = r
        if (r == "1") {
          data = "Workplace"
        }
        data = "Workplace"
        resolve(data);
      });
    }
  });
}

export function getWifiName(e) {
  return new Promise(function (resolve) {
    if (Platform.OS === 'android') {
      native.getWifi(r => {
        resolve(r);
      });
    } else {
      resolve('192.168.60.152');
    }
  });
}

export function getWifiIp(e) {
  return new Promise(function (resolve) {
    if (Platform.OS === 'android') {
      native.getWifiIp(r => {
        resolve(r);
      });
    } else {
      resolve('192.168.60.152');
      // NetInfo.fetch().then((status) => {
      //   resolve(status.details.ipAddress);
      // });
    }
  });
}


export function getBssid(e) {
  return new Promise(function (resolve) {
    if (Platform.OS === 'android') {
      native.getBssid(r => {
        resolve(r);
      });
    } else {
      resolve('192.168.60.152');
    }
  });
}
export function wifiOpenSettings() {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:').catch(err => console.log('error', err));
  } else {
    native.openNetworkSettings(cb => {
    });
  }
}

export function wifiTimeout(props) {

}

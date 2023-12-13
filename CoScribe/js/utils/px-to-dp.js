import {Dimensions, PixelRatio, Platform, StatusBar} from 'react-native';

export const deviceDpHeight = Dimensions.get('window').height;
export const deviceDpWidth = Dimensions.get('window').width;
export const videoDpHeight = (deviceDpWidth * 750) / 1334;
export const videoDpWidth = deviceDpWidth;
export default function pxToDp(uiElementPx) {
  let px = Math.floor((uiElementPx * deviceDpWidth) / 750);
  return px < 1 ? 2 / PixelRatio.get() : px;
}

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.width === 896 ||
      dimen.height === 896)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe = true, skipAndroid = false) {
  return Platform.select({
    ios: ifIphoneX(safe ? 40 : 30, 20),
    android: skipAndroid ? StatusBar.currentHeight : 0,
  });
}
export function getTabBarHeight() {
  return Platform.select({
    ios: ifIphoneX(pxToDp(100), pxToDp(100)),
    android: pxToDp(100),
  });
}
export function getHomeSafeAreaHeight() {
  return Platform.select({
    ios: ifIphoneX(pxToDp(40), pxToDp(0)),
    android: pxToDp(0),
  });
}

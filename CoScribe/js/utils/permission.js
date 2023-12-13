import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const requestStoragePermission = async () => {
 if (Platform.OS === 'ios') {
    const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
    if (result !== RESULTS.GRANTED) {
      const granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
      if (granted !== RESULTS.GRANTED) {
        // 处理未授予文件储存权限的情况
      }
    }
  }
};

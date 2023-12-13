import message from '../components/message';
import { language } from './language';
import axios from 'react-native-axios';
// 开发环境
// export const channelLocal = 'http://192.168.63.28:3000/dev/v1';
export const channelLocal = 'https://i6vzfg3ay4.execute-api.ap-southeast-1.amazonaws.com/test/v1';

export let develop_ = true;
export let developIP = '192.168.1.1';
export const Version = '1.0.0';

export let DOMAIN = develop_ ? channelLocal : domainRelease;

export function ServerState(v) {
  console.log('develop_' + v);
  develop_ = v;
  if (v === '开发') {
    DOMAIN = channelLocal;
    console.log('ServerState' + DOMAIN);
  } else {
    DOMAIN = domainRelease;
    console.log('ServerState' + DOMAIN);
  }
}

class ServerError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

class Server {
  static Instance() {
    if (!this.instance) {
      this.instance = new Server();
    }
    return this.instance;
  }


  request(method, uri, data = {}) {
    if (method.toLowerCase() == 'get') {
      return this.get(uri, data);
    } else {
      return this.post(uri, data);
    }
  }
}

export default Server;

export function request({ url, method, data, type, key, messageType, props, token, counter }) {
  if (!(type === 'device') && global?.wifiInside) {
    message.show(language.t('login.connected'), 'opacity');
  }

  if (!(type === 'device') && messageType !== 1) {
    message.show('', 'opacity', 99999, 'Wave');
  }
  return new Promise(resolve => {
    this.httpTimeout && clearTimeout(this.httpTimeout)
    this.httpTimeout = setTimeout(() => {
      message.hide();
      resolve("")
      message.show(type === 'device' ? language.t('login.connected') : language.t('feedback.again'), 'opacity', 2000, '');
    }, 3000)
    console.log("method", method)
    let body = data ? JSON.stringify(data) : null;
    let headers = token ? {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    } : {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    if (method === 'get' && data) {
      let paramsArray = [];
      Object.keys(data).forEach(key => paramsArray.push(key + '=' + data[key]));
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&');
      } else {
        url += '&' + paramsArray.join('&');
      }
      body = null;
    }

    if (type === 'device') {

      headers = key ? {
        'Authorization': `Basic ${key}`,
      } : null;
      axios({
        method: 'GET',
        url: url,
        headers
      }).then(function (e) {
        this.httpTimeout && clearTimeout(this.httpTimeout)
        message.hide();
        if (e.status == 200) {
          resolve(e.data);
        } else {
          message.show('err', 'opacity');
          resolve('');
        }
        console.log(`http测试地址：${url} --- serverPost返回：`, e);
      }).catch(error => {
        message.show('err', 'opacity');
        this.httpTimeout && clearTimeout(this.httpTimeout)
        message.hide();
      });
    } else {

      fetch(type === 'device' ? url : DOMAIN + url, {
        method,
        headers,
        body,
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          message.hide();
          this.httpTimeout && clearTimeout(this.httpTimeout)
          resolve(responseData);
        })
        .catch(error => {
          this.httpTimeout && clearTimeout(this.httpTimeout)
          message.hide();
        });
    }
  });
}

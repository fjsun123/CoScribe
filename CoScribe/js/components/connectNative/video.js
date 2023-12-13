import {
  NativeModules,
  Platform,
  requireNativeComponent,
  View,
} from 'react-native';
import {Component} from 'react';
import native from './event';

let NativeVideo;

if (Platform.OS === 'android') {
  NativeVideo = requireNativeComponent('CreateView', {});
} else {
  NativeVideo = requireNativeComponent('Video', {});
}

class Video extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let {url} = this.props;
    if (Platform.OS === 'ios' && url) {
    }else{

    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      native.videoStop();
    } else {
      NativeModules.Video.videoStop();
    }
  }

  render() {
    let {url, style} = this.props;
    return <NativeVideo style={style} url={url} />;
  }
}

export default Video;

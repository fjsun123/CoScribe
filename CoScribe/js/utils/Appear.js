import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Dimensions,
  Animated,
  InteractionManager,
  Easing,
} from 'react-native';

let {height, width} = Dimensions.get('window');

export default class Appear extends Component {
  static defaultProps = {
    time: 1000,
    type: 'top',
  };

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
      number: new Animated.Value(-20),
    };
  }

  componentDidMount() {
    this.initView();
  }

  initView() {
    let {type, time} = this.props;
    switch (type) {
      case 'opacity':
        InteractionManager.runAfterInteractions(() => {
          Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: time,
            easing: Easing.linear,
            delay: 50,
            useNativeDriver: false,
          }).start();
        });
        break;
      case 'top':
        InteractionManager.runAfterInteractions(() => {
          Animated.parallel([
            Animated.spring(this.state.number, {
              toValue: 0,
              duration: 3000,
              easing: Easing.linear,
              isInteraction: false,
            }),
          ]).start();
        });
        break;
      default:
    }
  }
 
  render() {
    let _View,
      _this = this,
      _index = 1;
    let {type} = this.props;
    let {number, opacity} = this.state;

    switch (type) {
      case 'opacity':
        _View = (
          <Animated.View
            style={{
              ...this.props.style,
              opacity: opacity,
            }}>
            {this.props.children}
          </Animated.View>
        );
        break;
      case 'top':
        _View = (
          <Animated.View
            style={{
              ...this.props.style,
              top: number,
            }}>
            {this.props.children}
          </Animated.View>
        );
        break;
      default:
        _View = (
          <View>
            <Text>空</Text>
          </View>
        );
    }

    return _View;
  }
}

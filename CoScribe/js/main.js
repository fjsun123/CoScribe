import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules,
  Dimensions, TouchableOpacity, DeviceEventEmitter, ScrollView
} from 'react-native';
import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
let { height, width } = Dimensions.get('window');

let audioRecorderPlayer = new AudioRecorderPlayer();

let directoryPath = RNFS.LibraryDirectoryPath + '/Caches';

class Main extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      directory: [],
      type: "0",
      name: "",
      startRecording: "0"
    };
  }

  componentDidMount() {
    this.initView();
    this.getFilesInDirectory()
  }

  getFilesInDirectory = async () => {

    try {
      const path = await RNFS.readDir(directoryPath);
      let list = []
      path.forEach((e, i) => {
        console.log('目录下的文件: ', e.name);
        list.push(e.name)
      });

      this.setState({
        directory: list
      })

    } catch (error) {

      console.log('读取目录失败: ', error);
    }
  };

  async stopPlayer() {
    await audioRecorderPlayer.stopPlayer();
  }

  initView() {
    // 关闭全部yellow警告
    console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key'];
    console.disableYellowBox = true;
  }

  async startRecording() {

    const name = "sound" + (this.state.directory.length).toString() + ".m4a"
    try {
       await audioRecorderPlayer.startRecorder(name);
      this.setState({ startRecording: "1" })

    } catch (error) {
      console.log(error);
    }

  }

  async playRecording(name) {
 
    try {
      let result = await audioRecorderPlayer.startPlayer(name);
    } catch (error) {
      console.log('播放2错误: ', error);
    }

  }

  async stopRecorder() {
    try {
      let result = await audioRecorderPlayer.stopRecorder();
      this.getFilesInDirectory()
      this.setState({ startRecording: "0" })
    } catch (error) {
      console.log('停止录制错误: ', error);
    }
  }

  render() {
    let { directory, type, name, startRecording } = this.state;
    return <View
      style={{
        width: width,
        height: height,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 20
      }}
    >
      <View style={{
        height: 50, width: width - 40,
        alignItems: 'flex-start',
      }}>
        {startRecording == "1" ? <View style={{
          left: 5,
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'red',
        }}></View> : <View style={{
          width: 10,
          height: 10,
        }}></View>}
        <View style={{
          padding: 5
        }}>
          <Text style={{
            fontSize: 22,
          }}>
            Total number of audio files:
            {
              directory.length.toString()
            }
          </Text>
        </View>
      </View>
      <ScrollView
        style={{ backgroundColor: '#455A64', }}
        showsVerticalScrollIndicator={true}
      >
        <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
          <View style={{ height: 50 }} />
          {
            directory.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log(type)
                    console.log(name)
                    if (type == "0") {
                      this.stopPlayer()
                      this.playRecording(item)
                      this.setState({
                        type: "1",
                        name: item
                      })
                      return
                    }
                    if (type == "0" && name == item) {
                      this.stopPlayer()
                      this.setState({
                        type: "1",
                        name: item
                      })
                      return
                    }
                    if (type == "1") {
                      if (type == "1" && name != item) {
                        this.stopPlayer()
                        this.playRecording(item)
                        this.setState({
                          type: "0",
                          name: item
                        })
                        return
                      }
                      this.stopPlayer()
                      this.setState({
                        type: "0",
                        name: item
                      })
                      return
                    }
                    if (type == "1" && name == item) {
                      this.playRecording(item)
                      this.setState({
                        type: "0",
                        name: item
                      })
                      return
                    }
                  }}
                >
                  <Text style={{
                    padding: 10,
                    fontSize: 18,
                    textAlign: 'center',
                    color: name == item && type == "1" ? "red" : "black"
                  }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row', width: width - 40,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            this.startRecording()
          }}
        >
          <Text style={{
            height: 100,
            lineHeight: 100
          }}>
            start recording
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.stopRecorder()
          }}
        >
          <Text style={{
            height: 100,
            lineHeight: 100
          }}>
            stop recorder
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 50 }} />
    </View>;
  }
}

export default Main;

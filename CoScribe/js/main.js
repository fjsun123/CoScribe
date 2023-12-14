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
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const { height, width } = Dimensions.get('window');
const audioRecorderPlayer = new AudioRecorderPlayer();
const directoryPath = RNFS.LibraryDirectoryPath + '/Caches';

class Main extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      directory: [],
      type: "0",
      name: "",
      startRecording: "0",
      progress: 0,
      currentPositionSec: 0,
      currentDurationSec: 0,
      duration: "",
    };
  }

  componentDidMount() {
    this.getFilesInDirectory();
  }

  componentWillUnmount() {
  }

  async getFilesInDirectory() {

    try {
      const path = await RNFS.readDir(directoryPath);
      let list = []
      path.forEach((e, i) => {
        list.push(e.name);
      });
      this.setState({
        directory: list
      })
    } catch (error) {
      console.log('读取目录失败: ', error);
    }
  };

  async startRecording() {
    const name = "sound" + (this.state.directory.length).toString() + ".m4a"
    try {
      await audioRecorderPlayer.startRecorder(name);
      this.setState({ startRecording: "1" })
    } catch (error) {
      console.log(error);
    }
  }
  async stopPlayer() {
    this.setState({
      currentPositionSec: 0,
      currentDurationSec: 0,
      duration: "",
    })
    await audioRecorderPlayer.stopPlayer();
  }
  async PausePlay() {
    await audioRecorderPlayer.pausePlayer();
  }
  async startPlayer(name) {
    let this_ = this;
    try {
      await audioRecorderPlayer.startPlayer(name);
      audioRecorderPlayer.addPlayBackListener((e) => {
        this_.setState({
          currentPositionSec: e.currentPosition,
          currentDurationSec: e.duration,
          duration: audioRecorderPlayer.mmssss(Math.floor(e.duration))
        })
        return;
      });
    } catch (error) {
      console.log('播放2错误: ', error);
    }
  }

  async stopRecorder() {
    try {
       await audioRecorderPlayer.stopRecorder();
      this.getFilesInDirectory()
      clearInterval(this.progressInterval);
      this.setState({ startRecording: "0" })
    } catch (error) {
      console.log('停止录制错误: ', error);
    }
  }

  render() {
    let { directory, type, name, startRecording, currentPositionSec, currentDurationSec, duration } = this.state;
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
        height: 80, width: width - 40,
        alignItems: 'flex-start',
      }}>
        <View style={{
          left: 5,
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: startRecording == "1" ? 'red' : "white",
        }} />
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
        <View
          style={{
            width: width - 40,
            height: 30
          }}
        >
          <PlayerProgressBar duration={duration} progress={currentPositionSec / currentDurationSec} ></PlayerProgressBar>
          <Text style={{ height: 20 }}>
            {duration}
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
                <View key={item + index} >
                
                  <Text style={{
                    padding: 10,
                    fontSize: 18,
                    textAlign: 'center',
                    color: name == item && type == "1" ? "red" : "black"
                  }}>
                    {item}
                  </Text>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: width - 60,
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.startPlayer(item);
                      }}
                    >
                      <Text style={styles.butText}>
                        play
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.PausePlay();
                      }}
                    >
                      <Text style={styles.butText}>
                        pause
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.stopPlayer()
                      }}
                    >
                      <Text style={styles.butText}>
                        stop
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ height: 0.5, width: width - 40, backgroundColor: "#ccc" }} />
                </View>
              )
            })
          }
        </View>
        <View style={{ height: 50 }} />
      </ScrollView >
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
      <View style={{ height: 100 }} />
    </View >;
  }
}

export default Main;


const PlayerProgressBar = ({ progress, duration }): Node => {
  return <View style={styles.progressBar}>

    <View style={[styles.progress, { width: `${progress * 100}%` }]} />

  </View>
};

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#ccc',
  },
  progress: {
    height: '100%',
    backgroundColor: 'blue',
  },
  butText: {
    padding: 10,
    textAlign: 'center',
  }
});


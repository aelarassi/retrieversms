import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from "react-native";
import RNSmsRetriever from "react-native-sms-retriever-api";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const 

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "CODE"
    };
  }

  componentDidMount() {
    // this.gOtp();
    this.gHash();
  }

  gHash = async () => {
    const getHash = await RNSmsRetriever.getHash();
    console.log("getHash run :", getHash);
    
  };

  gOtp = async () => {
    const getOtp = await RNSmsRetriever.getOtp();
    getOtp
      ? (console.log("getOtp run : ", getOtp), this.aListener())
      : console.log("getOtp error : ", getOtp);
  };

  aListener = async () => {
    await RNSmsRetriever.addListener(this._onReceiveSms);
    console.log("addListener run :");
  };

  rListener = () => {
    console.log("removeListener run :");
    RNSmsRetriever.removeListener();
  };

  componentWillUnmount() {
    this.rListener();
  }

  _onReceiveSms = event => {
    const code = event.message.substr(29, 4);
    console.log("CODE SMS : ", code);
    this.setState({ code: code });
    RNSmsRetriever.removeListener();
  };

  render() {
    const { code } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Google SMS Retriever API</Text>
        <View style={styles.viewCodes}>
          <Text style={styles.instructions}>{code[0]}</Text>
          <Text style={styles.instructions}>{code[1]}</Text>
          <Text style={styles.instructions}>{code[2]}</Text>
          <Text style={styles.instructions}>{code[3]}</Text>
        </View>

        <View style={styles.viewCodes}>
          {
          
          }
        </View>

        <View style={styles.viewBtn}>
          <Button
            title="Confirme"
            color="#4b6584"
            onPress={() => this.setState({ code: "CODE" })}
          />
          <Button title="Send SMS" color="#0fb9b1" onPress={this.gOtp} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputText: {
    height: 44,
    width: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#d6d7da",
    textAlign: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  viewBtn: {
    width: 200,
    minHeight: 120,
    marginTop: 20,
    // flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
    // backgroundColor: "red"
  },
  viewCodes: {
    width: "36%",
    marginVertical: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    fontSize: 20
    // fontWeight: "bold"
    // margin: 20
  }
});

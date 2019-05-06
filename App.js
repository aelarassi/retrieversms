/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import RNSmsRetriever from "react-native-sms-retriever-api";
import RNOtpVerify from "react-native-otp-verify";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "CODE"
    };
  }

  // gHash = async () => {
  //   await RNOtpVerify.getHash()
  //     .then(data => console.log(data))
  //     .catch(e => console.log(e));
  // };

  // gOtp = () => {
  //   RNOtpVerify.getOtp()
  //     .then(p => RNOtpVerify.addListener(this.aListener, console.log(p)))
  //     .catch(p => console.log(p));
  // };

  // aListener = message => {
  //   console.log("otp", message);
  //   // const otp = /(\d{4})/g.exec(message)[1];
  //   // this.setState({ otp });
  //   // RNOtpVerify.removeListener();
  //   // Keyboard.dismiss();
  // };

  // componentWillUnmount() {
  //   RNOtpVerify.removeListener();
  // }

  componentDidMount() {
    this.gOtp();
    this.gHash();
  }

  gOtp = async () => {
    const getOtp = await RNSmsRetriever.getOtp();
    console.log("getOtp run :", getOtp);
  };

  gHash = async () => {
    const getHash = await RNSmsRetriever.getHash();
    console.log("getHash run :", getHash);
  };

  aListener = async () => {
    console.log("addListener run :");
    await RNSmsRetriever.addListener(this._onReceiveSms);
  };

  componentWillUnmount() {
    this.rListener();
  }

  rListener = () => {
    console.log("removeListener run :");
    RNSmsRetriever.removeListener();
  };

  _onReceiveSms = event => {
    console.log("event code");
    const code = event.message.substr(29, 4);
    console.log(code);
    this.setState({ code: code });
    // alert(event.message);
    RNSmsRetriever.removeListener();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Google SMS Retriever API</Text>
        <Text style={styles.instructions}>{this.state.code}</Text>
        <View style={styles.viewBtn}>
          <Button title="Send" color="#0fb9b1" onPress={this.aListener} />
          <Button
            title="Rest"
            color="#4b6584"
            onPress={() => this.setState({ code: "CODE" })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  viewBtn: {
    width: "40%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    fontSize: 16,
    fontWeight: "bold",
    margin: 20
  }
});

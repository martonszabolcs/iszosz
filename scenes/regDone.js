import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  StatusBar,
  ScrollView,
  Image,
  Modal,
  Switch,
  TouchableOpacity,
  Linking,
  WebView,
  ListView,
  AsyncStorage,
  TextInput,
  Alert,
  Animated,
  KeyboardAvoidingView
} from "react-native";
const base64 = require("base-64");
import ImagePicker from "react-native-image-crop-picker";
const utf8 = require("utf8");
import MultiSelect from "react-native-multiple-select";

import { Router, Scene, Actions } from "react-native-router-flux";
var { height, width } = Dimensions.get("window");
import ModalActivityIndicator from "react-native-modal-activityindicator";

import * as Keychain from "react-native-keychain";

const instructions = Platform.select({});

export default class Login extends Component<{}> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      text: "",
      fadeAnim: new Animated.Value(0),
      password: "",
      email: "",
      name: "",
      city: "",
      access_token: "",
      role: "admin",
      organization: "",
      specialization: "",
      education: "",
      material: "",
      human: "",
      service: "",
      description: "",
      petName: "",
      selectedItems: [],
      imagePath: "",
      indicator: false
    };
  }

  reg = async () => {
    this.setState({ indicator: true });
    var dataString =
      "email=" +
      this.state.email +
      "&password=" +
      this.state.password +
      "&name=" +
      this.state.name +
      "&city=" +
      this.state.city +
      "&organization=" +
      this.state.organization +
      "&specialization=" +
      this.state.specialization +
      "&education=" +
      this.state.education +
      "&description=" +
      this.state.description +
      "&petName=" +
      this.state.petName;
    let data = {
      method: "POST",
      body: JSON.stringify({
        password: this.state.password,
        email: this.state.email,
        name: this.state.name,
        city: this.state.city,
        organization: this.state.organization,
        specialization: this.state.specialization,
        education: this.state.education,
        description: this.state.description,
        keywords: this.state.selectedItems,
        petName: this.state.petName
      }),
      body: dataString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    return fetch("https://iszosz.herokuapp.com/registration", data)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.hasOwnProperty("error")) {
          this.setState({ indicator: false });

          alert(responseJson.message);
        } else {
          this.setState({ id: responseJson.id });
          this.uploadPhoto();
        }
      })
      .catch(error => {
        this.setState({ indicator: false });

        console.log(error);
        alert(
          "Kérlek töltsd ki az összes adatot, ha úgy sem jó akkor az e-mail cim foglalt"
        );
      });
  };

  async uploadPhoto() {
    console.log(this.state.imagePath);
    var url = "https://iszosz.herokuapp.com/users/" + this.state.id + "/avatar";
    const data = new FormData();
    data.append("file", {
      uri: this.state.imagePath,
      type: "image/jpeg", // or photo.type
      name: "avatar.jpg",
      includeBase64: true
    });
    fetch(url, {
      method: "post",
      body: data
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.hasOwnProperty("error")) {
          alert(responseJson.message);
          this.setState({ indicator: false });
        } else {
          this.setState({ indicator: false });
          alert("Sikeres regisztráció!");
          Actions.login();
        }
      });
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    console.log(selectedItems);
  };

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 500 // Make it take a while
      }
    ).start(); // Starts the animation
  }

  componentWillMount() {}

  validate() {
    if (this.state.password === "12345") {
      Actions.home();
      this.setState({ password: "" });
    } else {
      Alert.alert("Hibás jelszó", "Kérjük, próbálja újra!");
    }
  }

  image() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true
    }).then(image => {
      console.log(image);
      this.setState({ imagePath: image.path });
    });
  }

  showImage() {
    console.log(this.state.imagePath);
    if (this.state.imagePath != "") {
      return (
        <Image
          source={{ uri: this.state.imagePath }}
          style={{ width: 300, height: 400, margin: 20 }}
        />
      );
    }
  }

  render() {
    if (Platform.OS == "ios") {
      var enabled = true;
    } else {
      var enabled = false;
    }
    var items = [
      {
        id: "1",
        name: "Tréning, tanácsadás"
      },
      {
        id: "2",
        name: "Projektmenedzsment"
      },
      {
        id: "3",
        name: "Táborszervezés"
      },
      {
        id: "4",
        name: "Rendezvényszervezés"
      },
      {
        id: "5",
        name: "Nemzetközi"
      },
      {
        id: "6",
        name: "Egyéb humán erőforrás"
      },
      {
        id: "7",
        name: "Elektronika"
      },
      {
        id: "8",
        name: "Bútor, irodai eszköz"
      },
      {
        id: "9",
        name: "Játék, sport és tréning eszköz"
      },
      {
        id: "10",
        name: "Egyéb tárgyi erőforrás"
      },
      {
        id: "11",
        name: "Helyszín, logisztika"
      },
      {
        id: "12",
        name: "Szolgáltatás fiataloknak"
      },
      {
        id: "13",
        name: "Szolgáltatás szakembereknek"
      }
    ];
    const { selectedItems } = this.state;
    let { fadeAnim } = this.state;
    var iWidth = width / 240;
    console.log(this.state.material);

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={enabled}
      >
        <View style={styles.container}>
          <ModalActivityIndicator
            visible={this.state.indicator}
            size="small"
            color="white"
          />
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View
                style={{
                  width: width,
                  height: width / 9,
                  backgroundColor: "transparent",
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <TouchableOpacity onPress={() => Actions.login()}>
                  <View
                    style={{
                      marginLeft: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      height: width / 9,
                      width: width / 9,
                      borderRadius: 30,
                      marginLeft: 5
                    }}
                  >
                    <Image
                      source={require("../src/backs.png")}
                      style={{ width: width / 12, height: width / 12 }}
                    />
                  </View>
                </TouchableOpacity>
                <Animated.View // Special animatable View
                  style={{
                    ...this.props.style,
                    opacity: fadeAnim,
                    alignItems: "center" // Bind opacity to animated value
                  }}
                >
                  <View
                    style={{
                      marginTop: 10,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={{ color: "black", fontSize: 20 }}>
                      {"Regisztráció"}
                    </Text>
                  </View>
                </Animated.View>

                <View
                  style={{
                    height: width / 9,
                    width: width / 9
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 30
                }}
              >
                <Image
                  source={require("../src/reg.png")}
                  style={{ width: width - 100, height: height / 3 }}
                />
              </View>

              <View style={{ padding: 20, marginTop: height / 50, bottom: 10 }}>
                <View>
                  <View>
                    <Text style={{ fontSize: 12, color: "gray" }}>
                      {"Teljes név"}
                    </Text>
                    <TextInput
                      ref="FirstInput"
                      returnKeyType="go"
                      secureTextEntry={false}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      style={{ height: 40 }}
                      onChangeText={name => this.setState({ name })}
                      value={this.state.name}
                    />
                    <View
                      style={{
                        height: 1,
                        paddingTop: 0.3,
                        backgroundColor: "gray",
                        top: -10
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: "gray" }}>
                      {"Becenév"}
                    </Text>
                    <TextInput
                      ref="FirstInput"
                      returnKeyType="go"
                      secureTextEntry={false}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      style={{ height: 40 }}
                      onChangeText={petName => this.setState({ petName })}
                      value={this.state.petName}
                    />
                    <View
                      style={{
                        height: 1,
                        paddingTop: 0.3,
                        backgroundColor: "gray",
                        top: -10
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: "gray" }}>
                      {"Város"}
                    </Text>
                    <TextInput
                      ref="FirstInput"
                      returnKeyType="go"
                      secureTextEntry={false}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      style={{ height: 40 }}
                      onChangeText={city => this.setState({ city })}
                      value={this.state.city}
                    />
                    <View
                      style={{
                        height: 1,
                        paddingTop: 0.3,
                        backgroundColor: "gray",
                        top: -10
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: "gray" }}>
                      {"E-mail"}
                    </Text>
                    <TextInput
                      ref="FirstInput"
                      returnKeyType="go"
                      secureTextEntry={false}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      style={{ height: 40 }}
                      onChangeText={email => this.setState({ email })}
                      value={this.state.email}
                    />
                    <View
                      style={{
                        height: 1,
                        paddingTop: 0.3,
                        backgroundColor: "gray",
                        top: -10
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: "gray" }}>
                      {"Jelszó"}
                    </Text>
                    <TextInput
                      ref="SecondInput"
                      returnKeyType="go"
                      secureTextEntry={true}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      style={{ height: 40 }}
                      onChangeText={password => this.setState({ password })}
                      value={this.state.password}
                    />
                    <View
                      style={{
                        height: 1,
                        paddingTop: 0.3,
                        backgroundColor: "gray",
                        top: -10
                      }}
                    />
                  </View>
                </View>
                <View>
                  <View>
                    <Text style={{ fontSize: 12, color: "gray" }}>
                      {"Szervezet"}
                    </Text>
                    <TextInput
                      ref="FirstInput"
                      returnKeyType="go"
                      secureTextEntry={false}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      style={{ height: 40 }}
                      onChangeText={organization =>
                        this.setState({ organization })
                      }
                      value={this.state.organization}
                    />
                    <View
                      style={{
                        height: 1,
                        paddingTop: 0.3,
                        backgroundColor: "gray",
                        top: -10
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: "gray" }}>
                      {"Szakterület"}
                    </Text>
                    <TextInput
                      ref="FirstInput"
                      returnKeyType="go"
                      secureTextEntry={false}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      style={{ height: 40 }}
                      onChangeText={specialization =>
                        this.setState({ specialization })
                      }
                      value={this.state.specialization}
                    />
                    <View
                      style={{
                        height: 1,
                        paddingTop: 0.3,
                        backgroundColor: "gray",
                        top: -10
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: "gray" }}>
                      {"Tanulmányok"}
                    </Text>
                    <TextInput
                      ref="FirstInput"
                      returnKeyType="go"
                      secureTextEntry={false}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      style={{ height: 40 }}
                      onChangeText={education => this.setState({ education })}
                      value={this.state.education}
                    />
                    <View
                      style={{
                        height: 1,
                        paddingTop: 0.3,
                        backgroundColor: "gray",
                        top: -10
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: "gray" }}>
                      {"Leírás"}
                    </Text>
                    <TextInput
                      ref="FirstInput"
                      returnKeyType="go"
                      secureTextEntry={false}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      style={{ height: 120, textAlignVertical: "top" }}
                      multiline
                      onChangeText={description =>
                        this.setState({ description })
                      }
                      value={this.state.description}
                    />
                    <View
                      style={{
                        height: 1,
                        paddingTop: 0.3,
                        backgroundColor: "gray",
                        top: -10
                      }}
                    />
                  </View>
                  {/* <View style={{ flex: 1 }}>
                  <MultiSelect
                    hideTags
                    items={items}
                    uniqueKey="id"
                    ref={component => {
                      this.multiSelect = component;
                    }}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Válassz kategóriát"
                    searchInputPlaceholderText="Kulcsszó"
                    onChangeInput={text => console.log(text)}
                    //altFontFamily="ProximaNova-Light"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    //displayKey="name"
                    searchInputStyle={{ color: "#CCC" }}
                    submitButtonColor="#CCC"
                    submitButtonText="Kész"
                  />
                  <View />
                </View>*/}
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10
                  }}
                >
                  {this.showImage()}
                  <TouchableOpacity onPress={() => this.image()}>
                    <View
                      style={{
                        height: 40,
                        backgroundColor: "white",
                        width: width - 40,
                        borderColor: "#2E348B",
                        borderRadius: 10,
                        borderWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        marginBottom: 20
                      }}
                    >
                      <Text style={{ color: "#2E348B" }}>
                        {"Válassz magadról egy képet!"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.reg()}>
                    <View
                      style={{
                        height: 40,
                        backgroundColor: "white",
                        width: width - 40,
                        borderColor: "#2E348B",
                        borderRadius: 10,
                        borderWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20
                      }}
                    >
                      <Text style={{ color: "#2E348B" }}>{"Regisztráció"}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

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
  Animated
} from "react-native";
const base64 = require("base-64");
const utf8 = require("utf8");
import MultiSelect from "react-native-multiple-select";

import { Router, Scene, Actions } from "react-native-router-flux";
import ImagePicker from "react-native-image-crop-picker";

import * as Keychain from "react-native-keychain";
var { height, width } = Dimensions.get("window");

const instructions = Platform.select({});

export default class Product extends Component<{}> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      text: "",
      fadeAnim: new Animated.Value(0),
      password: "",
      email: "",
      name: this.props.data.title,
      city: "",
      access_token: "",
      role: "admin",
      organization: "",
      specialization: "",
      education: "",
      material: "",
      human: "",
      service: "",
      description: this.props.data.desc,
      petName: "pet",
      selectedItems: [],
      imageUrl: this.props.data.imageURL,
      available: true
    };
    this._storeData();
  }
  _storeData = async () => {
    try {
      const value = await AsyncStorage.getItem("@eterkep:userData");
      if (value !== null) {
        var values = JSON.parse(value);
        this.setState({
          token: values.token,
          id: values.id,
          petName: values.petName
        });
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  deleteOk() {
    Alert.alert(
      "Figyelmeztetés!",
      "Biztos, hogy törölni akarod a fiókod?",
      [
        {
          text: "Mégse",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Igen", onPress: () => this.delete() }
      ],
      { cancelable: false }
    );
  }

  me() {
    console.log(this.state.token);

    if (
      this.state.name == "" ||
      this.state.description == "" ||
      this.state.selectedItems == [] ||
      this.state.imageUrl == ""
    ) {
      alert("Töltsd ki minden adatot");
    } else {
      let data = {
        method: "POST",
        body:
          "title=" +
          this.state.name +
          "&desc=" +
          this.state.description +
          "&available=" +
          this.state.available +
          "&category=" +
          JSON.stringify(this.state.selectedItems),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      return fetch(
        "https://iszosz.herokuapp.com/users/" + this.state.id + "/product/",
        data
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          this.uploadPhoto(responseJson.id);
        })
        .catch(error => {
          alert("HIBA");
        });
    }
  }

  image() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true
    }).then(image => {
      console.log(image);
      this.setState({ imagePath: image.path, imageUrl: image.path });
    });
  }

  async uploadPhoto(res) {
    var url =
      "https://iszosz.herokuapp.com/users/" +
      this.state.id +
      "/product/" +
      res +
      "/p";
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
        } else {
          Alert.alert("Sikeres feltöltés", "");
          Actions.home({ oldal: "right" });
        }
      });
  }

  delete() {
    let data = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    return fetch("https://iszosz.herokuapp.com/users/" + this.state.id, data)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        Actions.login();
      })
      .catch(error => {
        console.log(error);

        Actions.login();
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

  sourceImage() {
    if (this.state.imageUrl) {
      return { uri: this.state.imageUrl };
    } else {
      return require("../src/plus2.png");
    }
  }

  imageSize() {
    if (this.state.imageUrl) {
      return width / 2;
    } else {
      return width / 4;
    }
  }

  render() {
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

    if (this.state.available) {
      var onSwitch = "#52D468";
      var onSwitchText = "Elérhető";
    } else {
      var onSwitch = "#914646";
      var onSwitchText = "Jelenleg foglalt";
    }
    return (
      <View style={styles.container}>
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
              <TouchableOpacity
                onPress={() => Actions.home({ oldal: "right" })}
              >
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
                    style={{
                      width: width / 12,
                      height: width / 12,
                      borderRadius: 30
                    }}
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
                    {"Erőforrás szerkesztése"}
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
              <TouchableOpacity onPress={() => this.image()}>
                <Image
                  source={this.sourceImage()}
                  style={{
                    width: this.imageSize(),
                    height: this.imageSize(),
                    borderRadius: 30
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={{ padding: 20, marginTop: height / 50, bottom: 10 }}>
              <View>
                <View>
                  <Text style={{ fontSize: 12, color: "gray" }}>{"Neve"}</Text>
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
                    {"Leírás"}
                  </Text>
                  <TextInput
                    ref="FirstInput"
                    returnKeyType="go"
                    secureTextEntry={false}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    style={{ height: 120, textAlignVertical: "top" }}
                    multiline
                    onChangeText={description => this.setState({ description })}
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
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "gray",
                    borderWidth: 0.1,
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 20
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: onSwitch,
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      width: width * 0.7
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "white" }}>
                      {onSwitchText}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: "white",
                      marginTop: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10
                    }}
                  >
                    <Switch
                      style={{ backgroundColor: "white", borderRadius: 2 }}
                      onValueChange={value =>
                        this.setState({ available: value })
                      }
                      value={this.state.available}
                    />
                  </View>
                </View>

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
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10
                }}
              >
                <TouchableOpacity onPress={() => this.me()}>
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
                    <Text style={{ color: "#2E348B" }}>
                      {"Erőforrás feltöltése"}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/*<TouchableOpacity onPress={() => this.deleteOk()}>
                  <View
                    style={{
                      height: 40,
                      marginTop: 20,
                      backgroundColor: "#914646",
                      width: width - 40,
                      borderColor: "white",
                      borderRadius: 10,
                      borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20
                    }}
                  >
                    <Text style={{ color: "white" }}>{"Profil törlése"}</Text>
                  </View>
                </TouchableOpacity>*/}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

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
      petName: "pet",
      selectedItems: []
    };
  }

  reg = async () => {
    let data = {
      method: "POST",
      body: JSON.stringify({
        password: this.state.password,
        email: this.state.email,
        name: this.state.name,
        city: this.state.city,
        access_token: "e0cAiR20cMQMpSpV1z1DCuLFS3HcArbx",
        role: "admin",
        organization: this.state.organization,
        specialization: this.state.specialization,
        education: this.state.education,
        material: this.state.material,
        human: this.state.human,
        service: this.state.service,
        description: this.state.description,
        keywords: this.state.selectedItems,
        petName: this.state.petName
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    return fetch("https://dry-mountain-15425.herokuapp.com/users", data)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.valid == false) {
          alert(
            "Kérlek ellenőrizd az összes adatot, ha úgy sem jó akkor az e-mail cim foglalt"
          );
        } else {
          alert(
            "Sikeres regisztráció!, Most már be tudsz lépni az adataiddal!"
          );
          Actions.login();
        }
      })
      .catch(error => {
        alert(
          "Kérlek töltsd ki az összes adatot, ha úgy sem jó akkor az e-mail cim foglalt"
        );
      });
  };

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
    var { height, width } = Dimensions.get("window");
    var iWidth = width / 240;
    console.log(this.state.material);

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <Animated.View // Special animatable View
              style={{
                ...this.props.style,
                opacity: fadeAnim // Bind opacity to animated value
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 30
                }}
              >
                <Text style={{ color: "black", fontSize: 30 }}>
                  {"Regisztráció"}
                </Text>
              </View>
            </Animated.View>
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
                  <Text style={{ fontSize: 12, color: "gray" }}>{"Név"}</Text>
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
                  <Text style={{ fontSize: 12, color: "gray" }}>{"Város"}</Text>
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
                    {"Tárgyi erőforrás"}
                  </Text>
                  <TextInput
                    ref="SecondInput"
                    returnKeyType="go"
                    multiline
                    secureTextEntry={false}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    style={{ height: 120, textAlignVertical: "top" }}
                    onChangeText={material => this.setState({ material })}
                    value={this.state.material}
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
                    {"Humán erőforrás"}
                  </Text>
                  <TextInput
                    ref="FirstInput"
                    returnKeyType="go"
                    secureTextEntry={false}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    style={{ height: 120, textAlignVertical: "top" }}
                    multiline
                    onChangeText={human => this.setState({ human })}
                    value={this.state.human}
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
                    {"Szolgáltatás"}
                  </Text>
                  <TextInput
                    ref="FirstInput"
                    returnKeyType="go"
                    secureTextEntry={false}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    style={{ height: 120, textAlignVertical: "top" }}
                    onChangeText={service => this.setState({ service })}
                    value={this.state.service}
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
                <View style={{ flex: 1 }}>
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
                </View>
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10
                }}
              >
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

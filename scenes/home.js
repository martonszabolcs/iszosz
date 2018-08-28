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
  Easing,
  DrawerLayoutAndroid,
  ViewPagerAndroid
} from "react-native";

import { Router, Scene, Actions } from "react-native-router-flux";
import api from "../utilities/api";
import * as Keychain from "react-native-keychain";
const SideMenu = require("react-native-side-menu");

import SearchBar from "react-native-searchbar";
import Swiper from "react-native-swiper";
import Drawer from "react-native-drawer-menu";
import SideBar from "./sidebar";
import Search from "./search";

var { height, width } = Dimensions.get("window");

const instructions = Platform.select({});

export default class Home extends Component<{}> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      text: "",
      password: "",
      results: "",
      menuOpen: false,
      modalVisible: false,
      index: 0,
      petName: this.props.petName,
      id: this.props.id,
      canavasOpen: this.props.canavasOpen,
      token: this.props.token,
      lista: []
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
    this._storeData();
  }

  _storeData = async () => {
    var userData = {
      petName: this.state.petName,
      id: this.state.id,
      token: this.state.token
    };
    var string = JSON.stringify(userData);
    console.log(userData);
    console.log(string);
    try {
      await AsyncStorage.setItem("@eterkep:userData", string);
    } catch (error) {
      console.log(error);
    }

    try {
      const value = await AsyncStorage.getItem("@eterkep:userData");
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };
  handleSwipeIndexChange(index) {
    this.setState({ index });
  }

  componentDidMount() {
    api.lista().then(lista => {
      this.setState({
        lista: lista.rows
      });
      console.log(this.state.lista);
    });
  }

  componentWillMount() {
    console.log(this.state);
    console.log(this.state.canavasOpen);
    if (this.state.canavasOpen === 1) {
      this.props.handleMenu();
    }
  }
  _handleResults(results) {
    //this.setState({ results });
  }

  handleMenu() {
    const { menuOpen } = this.state;
    this.setState({
      menuOpen: !menuOpen
    });
  }

  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    console.log(this.state.results);
    var { height, width } = Dimensions.get("window");
    var iWidth = width / 240;
    var cornerLeft = width - 10; // 10 is the width/height of the corner
    var cornerTop = height - 10;
    var addFlightLeft = (width - 50) / 2;
    var addFlightTop = height - width / 6;
    var menu = width / 6;

    var navigationView = <SideBar />;

    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => Actions.jegyzet()}
          underlayColor="transparent"
          style={[
            styles.newFlight,
            { top: height * 0.75, left: addFlightLeft }
          ]}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../src/plus.png")}
          />
        </TouchableHighlight>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <ViewPagerAndroid
            initialPage={this.state.index}
            style={{ flex: 1 }}
            onPageSelected={e => {
              console.log(e.nativeEvent.position);
            }}
            ref={viewPager => {
              this.viewPager = viewPager;
            }}
          >
            <View style={styles.pageStyle} key="1">
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: height / 20
                }}
              >
                <TouchableOpacity onPress={() => this.viewPager.setPage(1)}>
                  <View>
                    <Image
                      source={require("../src/next.png")}
                      style={{ width: width / 5, height: width / 5 }}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 24
                  }}
                >
                  Szeretettel üdvözlünk az E-Térkép első felhasználói, tesztelői
                  között!
                </Text>
                <Image
                  source={require("../src/homeman.png")}
                  style={{ width: width / 2, height: width / 2 }}
                />
                <Text
                  style={{ color: "black", fontWeight: "bold", fontSize: 30 }}
                >
                  {" "}
                </Text>
              </View>

              <View
                style={{
                  position: "absolute",
                  bottom: height / 20,
                  left: 10,
                  right: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.toggleModal(!this.state.modalVisible);
                  }}
                >
                  <View
                    style={{
                      height: 40,
                      backgroundColor: "#2E348B",
                      width: width - 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20
                    }}
                  >
                    <Text style={{ color: "white" }}>{"Bezárás"}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.pageStyle} key="2">
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: height / 20
                }}
              >
                <TouchableOpacity onPress={() => this.viewPager.setPage(2)}>
                  <View>
                    <Image
                      source={require("../src/next.png")}
                      style={{ width: width / 5, height: width / 5 }}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: 16
                  }}
                >
                  Az Erőforrástérkép az Ifjúsági Szolgáltatók Országos
                  Szövetsége által létrehozott, az ifjúsági területen
                  tevékenykedő szakemberek, szervezetek számára elérhető
                  adatbázis, amely lehetővé teszi azon erőforrások
                  megjelenítését, melyek a fenntartható és optimális
                  kihasználtságot, költséghatékonyságot és profizmust
                  biztosítják a megosztók munkája során. Az Erőforrástérkép az
                  ISZOSZ mindenkori tagságának és a releváns partnereinek
                  készült.
                </Text>

                <Text style={{ color: "black", fontSize: 30 }}> </Text>
              </View>

              <View
                style={{
                  position: "absolute",
                  bottom: height / 20,
                  left: 10,
                  right: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.toggleModal(!this.state.modalVisible);
                  }}
                >
                  <View
                    style={{
                      height: 40,
                      backgroundColor: "#2E348B",
                      width: width - 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20
                    }}
                  >
                    <Text style={{ color: "white" }}>{"Bezárás"}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.pageStyle} key="3">
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: height / 20
                }}
              >
                <TouchableOpacity onPress={() => this.viewPager.setPage(3)}>
                  <View>
                    <Image
                      source={require("../src/next.png")}
                      style={{ width: width / 5, height: width / 5 }}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: 16
                  }}
                >
                  Jelenleg az applikációnak egy teszt verziója érhető el. Három
                  fő kategóriával találkozhatsz: humán és tárgyi erőforrások,
                  valamint az előbbi kettőnél összetettebb, „csomagszerű”
                  szolgáltatás kategóriákkal. A kereső jelenleg csak az E-térkép
                  előbbi 3 fő kategóriájának alkategóriáira tud rákeresni, ám a
                  közeljövőben tartalmi keresést is elérhetővé szeretnénk tenni.
                  A megosztott tartalmak személyekhez kötött adatlapokon
                  érhetőek el. A kategorizált adatbázis egyelőre még nem
                  elérhető, tehát kérjük a lap tetején található keresőt, vagy a
                  baloldalról nyíló menü adatlapok menüpontját használd a
                  böngészéséhez.
                </Text>

                <Text style={{ color: "black", fontSize: 30 }}> </Text>
              </View>

              <View
                style={{
                  position: "absolute",
                  bottom: height / 20,
                  left: 10,
                  right: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.toggleModal(!this.state.modalVisible);
                  }}
                >
                  <View
                    style={{
                      height: 40,
                      backgroundColor: "#2E348B",
                      width: width - 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20
                    }}
                  >
                    <Text style={{ color: "white" }}>{"Bezárás"}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.pageStyle} key="4">
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: height / 20
                }}
              >
                <TouchableOpacity onPress={() => this.viewPager.setPage(0)}>
                  <View>
                    <Image
                      source={require("../src/backs.png")}
                      style={{ width: width / 5, height: width / 5 }}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: 16
                  }}
                >
                  Az adatlapok jelenleg még általatok nem szerkeszthetőek, ezt
                  az első fejlesztés során, egy PC-ről is elérhető admin felület
                  létrehozásával szeretnénk elérni. Ahhoz, hogy fejleszteni
                  tudjuk az applikációt, szükségünk van a te véleményedre,
                  ötleteidre is, amiket a titkar@iszosz.org email címen tudsz
                  megosztani velünk! Az APP első fejlesztése nyár elején
                  várható!
                </Text>

                <Text style={{ color: "black", fontSize: 30 }}> </Text>
              </View>

              <View
                style={{
                  position: "absolute",
                  bottom: height / 20,
                  left: 10,
                  right: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.toggleModal(!this.state.modalVisible);
                  }}
                >
                  <View
                    style={{
                      height: 40,
                      backgroundColor: "#2E348B",
                      width: width - 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20
                    }}
                  >
                    <Text style={{ color: "white" }}>{"Bezárás"}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ViewPagerAndroid>
        </Modal>

        <View
          style={{
            flex: 1,
            borderRadius: 10,
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              width: width,
              backgroundColor: "#2A9371",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 10
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Figyelmeztetés!",
                  "Biztos, hogy kijelentkezel?",
                  [
                    {
                      text: "Mégse",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "Igen", onPress: () => console.log("OK Pressed") }
                  ],
                  { cancelable: false }
                );
              }}
            >
              <View style={[styles.menu1]}>
                <Image
                  source={require("../src/logout.png")}
                  style={{ width: width / 10, height: width / 10 }}
                />
              </View>
            </TouchableOpacity>

            <Text style={{ color: "white", fontSize: 20 }}>
              {"Szia " + this.state.petName + "!"}
            </Text>

            <View style={{ width: width / 10, height: width / 10 }} />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ScrollView
              removeClippedSubviews={true}
              style={{ backgroundColor: "transparent" }}
            >
              <ListView
                dataSource={this.dataSource.cloneWithRows(this.state.lista)}
                enableEmptySections={true}
                initialListSize={0}
                contentContainerStyle={styles.list}
                scrollEnabled={true}
                pageSize={2}
                renderRow={(rowData, sectionID, rowID, highlightRow) => (
                  <View
                    numberOfLines={1}
                    style={{ backgroundColor: "transparent" }}
                  >
                    <View style={{ marginTop: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          Actions.jegyzetReszletes({
                            title: rowData.title,
                            jegyzetName: rowData.people,
                            content: rowData.content,
                            id: rowData.id
                          });
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "white",
                            width: width - 40,
                            height: width / 5 + 20,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "#D3D3D3",
                            flexDirection: "row"
                          }}
                        >
                          <View
                            style={{
                              width: width / 6 + 20,
                              borderRadius: 10,
                              backgroundColor: "#2A9371",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Image
                              style={{
                                width: width / 6,
                                height: width / 6,
                                borderRadius: 30
                              }}
                              source={{
                                uri:
                                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEU3h8BvVh5IU7q_weev_J4yOj4gI3GpDk8af9qO8fzmSitR5V7Q"
                              }}
                            />
                            <Text
                              numberOfLines={1}
                              style={[
                                styles.cim,
                                {
                                  color: "white",
                                  marginLeft: 5,
                                  fontWeight: "bold",
                                  marginTop: 5,
                                  marginRight: 5,
                                  textAlign: "center",
                                  fontSize: 12
                                }
                              ]}
                            >
                              {rowData.people}
                            </Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text
                              numberOfLines={1}
                              style={[
                                styles.cim,
                                {
                                  color: "black",
                                  marginLeft: 5,
                                  marginTop: 5,
                                  marginRight: 5,
                                  fontSize: 18,
                                  fontWeight: "bold"
                                }
                              ]}
                            >
                              {rowData.title}
                            </Text>
                            <Text
                              numberOfLines={3}
                              style={[
                                styles.cim,
                                {
                                  color: "black",
                                  marginLeft: 5,
                                  marginTop: 5,
                                  marginRight: 5,
                                  fontSize: 12
                                }
                              ]}
                            >
                              {rowData.content}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
              <View style={{ height: 100 }} />
            </ScrollView>
          </View>
        </View>

        <View
          style={[
            styles.menu,
            {
              width: width,
              height: width / 4,
              justifyContent: "space-around",
              alignItems: "center"
            }
          ]}
        >
          <TouchableOpacity onPress={() => Actions.profile()}>
            <View style={[styles.menu1]}>
              <Image
                source={require("../src/menu/hum.png")}
                style={{ width: width / 6, height: width / 6 }}
              />
              <Text> Profilom </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.adatlapok()}>
            <View style={[styles.menu1]}>
              <Image
                source={require("../src/menu/menu.png")}
                style={{ width: width / 6, height: width / 6 }}
              />
              <Text> Adatlapok </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.bongeszes({ tipus: 1 })}>
            <View style={[styles.menu1]}>
              <Image
                source={require("../src/menu/targy.png")}
                style={{ width: width / 6, height: width / 6 }}
              />
              <Text> Erőforrások </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.toggleModal(!this.state.modalVisible)}
          >
            <View style={[styles.menu1]}>
              <Image
                source={require("../src/menu/inf.png")}
                style={{ width: width / 6, height: width / 6 }}
              />
              <Text> Segítség </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  menu: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  felirat: {
    color: "black",
    textAlign: "center",
    marginTop: 1,
    fontSize: 10
  },
  felirat2: {
    color: "black",
    textAlign: "center",
    fontSize: 10
  },
  menu1: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    resizeMode: "cover" // or 'stretch'
  },
  modal: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    color: "black",
    fontSize: 20
  },
  viewPager: {
    flex: 1
  },
  pageStyle: {
    alignItems: "center",
    padding: 20
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  newFlightStatic: {
    height: 86,
    width: 86
  },
  newFlight: {
    height: 50,
    width: 50,
    position: "absolute",
    zIndex: 10
  },

  newFlightImage: {
    height: 86,
    width: 86
  }
});

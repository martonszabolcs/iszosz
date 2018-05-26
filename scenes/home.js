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
  Easing,
  DrawerLayoutAndroid,
  ViewPagerAndroid
} from "react-native";

import { Router, Scene, Actions } from "react-native-router-flux";
import api from "../utilities/api";
import * as Keychain from "react-native-keychain";

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
      canavasOpen: this.props.canavasOpen,
      token: this.props.token,
      userName: this.props.userName,
      lista: []
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
  }
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

  news = async () => {
    let data = {
      method: "POST",
      credentials: "same-origin",
      mode: "same-origin",
      body: JSON.stringify({
        people: this.state.userName,
        title: "CIM",
        content: "LEIRÁS",
        image: "image"
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    return fetch("https://dry-mountain-15425.herokuapp.com/notes", data)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        api.lista().then(lista => {
          this.setState({
            lista: lista.rows
          });
          console.log(this.state.lista);
        });
      })
      .catch(error => {
        alert("HIBA");
      });
  };

  async getItem() {
    try {
      const value = await AsyncStorage.getItem("@eterkep:user");
      if (value !== null) {
        this.setState({
          userName: value.name
        });
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  componentWillMount() {
    console.log(this.state.canavasOpen);
    if (this.state.canavasOpen === 1) {
      this.props.handleMenu();
    }
    this.getItem();
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

    var navigationView = <SideBar />;

    return (
      <View style={styles.container}>
        <DrawerLayoutAndroid
          ref="DRAWER"
          drawerWidth={width / 2}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}
        >
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
                    Szeretettel üdvözlünk az E-Térkép első felhasználói,
                    tesztelői között!
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
                    Jelenleg az applikációnak egy teszt verziója érhető el.
                    Három fő kategóriával találkozhatsz: humán és tárgyi
                    erőforrások, valamint az előbbi kettőnél összetettebb,
                    „csomagszerű” szolgáltatás kategóriákkal. A kereső jelenleg
                    csak az E-térkép előbbi 3 fő kategóriájának alkategóriáira
                    tud rákeresni, ám a közeljövőben tartalmi keresést is
                    elérhetővé szeretnénk tenni. A megosztott tartalmak
                    személyekhez kötött adatlapokon érhetőek el. A kategorizált
                    adatbázis egyelőre még nem elérhető, tehát kérjük a lap
                    tetején található keresőt, vagy a baloldalról nyíló menü
                    adatlapok menüpontját használd a böngészéséhez.
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
                    az első fejlesztés során, egy PC-ről is elérhető admin
                    felület létrehozásával szeretnénk elérni. Ahhoz, hogy
                    fejleszteni tudjuk az applikációt, szükségünk van a te
                    véleményedre, ötleteidre is, amiket a titkar@iszosz.org
                    email címen tudsz megosztani velünk! Az APP első fejlesztése
                    nyár elején várható!
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
              height: height / 3,
              borderRadius: 10,
              backgroundColor: "#189375",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: width,
                padding: 10,
                backgroundColor: "#189375",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                {"Üdvözlünk " + this.state.userName + "!"}
              </Text>
            </View>

            <Search />

            <View
              style={{
                top: height / 2.5 / 2,
                position: "absolute",
                zIndex: -10,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.news();
                }}
              >
                <Image
                  source={require("../src/plus.png")}
                  style={{ width: width / 10, height: width / 10 }}
                />
              </TouchableOpacity>

              <Text style={{ color: "white", fontSize: 16 }}>
                {"Új jegyzet hozzáadása"}
              </Text>
            </View>
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
                          Actions.findreszletes({
                            user: rowData,
                            keywords: this.state.keywords
                          });
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#D3D3D3",
                            width: width / 2 - 40,
                            height: 100,
                            borderRadius: 10
                          }}
                        >
                          <Text
                            numberOfLines={2}
                            style={[
                              styles.cim,
                              {
                                color: "black",
                                marginLeft: 5,
                                marginTop: 5,
                                marginRight: 5,
                                textAlign: "center",
                                fontSize: 12
                              }
                            ]}
                          >
                            {rowData.people} - {rowData.title}
                          </Text>
                          <Text
                            numberOfLines={4}
                            style={[
                              styles.cim,
                              {
                                color: "black",
                                marginLeft: 5,
                                marginTop: 5,
                                marginRight: 5,
                                textAlign: "center",
                                fontSize: 12
                              }
                            ]}
                          >
                            {rowData.content}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
              <View style={{ height: 100 }} />
            </ScrollView>
          </View>
        </DrawerLayoutAndroid>

        <View
          style={[
            styles.menu,
            { width: width, height: width / 5, justifyContent: "space-around" }
          ]}
        >
          <TouchableOpacity onPress={() => this.refs["DRAWER"].openDrawer()}>
            <View style={[styles.menu1]}>
              <Image
                source={require("../src/menu/menu.png")}
                style={{ width: width / 6, height: width / 6 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.bongeszes({ tipus: 1 })}>
            <View style={[styles.menu1]}>
              <Image
                source={require("../src/menu/hum.png")}
                style={{ width: width / 6, height: width / 6 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.bongeszes({ tipus: 2 })}>
            <View style={[styles.menu1]}>
              <Image
                source={require("../src/menu/targy.png")}
                style={{ width: width / 6, height: width / 6 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.bongeszes({ tipus: 3 })}>
            <View style={[styles.menu1]}>
              <Image
                source={require("../src/menu/szolg.png")}
                style={{ width: width / 6, height: width / 6 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.toggleModal(!this.state.modalVisible);
            }}
          >
            <View style={[styles.menu1]}>
              <Image
                source={require("../src/menu/inf.png")}
                style={{ width: width / 6, height: width / 6 }}
              />
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
  }
});

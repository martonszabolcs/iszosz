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
  DrawerLayoutAndroid
} from "react-native";

import { Router, Scene, Actions } from "react-native-router-flux";

import SearchBar from "react-native-searchbar";
import Swiper from "react-native-swiper";
import SideBar from "./sidebar";
import Search from "./search";

var { height, width } = Dimensions.get("window");

//import {OffCanvas3D} from 'react-native-off-canvas-menu'

const items = [
  1337,
  "janeway",
  {
    lots: "of",
    different: {
      types: 0,
      data: false,
      that: {
        can: {
          be: {
            quite: {
              complex: {
                hidden: ["gold!"]
              }
            }
          }
        }
      }
    }
  },
  [4, 2, "tree"]
];

const instructions = Platform.select({});

export default class Bongeszes extends Component<{}> {
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
      tipus: this.props.tipus,
      draw: 0
    };
  }
  handleSwipeIndexChange(index) {
    this.setState({ index });
  }

  componentDidMount() {}

  componentWillMount() {}
  _handleResults(results) {
    //this.setState({ results });
  }

  handleMenu() {
    const { menuOpen } = this.state;
    this.setState({
      menuOpen: !menuOpen
    });
  }

  tipusok() {
    console.log(this.state.tipus);
    if (this.state.tipus === 1) {
      return (
        <View
          style={{
            height: height / 6,
            backgroundColor: "#189375",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={styles.text}>Humán erőforrások</Text>
        </View>
      );
    }
    if (this.state.tipus === 2) {
      return (
        <View
          style={{
            height: height / 6,
            backgroundColor: "#964446",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={styles.text}>Tárgyi erőforrások</Text>
        </View>
      );
    }
    if (this.state.tipus === 3) {
      return (
        <View
          style={{
            height: height / 6,
            backgroundColor: "#D0B555",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={styles.text}>Szolgáltatások</Text>
        </View>
      );
    }
  }

  leirasokTipus() {
    console.log(this.state.tipus);
    if (this.state.tipus === 1) {
      return (
        <ScrollView>
          <TouchableOpacity
            onPress={() =>
              Actions.adatlap({ category: 1, keywords: "Tréning, tanácsadás" })
            }
          >
            <View
              style={{
                height: height / 11,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>
                {"Tréning, tanácsadás"}
              </Text>
              <Image
                source={require("../src/nyil.png")}
                style={{ width: width / 15, height: width / 15 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Actions.adatlap({ category: 2, keywords: "Projektmenedzsment" })
            }
          >
            <View
              style={{
                height: height / 11,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>
                {"Projektmenedzsment"}
              </Text>
              <Image
                source={require("../src/nyil.png")}
                style={{ width: width / 15, height: width / 15 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Actions.adatlap({ category: 3, keywords: "Táborszervezés" })
            }
          >
            <View
              style={{
                height: height / 11,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>
                {"Táborszervezés"}
              </Text>
              <Image
                source={require("../src/nyil.png")}
                style={{ width: width / 15, height: width / 15 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Actions.adatlap({ category: 4, keywords: "Rendezvényszervezés" })
            }
          >
            <View
              style={{
                height: height / 11,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>
                {"Rendezvényszervezés"}
              </Text>
              <Image
                source={require("../src/nyil.png")}
                style={{ width: width / 15, height: width / 15 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Actions.adatlap({ category: 5, keywords: "Nemzetközi" })
            }
          >
            <View
              style={{
                height: height / 11,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>
                {"Nemzetközi"}
              </Text>
              <Image
                source={require("../src/nyil.png")}
                style={{ width: width / 15, height: width / 15 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Actions.adatlap({
                category: 6,
                keywords: "Egyéb humán erőforrás"
              })
            }
          >
            <View
              style={{
                height: height / 11,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>
                {"Egyéb humán erőforrás"}
              </Text>
              <Image
                source={require("../src/nyil.png")}
                style={{ width: width / 15, height: width / 15 }}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      );
    }
    if (this.state.tipus === 2) {
      return (
        <ScrollView>
          <TouchableOpacity
            onPress={() =>
              Actions.adatlap({ category: 7, keywords: "Elektronika" })
            }
          >
            <View
              style={{
                height: height / 11,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>
                {"Elektronika"}
              </Text>
              <Image
                source={require("../src/nyil2.png")}
                style={{ width: width / 15, height: width / 15 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Actions.adatlap({ category: 8, keywords: "Bútor, irodai eszköz" })
            }
          >
            <View
              style={{
                height: height / 11,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>
                {"Bútor, irodai eszköz"}
              </Text>
              <Image
                source={require("../src/nyil2.png")}
                style={{ width: width / 15, height: width / 15 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Actions.adatlap({
                category: 9,
                keywords: "Játék, sport és tréning eszköz"
              })
            }
          >
            <View
              style={{
                height: height / 11,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>
                {"Játék, sport és tréning eszköz"}
              </Text>
              <Image
                source={require("../src/nyil2.png")}
                style={{ width: width / 15, height: width / 15 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Actions.adatlap({
                category: 10,
                keywords: "Egyéb tárgyi erőforrás"
              })
            }
          >
            <View
              style={{
                height: height / 11,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>
                {"Egyéb tárgyi erőforrás"}
              </Text>
              <Image
                source={require("../src/nyil2.png")}
                style={{ width: width / 15, height: width / 15 }}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      );
    }
    if (this.state.tipus === 3) {
      return (
        <ScrollView>
          <TouchableOpacity
            onPress={() =>
              Actions.adatlap({
                category: 11,
                keywords: "Helyszín, logisztika"
              })
            }
          >
            <View
              style={{
                height: height / 11,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>
                {"Helyszín, logisztika"}
              </Text>
              <Image
                source={require("../src/nyil3.png")}
                style={{ width: width / 15, height: width / 15 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Actions.adatlap({
                category: 12,
                keywords: "Szolgáltatás fiataloknak"
              })
            }
          >
            <View
              style={{
                height: height / 11,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>
                {"Szolgáltatás fiataloknak"}
              </Text>
              <Image
                source={require("../src/nyil3.png")}
                style={{ width: width / 15, height: width / 15 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Actions.adatlap({
                category: 13,
                keywords: "Szolgáltatás szakembereknek"
              })
            }
          >
            <View
              style={{
                height: height / 11,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>
                {"Szolgáltatás szakembereknek"}
              </Text>
              <Image
                source={require("../src/nyil3.png")}
                style={{ width: width / 15, height: width / 15 }}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      );
    }
  }

  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  menu() {
    var color = "";
    if (this.state.tipus === 1) {
      color = "#29916F";
    }
    if (this.state.tipus === 2) {
      color = "#914545";
    }
    if (this.state.tipus === 3) {
      color = "#CEB541";
    }

    return (
      <View
        style={[
          styles.menu,
          { width: width, height: width / 5, justifyContent: "space-around" }
        ]}
      >
        <TouchableOpacity onPress={() => Actions.home()}>
          <View
            style={{
              width: width - 40,
              backgroundColor: color,
              borderRadius: 10,
              height: width / 8,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: width / 20,
                textAlign: "center"
              }}
            >
              Főoldal
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  modal() {
    if (this.state.modalVisible) {
      return (
        <Image
          source={require("../src/menu/icon_info_current.png")}
          style={{ width: width / 6, height: width / 6 }}
        />
      );
    } else {
      return (
        <Image
          source={require("../src/menu/inf.png")}
          style={{ width: width / 6, height: width / 6 }}
        />
      );
    }
  }

  imageDrawer() {
    if (this.state.draw === 1) {
      return (
        <Image
          source={require("../src/menu/icon_menu_current.png")}
          style={{ width: width / 6, height: width / 6 }}
        />
      );
    }
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
        <View style={{ height: height / 9, flexDirection: "row" }}>
          <View
            style={[
              styles.menu,
              {
                width: width,
                height: width / 5,
                marginTop: 10,
                paddingTop: 8,
                justifyContent: "space-around",
                alignItems: "center"
              }
            ]}
          >
            <TouchableOpacity onPress={() => Actions.bongeszes({ tipus: 1 })}>
              <View style={[styles.menu1]}>
                <Image
                  source={require("../src/menu/hum.png")}
                  style={{ width: width / 8, height: width / 8 }}
                />
                <Text style={{ fontSize: 12 }}>Humán erőforrás</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Actions.bongeszes({ tipus: 2 })}>
              <View style={[styles.menu1]}>
                <Image
                  source={require("../src/menu/targy.png")}
                  style={{ width: width / 8, height: width / 8 }}
                />
                <Text style={{ fontSize: 12 }}>Tárgyi erőforrás</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Actions.bongeszes({ tipus: 3 })}>
              <View style={[styles.menu1]}>
                <Image
                  source={require("../src/menu/szolg.png")}
                  style={{ width: width / 8, height: width / 8 }}
                />
                <Text style={{ fontSize: 12 }}>Szolgáltatások</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: height / 6 }}>{this.tipusok()}</View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            marginLeft: 20,
            marginRight: 20
          }}
        >
          {this.leirasokTipus()}
        </View>

        {this.menu()}
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
    backgroundColor: "white",
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
    color: "white",
    fontSize: 30
    //fontWeight: 'bold',
  }
});

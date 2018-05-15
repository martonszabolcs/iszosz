
import React, { Component } from 'react';
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
  DrawerLayoutAndroid
} from 'react-native';


import {
  Router,
  Scene,
  Actions
} from 'react-native-router-flux';

import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';



import SearchBar from 'react-native-searchbar';
import Swiper from 'react-native-swiper';
import Drawer from 'react-native-drawer-menu';
import SideBar from './sidebar';

    var {height, width} = Dimensions.get('window');

var people = require('./people.json');




const instructions = Platform.select({
});

export default class Find extends Component<{}> {

  constructor(props) {
    console.log(props);
    super(props);
    this.state={
      text:'',
      password:'',
      results:'',
      menuOpen: false,
      modalVisible: false,
      index: 0,
      canavasOpen: this.props.canavasOpen,
      keywords: this.props.keywords,
      dataSource: people
      }
    this.dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});    


    }
handleSwipeIndexChange (index) {
    this.setState({ index });
  };

    componentDidMount() {
      
   
    }




       componentWillMount() {
        console.log(this.state.canavasOpen);
       if (this.state.canavasOpen === 1){
        this.props.handleMenu();
      }
        
    }
    _handleResults(results) {
  //this.setState({ results });
}



handleMenu() {
  const {menuOpen} = this.state
  this.setState({
    menuOpen: !menuOpen
  })
}


toggleModal(visible) {
      this.setState({ modalVisible: visible });
   }


  render() {
    console.log(this.state.results)
    var {height, width} = Dimensions.get('window');
    var iWidth = width/240
    var cornerLeft = width - 10;  // 10 is the width/height of the corner
        var cornerTop = height - 10;


        var navigationView = (
   
               <SideBar/>

    )


    
    return (
      <View style={styles.container}>
      <DrawerLayoutAndroid
      ref="DRAWER"
      drawerWidth={width/2}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}>
      <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
                

               <View style = {styles.modal}>
             

               <View style = {{flex:1, backgroundColor:'white', justifyContent:'space-between', alignItems:'center', marginTop:height/10}}>
                <Text style={{color:'black', fontWeight:'bold', textAlign:'center', fontSize:30}}>Szeretettel üdvözlünk az E-Térkép első felhasználói, tesztelői között!</Text>
                <Image
              source={require('../src/homeman.png')}
              style={{width:width/2, height:width/2}}/>
                <Text style={{color:'black', fontWeight:'bold', fontSize:30}}> </Text>

               </View>



               <View style = {{position:'absolute', bottom:height/20, left:10, right:10, justifyContent:'center', alignItems:'center'}}>
               <TouchableOpacity onPress = {() => {
                  this.toggleModal(!this.state.modalVisible)}}>
            <View style={{height:40, backgroundColor:'#2E348B', width:width-40, justifyContent:'center', alignItems:'center', borderRadius:20}}>
              <Text style={{color:'white'}}>{'Bezárás'}</Text>
            </View>
          </TouchableOpacity>
               </View>
               </View>
            </Modal>

      
      <View style={{height:height/10, flexDirection:'row', marginTop:5, justifyContent:'space-between',alignItems:'center'}}>
      <TouchableOpacity onPress={ () => Actions.home()  }>
          <View style={[styles.menu1, {justifyContent:'center', alignItems:'center',  backgroundColor:'white', height:width/9, width:width/9, borderRadius:30, marginLeft:5, }]}>
           <Image
              source={require('../src/backs.png')}
              style={{width:width/12, height:width/12}}/>
          </View>
          </TouchableOpacity>
            <View style = {{backgroundColor:'white', justifyContent:'center', alignItems:'center', width:width/2}}>
                <Text numberOfLines={2} style={{color:'black', fontSize:18, textAlign:'center'}}>{this.state.keywords}</Text>
               </View>
               <View style={[styles.menu1, {justifyContent:'center', alignItems:'center',  backgroundColor:'white', height:width/9, width:width/9, borderRadius:30, marginLeft:5, }]}/>
     </View>

      <View style={{flex:1, top:-width/8}}>
        <ScrollView  removeClippedSubviews={true} style={{backgroundColor:'transparent', marginTop:height/10}}>
                <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.dataSource)}
            enableEmptySections={true}
            initialListSize={0}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            pageSize={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={1} style={{backgroundColor:'transparent'}}>
              <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() => {Actions.findreszletes({ user: rowData, keywords: this.state.keywords})}}>
              <View style={{backgroundColor:"#D3D3D3", width:width/2-10, height:height/3, borderRadius:10}}>
                <CachedImage
                  resizeMode='cover'
                  source={{uri:rowData.Fénykép}}
                  style={{width:width/2-10, height:height/6, zIndex:100, borderRadius:10}}/>
                <Text numberOfLines={2} style={[styles.cim, {color:'black', marginLeft:5, marginTop:5, marginRight:5, textAlign:'center', fontSize:12}]}>
                  {rowData.Név} - {rowData.Település}
                </Text>
                <Text numberOfLines={4} style={[styles.cim, {color:'black', marginLeft:5, marginTop:5, marginRight:5, textAlign:'center', fontSize:12}]}>
                  {rowData.Szakterület}
                </Text>
              </View>
              </TouchableOpacity>

              </View>
              </View>
              )}>
          </ListView>
              <View style={{height:100}}/>

        </ScrollView> 
      </View>
      
    </DrawerLayoutAndroid>

      <View style={[styles.menu, {width:width, height:width/5, justifyContent:'space-around'}]}>
          <TouchableOpacity onPress={ () => this.refs['DRAWER'].openDrawer()  }> 
          <View style={[styles.menu1]}>
           <Image
              source={require('../src/menu/menu.png')}
              style={{width:width/6, height:width/6}}/>
          </View>
          </TouchableOpacity>
          

        <TouchableOpacity  onPress={()=> Actions.bongeszes({tipus: 1})}>
          <View style={[styles.menu1]}>
            <Image
              source={require('../src/menu/hum.png')}
              style={{width:width/6, height:width/6}}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity  onPress={()=> Actions.bongeszes({tipus: 2})}>
          <View style={[styles.menu1]}>
            <Image
              source={require('../src/menu/targy.png')}
              style={{width:width/6, height:width/6}}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity  onPress={()=> Actions.bongeszes({tipus: 3})}>
          <View style={[styles.menu1]}>
            <Image
              source={require('../src/menu/szolg.png')}
              style={{width:width/6, height:width/6}}/>
          </View>
          </TouchableOpacity>
          
           <TouchableOpacity onPress = {() => {
            this.toggleModal(!this.state.modalVisible)}}>
          <View style={[styles.menu1]}>
            <Image
              source={require('../src/menu/inf.png')}
              style={{width:width/6, height:width/6}}/>
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
    backgroundColor: 'white',
  },
  menu: {
    position:'absolute',
    bottom:0,
    backgroundColor:"transparent",
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  felirat: {
    color:'black',
    textAlign:'center',
    marginTop:1, 
    fontSize:10,
  },
  felirat2: {
    color:'black',
    textAlign:'center', 
    fontSize:10,
  },
  menu1: {
    backgroundColor:'transparent',
    justifyContent:'center',
    alignItems:'center'
  },
  backgroundImage: {
    flex: 1,
    position:'absolute',
    resizeMode: 'cover', // or 'stretch'
  },
 modal: {
      flex:1,
      margin:10,
      borderRadius:10,
      backgroundColor: 'white',
    },
   text: {
      textAlign:'center',
      color: 'white',
      fontSize:40,
       fontWeight: 'bold', 
   },
   list: {
   flexDirection: 'row',
        flexWrap: 'wrap',
    justifyContent:'space-around'
  },
  })
  
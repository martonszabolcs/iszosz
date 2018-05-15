
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
  DrawerLayoutAndroid
} from 'react-native';


import {
  Router,
  Scene,
  Actions
} from 'react-native-router-flux';


import SearchBar from 'react-native-searchbar';
import Swiper from 'react-native-swiper';
import SideBar from './sidebar';
import Search from './search';


    var {height, width} = Dimensions.get('window');

//import {OffCanvas3D} from 'react-native-off-canvas-menu'

const items = [
  1337,
  'janeway',
  {
    lots: 'of',
    different: {
      types: 0,
      data: false,
      that: {
        can: {
          be: {
            quite: {
              complex: {
                hidden: [ 'gold!' ],
              },
            },
          },
        },
      },
    },
  },
  [ 4, 2, 'tree' ],
];


const instructions = Platform.select({
});

export default class Bongeszes extends Component<{}> {

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
      tipus: this.props.tipus,
      draw: 0
      }
    }
handleSwipeIndexChange (index) {
    this.setState({ index });
  };

    componentDidMount() {
   
    }




       componentWillMount() {
        
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

tipusok(){
  console.log(this.state.tipus)
  if (this.state.tipus === 1){
    return(
      <View style = {{height:height/6, backgroundColor:'#189375', justifyContent:'center', alignItems:'center'}}>
                <Text style = {styles.text}>Humán erőforrások</Text>
          </View>
          )
  }
  if (this.state.tipus === 2){
    return(
      <View style = {{height:height/6, backgroundColor:'#964446', justifyContent:'center', alignItems:'center'}}>
                <Text style = {styles.text}>Tárgyi erőforrások</Text>
          </View>
          )
  }
  if (this.state.tipus === 3){
    return(
      <View style = {{height:height/6, backgroundColor:'#D0B555', justifyContent:'center', alignItems:'center'}}>
                <Text style = {styles.text}>Szolgáltatások</Text>
          </View>
          )
  }
}

leirasokTipus(){
  console.log(this.state.tipus)
  if (this.state.tipus === 1){
    return(
          <ScrollView>

           <TouchableOpacity onPress={() => Actions.adatlap({tipus: 1, keywords:"Tréning, tanácsadás"})}>
          <View style={{height: height/11, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20}}>{'Tréning, tanácsadás'}</Text>
            <Image
              source={require('../src/nyil.png')}
              style={{width:width/15, height:width/15}}/>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.adatlap({tipus: 1, keywords:"Projektmenedzsment"})}>
          <View style={{height: height/11, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20}}>{'Projektmenedzsment'}</Text>
            <Image
              source={require('../src/nyil.png')}
              style={{width:width/15, height:width/15}}/>
          </View>
          </TouchableOpacity>


           <TouchableOpacity onPress={() => Actions.adatlap({tipus: 1, keywords:"Táborszervezés"})}>
          <View style={{height: height/11, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20}}>{'Táborszervezés'}</Text>
            <Image
              source={require('../src/nyil.png')}
              style={{width:width/15, height:width/15}}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.adatlap({tipus: 1, keywords:"Rendezvényszervezés"})}>
          <View style={{height: height/11, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20}}>{'Rendezvényszervezés'}</Text>
            <Image
              source={require('../src/nyil.png')}
              style={{width:width/15, height:width/15}}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.adatlap({tipus: 1, keywords:"Nemzetközi"})}>
          <View style={{height: height/11, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20}}>{'Nemzetközi'}</Text>
            <Image
              source={require('../src/nyil.png')}
              style={{width:width/15, height:width/15}}/>
          </View>
          </TouchableOpacity> 

          <TouchableOpacity onPress={() => Actions.adatlap({tipus: 1, keywords:"Egyéb humán erőforrás"})}>
          <View style={{height: height/11, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20}}>{'Egyéb humán erőforrás'}</Text>
            <Image
              source={require('../src/nyil.png')}
              style={{width:width/15, height:width/15}}/>
          </View>
          </TouchableOpacity>

          
         
          </ScrollView>


          )
  }
  if (this.state.tipus === 2){
    return(
          <ScrollView>

      <TouchableOpacity onPress={() => Actions.adatlap({tipus: 2, keywords:"Elektronika"})}>
          <View style={{height: height/11, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20}}>{'Elektronika'}</Text>
            <Image
              source={require('../src/nyil2.png')}
              style={{width:width/15, height:width/15}}/>
          </View>
          </TouchableOpacity>
          

           <TouchableOpacity onPress={() => Actions.adatlap({tipus: 2, keywords:"Bútor, irodai eszköz"})}>
          <View style={{height: height/11, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20}}>{'Bútor, irodai eszköz'}</Text>
            <Image
              source={require('../src/nyil2.png')}
              style={{width:width/15, height:width/15}}/>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.adatlap({tipus: 2, keywords:"Játék, sport és tréning eszköz"})}>
          <View style={{height: height/11, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20}}>{'Játék, sport és tréning eszköz'}</Text>
            <Image
              source={require('../src/nyil2.png')}
              style={{width:width/15, height:width/15}}/>
          </View>
          </TouchableOpacity>


           <TouchableOpacity onPress={() => Actions.adatlap({tipus: 2, keywords:"Egyéb tárgyi erőforrás"})}>
          <View style={{height: height/11, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20}}>{'Egyéb tárgyi erőforrás'}</Text>
            <Image
              source={require('../src/nyil2.png')}
              style={{width:width/15, height:width/15}}/>
          </View>
          </TouchableOpacity>

          </ScrollView>


          )
  }
  if (this.state.tipus === 3){
    return(
      <ScrollView>

      <TouchableOpacity onPress={() => Actions.adatlap({tipus: 3, keywords:"Helyszín, logisztika"})}>
          <View style={{height: height/11, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20}}>{'Helyszín, logisztika'}</Text>
            <Image
              source={require('../src/nyil3.png')}
              style={{width:width/15, height:width/15}}/>
          </View>
          </TouchableOpacity>
          

           <TouchableOpacity onPress={() => Actions.adatlap({tipus: 3, keywords:"Szolgáltatás fiataloknak"})}>
          <View style={{height: height/11, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20}}>{'Szolgáltatás fiataloknak'}</Text>
            <Image
              source={require('../src/nyil3.png')}
              style={{width:width/15, height:width/15}}/>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.adatlap({tipus: 3, keywords:"Szolgáltatás szakembereknek"})}>
          <View style={{height: height/11, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20}}>{'Szolgáltatás szakembereknek'}</Text>
            <Image
              source={require('../src/nyil3.png')}
              style={{width:width/15, height:width/15}}/>
          </View>
          </TouchableOpacity>

          </ScrollView>

          )
  }
}


toggleModal(visible) {
      this.setState({ modalVisible: visible });
   }

   menu(){
    if (this.state.tipus === 1) {
      return(
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
              source={require('../src/menu/icon_human_current.png')}
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
          {this.modal()}
            
          </View>
          </TouchableOpacity>

        </View>
      )
    }
    if (this.state.tipus === 2) {
      return(
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
              source={require('../src/menu/icon_targy_current.png')}
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
            {this.modal()}
          </View>
          </TouchableOpacity>

        </View>
      )
    }

    if (this.state.tipus === 3) {
      return(
      <View style={[styles.menu, {width:width, height:width/5, justifyContent:'space-around'}]}>
        <TouchableOpacity onPress={ () => this.refs['DRAWER'].openDrawer()}>
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
              source={require('../src/menu/icon_szolgaltatas_current.png')}
              style={{width:width/6, height:width/6}}/>
          </View>
          </TouchableOpacity>
          
           <TouchableOpacity onPress = {() => {
            this.toggleModal(!this.state.modalVisible)}}>
          <View style={[styles.menu1]}>
            {this.modal()}
          </View>
          </TouchableOpacity>

        </View>
      )
    }

   }

   modal(){
    if (this.state.modalVisible) {
      return (
          <Image
              source={require('../src/menu/icon_info_current.png')}
              style={{width:width/6, height:width/6}}/>
        )
    } else {
      return (
          <Image
              source={require('../src/menu/inf.png')}
              style={{width:width/6, height:width/6}}/>
        )
    }
    
   }

   imageDrawer(){
    if (this.state.draw === 1) {
      return ( <Image
              source={require('../src/menu/icon_menu_current.png')}
              style={{width:width/6, height:width/6}}/>)
    } 


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

      
      <View style={{height:height/10, flexDirection:'row'}}>
      <TouchableOpacity onPress={ () => Actions.home()  }>
          <View style={[styles.menu1, {justifyContent:'center', alignItems:'center',  backgroundColor:'white', height:width/9, width:width/9, borderRadius:30, marginLeft:5, marginTop:5}]}>
           <Image
              source={require('../src/menu/icon_home_.png')}
              style={{width:width/9, height:width/9}}/>
          </View>
          </TouchableOpacity>
        <Search/>
        </View>
         <View style={{height: height/6}}>
        {this.tipusok()}
        </View>

        



      <View style={{flex:1, flexDirection:'column', marginLeft:20, marginRight:20}}>
           
      {this.leirasokTipus()}

      </View>
      
    </DrawerLayoutAndroid>

    {this.menu()}
      
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
    backgroundColor:"white",
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
    backgroundColor:'white',
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
      //fontWeight: 'bold', 
   }
  })
  
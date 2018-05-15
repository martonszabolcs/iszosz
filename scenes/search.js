import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert } from 'react-native';
 

var data = require('./data.json');
import {
  Router,
  Scene,
  Actions,
  Dimensions
} from 'react-native-router-flux';


export default class Search extends Component {
 
  constructor(props) {
 
    super(props);
 
    this.state = {
 
      isLoading: true,
      text: '',
    
    }
 
    this.arrayholder = data ;
          console.log(this.arrayholder)


  }
 
  componentDidMount() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(this.arrayholder),
        });
      
  }
 
  GetListViewItem (keywords) {
    
   Actions.find({keywords: keywords})
  
  }
  
   SearchFilterFunction(text){
     
     const newData = this.arrayholder.filter(function(item){
         const itemData = item.keywords.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text: text
     })
 }
 
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
 list(){

  if (this.state.text != ''){
    return(

        <ListView
 
          dataSource={this.state.dataSource}
 
          renderSeparator= {this.ListViewItemSeparator}
 
          renderRow={(rowData) => <Text style={styles.rowViewContainer} 
 
          onPress={this.GetListViewItem.bind(this, rowData.keywords)} >{rowData.keywords}</Text>}
 
          enableEmptySections={true}
 
          style={{marginTop: 15, backgroundColor:'white', borderRadius:10}}
 
        />
        )
 } else {
  return( <View/>)
 }
 }
 
  render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
 
    return (
 
      <View style={styles.MainContainer}>
 
      <TextInput 
       style={[styles.TextInputStyleClass, { width: 300-20}]}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Keresés"
       alignSelf= 'center'
        />
 
        {this.list()}
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
 
 MainContainer :{
 
  justifyContent: 'flex-start',
  flex:1,
  margin: 7,
 
  },
 
 rowViewContainer: {
   fontSize: 17,
   padding: 10
  },
 
  TextInputStyleClass:{
        
   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: 'gray',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
        
   }
 
});
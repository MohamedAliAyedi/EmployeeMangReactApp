import React from 'react';
import {FlatList, TextInput, Image, Button, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { DataTable } from 'react-native-paper';

import styles from "../style";

export default class Update extends React.Component {
  
  constructor(props) {
    super(props); 
    this.state = { isLoading: true};
  }  
  state = {
    username: '', 
    job_id: '',
    department_id: '',
    work_email: '',
    work_phone: '',
    address_id: '',
    place_of_birth: '',
    gender: '',
    birthday: '',
    address_home_id: '',
    certificate: ''

 }   
 setusername = (text) => {
    this.setState({ username: text })
 }   
setjob_id = (text) => {
    this.setState({ job_id: text })
 }   
 setdepartment_id = (text) => {
    this.setState({ department_id: text })
 }   
 setwork_email = (text) => {
    this.setState({ work_email: text })
 }   
 setwork_phone = (text) => {
    this.setState({ work_phone: text })
 }   
 setaddress_id = (text) => {
    this.setState({ address_id: text })
 }   
 setplace_of_birth = (text) => {
    this.setState({ place_of_birth: text })
 }   
 setgender = (text) => {
    this.setState({ gender: text })
 }   
 setbirthday = (text) => {
    this.setState({ birthday: text })
 }   
 setaddress_home_id = (text) => {
    this.setState({ address_home_id: text })
 }   
 setcertificate = (text) => {
    this.setState({ certificate: text })
 }   



 Updatenew= () =>{
   const password = this.props.navigation.getParam( 'password', 'No password provided' ) 
   const uid = this.props.navigation.getParam( 'uid', 'No uid provided' )
   const eid = this.props.navigation.getParam( 'eid', 'No eid provided' )
   console.log(password);
   console.log(uid);
   if (uid && password) { 
     //let sourceimage = this.state.myimage.replace('data:image/jpeg;base64,',''); 
     //console.log(sourceimage);
      fetch("http://192.168.43.19:5000/api/update/"+eid, {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE'
         },
         body: JSON.stringify({
           password: "password", 
           uid: 2,
           name:this.state.username,
           //image:sourceimage,
         })  
       })  
       .then(response => response.json())
       .then(responseJson => { this.setState({  dataSource: responseJson, }, function() {});})
       .catch(error => {
           console.error(error);
         }); 
         
         this.props.navigation.navigate( 'Profile', { password: password, uid:2} );

   }      
   };
       
   openImagePickerAsync = async () => {
         let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

         if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
         }   

         let pickerResult = await ImagePicker.launchImageLibraryAsync(
      {   
         base64: true,
         allowsEditing: false,
         aspect: [4,3]
      });   
      console.log(pickerResult)
      if (pickerResult.cancelled === true) {
         return;
         }

      // this.setSelectedImage({ localUri: pickerResult.uri });   
         this.setState(
            {
            myimage:pickerResult.uri ,   
            });
}            
  componentDidMount(){
    const password = this.props.navigation.getParam( 'password', 'No password provided' ) 
    const uid = this.props.navigation.getParam( 'uid', 'No uid provided' )
    const eid = this.props.navigation.getParam( 'eid', 'No eid provided' )
    console.log(password);
    console.log(uid);
    if (uid && password) { 
      return fetch("http://192.168.43.19:5000/api/getEmployee/"+eid, {
          method: "POST",
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE'
  
          },  
          body: JSON.stringify({
            password: password, 
            uid: uid,
            oid: eid,
          })  
        })  
        .then(response => response.json())
        .then(responseJson => { this.setState( { dataSource: responseJson,}, function() {} ); })
          .catch(error => {
            console.error(error); 
          });  
        }  
    }      
  
  
  render() {

    return (
    
    
        <FlatList
        data={this.state.dataSource}
        renderItem ={   
          ({item}) => ( 
              <View style={styles.mycontainer}>
              <Image 
               style={{width: 150, height: 150, borderWidth: 1,borderRadius: 60 }}
               source={{uri: `data:image/jpeg;base64,${item.image_medium}`}}
               />

               <Button
               title="Pick Image"
               onPress={() =>this.openImagePickerAsync()}
               />
              <Text style={styles.mytext} > Full Name </Text> 
              <TextInput placeholder="Username" defaultValue={item.display_name} placeholderColor="#c4c3cb" style={styles.inputText}  onChangeText={this.setusername}/>
              
              <View style={{flex: 1, flexDirection: 'row'}}>
               <View>
               <Text style={styles.mytext} > Post Job: </Text>
               <TextInput placeholder="Username" defaultValue={item.job_id[1]} placeholderColor="#c4c3cb" style={styles.inputText}  onChangeText={this.setjob_id}/>
               </View>
               <View style={styles.box}>
                  <Text style={styles.mytext} > Depatement: </Text>
                  <TextInput placeholder="Username" defaultValue={item.department_id[1]} placeholderColor="#c4c3cb" style={styles.inputText}  onChangeText={this.setdepartment_id}/>
               </View>                
              </View> 
              <View style={{flex: 1, flexDirection: 'row'}}>
                  <View>
                     <Text style={styles.mytext} > Email Work: </Text>
                     <TextInput placeholder="Username" defaultValue={item.work_email} placeholderColor="#c4c3cb" style={styles.inputText}  onChangeText={this.setwork_email}/>
                  </View>   
                  <View style={styles.box}>
                     <Text style={styles.mytext} > Work Phone: </Text>
                     <TextInput placeholder="Username" defaultValue={item.work_phone} placeholderColor="#c4c3cb" style={styles.inputText}  onChangeText={this.setwork_phone}/>
                  </View>      
              </View>    
              <View style={{flex: 1, flexDirection: 'row'}}>
               <View >
                  <Text style={styles.mytext} > Adrees Society: </Text>
                  <TextInput placeholder="Username" defaultValue={item.address_id[1]} placeholderColor="#c4c3cb" style={styles.inputText}  onChangeText={this.setaddress_id}/>
               </View>   
               <View style={styles.box}>
                  <Text style={styles.mytext} > Country from : </Text>
                  <TextInput placeholder="Username" defaultValue={item.place_of_birth} placeholderColor="#c4c3cb" style={styles.inputText}  onChangeText={this.setplace_of_birth}/>
               </View>   

              </View> 
              <View style={{flex: 1, flexDirection: 'row'}}>
                 <View>
                  <Text style={styles.mytext} > Gender: </Text>
                  <TextInput placeholder="Username" defaultValue={item.gender} placeholderColor="#c4c3cb" style={styles.inputText}  onChangeText={this.setgender}/>
                 </View> 
                 <View style={styles.box}>
                    <Text style={styles.mytext} > Birthday:</Text>
                    <TextInput placeholder="Username" defaultValue={item.birthday} placeholderColor="#c4c3cb" style={styles.inputText}  onChangeText={this.setbirthday}/>
                 </View>   
              </View>   


              <View style={{flex: 1, flexDirection: 'row'}}>
                 <View>
                     <Text style={styles.mytext} > Home Adress:</Text>
                     <TextInput placeholder="Username" defaultValue={item.address_home_id[1]} placeholderColor="#c4c3cb" style={styles.inputText}  onChangeText={this.setaddress_home_id}/>
                 </View>    
                 <View style={styles.box}>
                     <Text style={styles.mytext} > Degreed:</Text>
                     <TextInput placeholder="Username" defaultValue={item.certificate} placeholderColor="#c4c3cb" style={styles.inputText}  onChangeText={this.setcertificate}/>
                 </View>    
              </View>   

              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.Updatenew()}
                title="Update"
              />  

              </View>

          )}    
        keyExtractor={({ id }, index) => id}  
        />
    
        );







          }

}        
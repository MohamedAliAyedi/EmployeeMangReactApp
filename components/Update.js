import React from 'react';
import {FlatList, TextInput, Image, Button, StyleSheet, Text, View } from 'react-native';

import { DataTable } from 'react-native-paper';

import styles from "../style";

export default class Update extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  /****** States  ******/
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


  /* End States */
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
              <View>
              <Image 
               style={{width: 80, height: 80, borderWidth: 1,borderRadius: 60 }}
               source={{uri: `data:image/jpeg;base64,${item.image_medium}`}}
               />
              <Text> Full Name </Text>
              <TextInput placeholder="Username" defaultValue={item.display_name} placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setusername}/>
              <Text> Post Job: </Text>
              <TextInput placeholder="Username" defaultValue={item.job_id[1]} placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setjob_id}/>
              <Text> Depatement: </Text>
              <TextInput placeholder="Username" defaultValue={item.department_id[1]} placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setdepartment_id}/>
              <Text> Email Work: </Text>
              <TextInput placeholder="Username" defaultValue={item.work_email} placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setwork_email}/>
              <Text> Work Phone: </Text>
              <TextInput placeholder="Username" defaultValue={item.work_phone} placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setwork_phone}/>
              <Text> Adrees Society: </Text>
              <TextInput placeholder="Username" defaultValue={item.address_id[1]} placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setaddress_id}/>
              <Text> Country from : </Text>
              <TextInput placeholder="Username" defaultValue={item.place_of_birth} placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setplace_of_birth}/>
              <Text> Gender: </Text>
              <TextInput placeholder="Username" defaultValue={item.gender} placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setgender}/>
              <Text> Birthday:</Text>
              <TextInput placeholder="Username" defaultValue={item.birthday} placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setbirthday}/>
              <Text> Home Adress:</Text>
              <TextInput placeholder="Username" defaultValue={item.address_home_id[1]} placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setaddress_home_id}/>
              <Text> Degreed:</Text>
              <TextInput placeholder="Username" defaultValue={item.certificate} placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setcertificate}/>

              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.newupdate()}
                title="Update"
              />

              </View>

          )}
        keyExtractor={({ id }, index) => id}
        />
    
        );







          }

}


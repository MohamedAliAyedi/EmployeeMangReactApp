import React from 'react';
import {FlatList, Image, Button, StyleSheet, Text, View } from 'react-native';

import { DataTable } from 'react-native-paper';


export default class Detail extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount(){
    const password = this.props.navigation.getParam( 'password', 'No password provided' )
    const uid = this.props.navigation.getParam( 'uid', 'No uid provided' )
    const eid = this.props.navigation.getParam( 'eid', 'No eid provided' )
    console.log(password);
    console.log(uid);
    if (uid && password) { 
       fetch("http://192.168.56.1:5000/api/getEmployee/"+eid, {
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
        .then(responseJson => {
          this.setState(
            {
              dataSource: responseJson,
            },
            function() {}
            );
          })
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
               <Text>Personal info</Text>
              <Text> Name:  {item.display_name}</Text>
              <Text> Work Location: {item.work_location}</Text>
              <Text> Job: {item.job_id[1]}</Text>
              <Text> Depatement: {item.department_id[1]}</Text>
              <Text> Email Work: {item.work_email}</Text>
              <Text> Work Phone: {item.work_phone}</Text>
              <Text> Adrees Society: {item.address_id[1]}</Text>
              <Text> Country from : {item.place_of_birth}</Text>
              <Text> Gender: {item.gender}</Text>
              <Text> Birthday: {item.birthday}</Text>
              <Text> Home Adress: {item.address_home_id[1]}</Text>
              <Text> Degreed: {item.certificate}</Text>


              </View>

          )}
        keyExtractor={({ id }, index) => id}
        />
    
        );







          }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

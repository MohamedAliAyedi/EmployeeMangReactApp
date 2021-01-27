import React from 'react';
import {FlatList, Image, Button, StyleSheet, Text, View } from 'react-native';
import styles from '../style.js';
import { DataTable } from 'react-native-paper';

export default class Detail extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  delete =(id) =>{
    const password = this.props.navigation.getParam( 'password', 'No password provided' )
    const uid = this.props.navigation.getParam( 'uid', 'No uid provided' )
    //window.confirm("Wanna Real Delete Him");

    /*
      Function Deleteeeeeeeeeeeeeeeeeeee with APIIIIIIIIIIIIIIIIIIIII
      
      */
     fetch("http://192.168.43.19:5000//api/delete/"+id, {
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
            oid: id,
          })
        })
        .then(response => response.json())
        .then(responseJson => { alert(responseJson) })
          .catch(error => {  console.error(error);
          });
          this.props.navigation.navigate( 'Profile', { password: password, uid:2} );

        }
  componentDidMount(){
    const password = this.props.navigation.getParam( 'password', 'No password provided' )
    const uid = this.props.navigation.getParam( 'uid', 'No uid provided' )
    const eid = this.props.navigation.getParam( 'eid', 'No eid provided' )
    console.log(password);
    console.log(uid);
    if (uid && password) { 
       fetch("http://192.168.43.19:5000/api/getEmployee/"+eid, {
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
              <View style={{justifyContent: 'center',alignItems: 'center',marginTop:20}}>
              <Image 
               style={{width: 150, height: 150, borderWidth: 1,borderRadius: 60 }}
               source={{uri: `data:image/jpeg;base64,${item.image_medium}`}}
               />
              <Text style={{fontSize: 20,fontWeight: "bold"}} >
                  {item.display_name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                  <Button
                    style={{ backgroundColor: '#999999',width:100}}
                    onPress={() => this.delete(item.id)}
                    title="Delete"
                    />
                  <Button
                      style={{width:100,marginLeft:20}}
                      onPress={() => this.props.navigation.navigate( 'Update', {
                        password: "password",
                        uid:2,
                        eid: item.id
                    } )}
                      style={{ backgroundColor: '#ffffff'}}
                      title="Update"
                    />
              </View>
             
              <Text style={styles.mytext}> Work Location: {item.work_location}</Text>
              <Text style={styles.mytext}> Job: {item.job_id[1]}</Text>
              <Text style={styles.mytext}> Depatement: {item.department_id[1]}</Text>
              <Text style={styles.mytext}> Email Work: {item.work_email}</Text>
              <Text style={styles.mytext}> Work Phone: {item.work_phone}</Text>
              <Text style={styles.mytext}> Adrees Society: {item.address_id[1]}</Text>
              <Text style={styles.mytext}> Country from : {item.place_of_birth}</Text>
              <Text style={styles.mytext}> Gender: {item.gender}</Text>
              <Text style={styles.mytext}> Birthday: {item.birthday}</Text>
              <Text style={styles.mytext}> Home Adress: {item.address_home_id[1]}</Text>
              <Text style={styles.mytext}> Degreed: {item.certificate}</Text>


              </View>

          )}
        keyExtractor={({ id }, index) => id}
        />
    
        );







          }

}



const intstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import {TextInput,FlatList, Image, Button, StyleSheet, Text, View } from 'react-native';

import { DataTable } from 'react-native-paper';


export default class Profile extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  delete =(id) =>{
    const password = this.props.navigation.getParam( 'password', 'No password provided' )
    const uid = this.props.navigation.getParam( 'uid', 'No uid provided' )
      alert ("delete => "+id);
      /*
      Function Deleteeeeeeeeeeeeeeeeeeee with APIIIIIIIIIIIIIIIIIIIII
      
      */
     fetch("http://127.0.0.1:5000//api/delete/"+id, {
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
          .catch(error => {
            console.error(error);
          });
    }
  componentDidMount(){
    const password = this.props.navigation.getParam( 'password', 'password' )
    const uid = this.props.navigation.getParam( 'uid', '2' )
    console.log(password);
    console.log(uid);
    if (uid && password) { 
       fetch("http://192.168.56.1:5000/api/employees", {
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
      <View>
          <Button
                //buttonStyle={styles.loginButton}
                onPress={() => this.props.navigation.navigate( 'Create', {
                  password: "password",
                  uid:2,
              } )}
                style={{ backgroundColor: '#ffffff'}}
                title="Create"
              />
    <Text>Employees</Text>
    <TextInput placeholder="Search" 
                placeholderColor="#c4c3cb" 
          //      style={styles.loginFormTextInput}  
          //      onChangeText={this.setusername}
        />
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>ID</DataTable.Title>
        <DataTable.Title>Image</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Action</DataTable.Title>
      </DataTable.Header>

      <FlatList
      data={this.state.dataSource}
      renderItem ={   
        ({item}) => ( 

        <DataTable.Row>
          <DataTable.Cell>{item.id}</DataTable.Cell>
          <DataTable.Cell>
            <Image 
             style={{width: 80, height: 80, borderWidth: 1,borderRadius: 60 }}
             source={{uri: `data:image/jpeg;base64,${item.image_medium}`}}
             />
          </DataTable.Cell>
          <DataTable.Cell>{item.display_name}</DataTable.Cell>
          <DataTable.Cell>
          <Button
                //buttonStyle={styles.loginButton}
                onPress={() => this.props.navigation.navigate( 'Update', {
                  password: "password",
                  uid:2,
                  eid: item.id
              } )}
                style={{ backgroundColor: '#ffffff'}}
                title="Update"
              />
          <Button
                //buttonStyle={styles.loginButton}
                onPress={() => this.props.navigation.navigate( 'Detail', {
                  password: "password",
                  uid:2,
                  eid: item.id
              } )}
                style={{marginLeft: 40}}
                title="Detail"
              />
           <Button
                style={{ backgroundColor: '#ff4545'}}
                onPress={() => this.delete(item.id)}
                title="Delete"
              />

          </DataTable.Cell>

        </DataTable.Row>
      
        )}
      keyExtractor={({ id }, index) => id}
      />


      <DataTable.Pagination
        page={1}
        numberOfPages={3}
        onPageChange={(page) => { console.log(page); }}
        label="1-2 of 6"
      />
    </DataTable>
      </View>
   
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

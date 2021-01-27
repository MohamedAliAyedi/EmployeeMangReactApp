import React,{useState} from 'react';
import {TextInput,FlatList, Image, Button, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import styles from "../style";
import { DataTable } from 'react-native-paper';


export default class Profile extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  componentDidMount(){
      this.onLoad();
    } 
    
    onLoad = () => {
      const password = this.props.navigation.getParam( 'password', 'password' )
      const uid = this.props.navigation.getParam( 'uid', '2' )

      if (uid && password) { 
        fetch("http://192.168.43.19:5000/api/employees", {
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
               resulta: responseJson,
             },
             function() {}
             );
           })
           .catch(error => {
             console.error(error);
           });
     }  
    }
     filter= async (word)=>{
      if(word != ""){
        //for (i = 0; i < this.state.dataSource.length; i++) {
        let obj = this.state.dataSource.find(o => o.display_name.toLowerCase().includes(word));
        //this.state.dataSource = obj
        //}
        this.setState(
          {
            resulta: [obj],
          });
        }
      else{
        this.setState(
          {
            resulta : this.state.dataSource
          }
          );
        }
      }

  render() {
    return (
      <View style={{backgroundColor:"#f2f2f2"}}>
        <Text style={{color:"black",marginTop:10,marginLeft:8,marginBottom:15,fontSize:30}}>Employees</Text>
        <TouchableOpacity 
            style={styles.myBtn}
            onPress={() => this.props.navigation.navigate( 'Create', {
            password: "password",
            uid:2,
        } )}
            
        >
        
          <Text style={{color:"white"}}>Create</Text>
        </TouchableOpacity>

           <TextInput placeholder="Search" 
                placeholderColor="white"
                style={styles.myinputText} 
                onChangeText={(text) =>this.filter(text)}
            />
      
    <DataTable style={{backgroundColor:"#f2f2f2"}} >
      <DataTable.Header >
        <DataTable.Title>ID</DataTable.Title>
        <DataTable.Title>Image</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
      </DataTable.Header>

      <FlatList
      data={this.state.resulta}
      renderItem ={   
        ({item}) => ( 

        <DataTable.Row
        onPress={() => this.props.navigation.navigate( 'Detail', {
          password: "password",
          uid:2,
          eid: item.id
        } )}        
        >
          <DataTable.Cell>{item.id}</DataTable.Cell>
          <DataTable.Cell style={{height:150,padding:0}}>
            <Image 
             style={{width: 80, height: 80, borderWidth: 1,borderRadius: 60,marginTop:0 }}
             source={{uri: `data:image/jpeg;base64,${item.image_medium}`}}
             />
          </DataTable.Cell>
          <DataTable.Cell>{item.display_name}</DataTable.Cell>


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
  
  /*
<Button
     style={{ backgroundColor: '#ff4545'}}
     onPress={() => this.delete(item.id)}
     title="Delete"
     />
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
     */
     
     
     
     
     
     
}




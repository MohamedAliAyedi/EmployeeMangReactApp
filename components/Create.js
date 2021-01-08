import React from 'react';
import {FlatList, TextInput, Image, Button, StyleSheet, Text, View ,Picker,TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { DataTable } from 'react-native-paper';

import styles from "../style";

export default class Create extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }



   




  componentDidMount(){
   const password = this.props.navigation.getParam( 'password', 'No password provided' )
   const uid = this.props.navigation.getParam( 'uid', 'No uid provided' )
      fetch("http://127.0.0.1:5000/api/getDepartement", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE'
      },
      body: JSON.stringify({
      password: password,
      uid: uid,
      })
      })
      .then(response => response.json())
      .then(responseJson => { this.setState({  DepartementList: responseJson, }, function() {});})
      .catch(error => {console.error(error);});
      fetch("http://127.0.0.1:5000/api/getJobs", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE'
      },
      body: JSON.stringify({
      password: password,
      uid: uid,
      })
      })
      .then(response => response.json())
      .then(responseJson => { this.setState({  JobsList: responseJson, }, function() {});})
      .catch(error => {
      console.error(error);
      });
      fetch("http://127.0.0.1:5000/api/getCountry", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE'
      },
      body: JSON.stringify({
      password: password,
      uid: uid,
      })
      })
      .then(response => response.json())
      .then(responseJson => { this.setState({  CountryList: responseJson, }, function() {});})
      .catch(error => {
      console.error(error);
      });
}
/********************************************** */
  Createnew= () =>{
    const password = this.props.navigation.getParam( 'password', 'No password provided' )
    const uid = this.props.navigation.getParam( 'uid', 'No uid provided' )
    console.log(password);
    console.log(uid);
    if (uid && password) { 
       fetch("http://192.168.43.19:5000/api/create", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE'
          },
          body: JSON.stringify({
            password: password,
            uid: uid,
            name:this.state.username,
          })
        })
        .then(response => response.json())
        .then(responseJson => { this.setState({  dataSource: responseJson, }, function() {});})
        .catch(error => {
            console.error(error);
          });

    }
    };
    
    
    //[selectedImage, setSelectedImage] = React.useState();
    
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
   //console.log(pickerResult)
   if (pickerResult.cancelled === true) {
      return;
      }

      this.setSelectedImage({ localUri: pickerResult.uri });
}

  /****** States  ******/
  state = {
    username: '',
    selectedImage: {cancelled: false,uri: "data:image/jpeg;base64,/9j/4AAQ",width: 579,height: 624},
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
 setSelectedImage = (text) => {
    this.setState({ selectedImage: text})
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

  
  
  render() {
    console.log(this.state.DepartementList)
    console.log(this.state.selectedImage)
    return (

      <View>
          <Image 
               name="myimg"
               style={{width: 80, height: 80, borderWidth: 1,borderRadius: 60 }}
               //source={{ uri: this.selectedImage  }}
               />

               <Button
               title="Pick Image"
               onPress={() =>this.openImagePickerAsync()}
               />
              <Text> Full Name </Text>
              <TextInput placeholder="Username"  placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setusername}/>

              <Text> Post Job: </Text>
              <Picker  
              style={styles.loginFormTextInput}
              onValueChange={(itemvalue,itemindex)=> this.job_id(itemvalue)} >
             <Picker.Item label="Default" value="31" />
             <FlatList
                  data={this.state.JobsList}
                  renderItem ={   
                     ({item}) => ( 
                        <Picker.Item value={item.id} label={item.name} />
                        )
                     }
                     keyExtractor={({ id }, index) => id} 
             />
              </Picker>

              <Text> Depatement: </Text>
              <Picker  
              style={styles.loginFormTextInput}
              onValueChange={(itemvalue,itemindex)=> this.setdepartment_id(itemvalue)} >
             <Picker.Item label="Default" value="31" />
             <FlatList
                  data={this.state.DepartementList}
                  renderItem ={   
                     ({item}) => ( 
                        <Picker.Item value={item.id} label={item.display_name} />
                        )
                     }
                     keyExtractor={({ id }, index) => id} 
             />
              </Picker>

              <Text> Email Work: </Text>
              <TextInput placeholder="Email Work"  placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setwork_email}/>
              <Text> Work Phone: </Text>
              <TextInput placeholder="Work Phone"  placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setwork_phone}/>
              <Text> Adrees Society: </Text>
              <TextInput placeholder="Adress Company"  placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setaddress_id}/>
              <Text> Country from : </Text>
              <Picker  
              style={styles.loginFormTextInput}
              onValueChange={(itemvalue,itemindex)=> this.setplace_of_birth(itemvalue)} >
             <Picker.Item label="Default" value="31" />
             <FlatList
                  data={this.state.CountryList}
                  renderItem ={   
                     ({item}) => ( 
                        <Picker.Item value={item.name} label={item.name} />
                        )
                     }
                     keyExtractor={({ id }, index) => id} 
             />
              </Picker>
              <Text> Gender: </Text>
              <TextInput placeholder="Gender" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setgender}/>
              <Text> Birthday:</Text>
              <TextInput placeholder="Birthday" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setbirthday}/>
              <Text> Home Adress:</Text>
              <TextInput placeholder="Home Adress" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setaddress_home_id}/>
              <Text> Degreed:</Text>
              <TextInput placeholder="Degreed" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setcertificate}/>

              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.Createnew()}
                title="Create"
              />

  </View>

    
        );

          }

}


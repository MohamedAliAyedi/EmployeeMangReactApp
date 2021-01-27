import React from 'react';
import { DataTable } from 'react-native-paper';
import {Picker,FlatList, TextInput, Image, Button, StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from "../style";

export default class Create extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  componentDidMount(){
   this.onLoad();
 } 


  onLoad= () =>{
   const password = this.props.navigation.getParam( 'password', 'No password provided' )
   const uid = this.props.navigation.getParam( 'uid', 'No uid provided' )
      fetch("http://192.168.43.19:5000/api/getDepartement", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE'
      },
      body: JSON.stringify({
      password: password,
      uid: uid,
      })
      })
      .then(response => response.json())
      .then(responseJson => { this.setState({  DepartementList: responseJson, }, function() {});})
      .catch(error => {console.error(error);});
      fetch("http://192.168.43.19:5000/api/getJobs", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE'
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
      fetch("http://192.168.43.19:5000/api/getCountry", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE'
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
               setTimeout(() => {
                  this.setState({
                     isLoading: false,
                  });
               }, 2500);
}
/********************************************** */
  Createnew= () =>{
    const password = this.props.navigation.getParam( 'password', 'No password provided' )
    const uid = this.props.navigation.getParam( 'uid', 'No uid provided' )
    console.log(password);
    console.log(uid);
    if (uid && password) { 
      let sourceimage = this.state.myimage.replace('data:image/jpeg;base64,','');
      console.log(sourceimage);
       fetch("http://192.168.43.19:5000/api/create", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE'
          },
          body: JSON.stringify({
            password: "password",
            uid: 2,

            name:this.state.username,
            image:sourceimage,
            departement:this.state.department_id,
            job_postion:this.state.job_id,
            email_work:this.state.work_email,
            mobile_work:this.state.work_phone,
            gender: this.state.gender,
            //address_id: this.state.address_id,
            
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
   console.log(pickerResult)
   if (pickerResult.cancelled === true) {
      return;
      }

      this.setSelectedImage({ localUri: pickerResult.uri });
      this.setState(
         {
           myimage:pickerResult.uri ,
         });
}
  /****** States  ******/
  state = {
    username: '',
    selectedImage:'',
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
   console.log(this.state.username),
   console.log(this.state.department_id)
   console.log(this.state.job_id)
   console.log(this.state.work_email)
   console.log(this.state.work_phone)
    //console.log(this.state.selectedImage)
    return (
                <View style={styles.mycontainer}>
            <Image 
               name="myimg"
               style={{width: 150, height: 150, borderWidth: 1,borderRadius: 80,marginTop:5 }}
               source={{ uri: this.state.myimage }}
               />

               <Button
               title="Pick Image"
               onPress={() =>this.openImagePickerAsync()}
               />
              <Text style={{marginTop:15,fontWeight: 'bold'}}> Full Name </Text>
              <TextInput placeholder="Username"  placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setusername}/>

              <Text style={{marginTop:15,fontWeight: 'bold'}}> Post Job: </Text>
         
              <Picker  
              style={styles.loginFormTextInput}
              
              onValueChange={(itemvalue,itemindex)=> this.setjob_id(itemvalue)} >
                   <Picker.Item value="0" label="Select Post Job" />
                   <Picker.Item value="1" label="Chief Executive Officer " />
                   <Picker.Item value="2" label="Chief Technical Officer " />
                   <Picker.Item value="3" label="Consultant" />
                   <Picker.Item value="4" label="Experienced Developer" />
                   <Picker.Item value="5" label="Human Resources Manager" />
                   <Picker.Item value="6" label="Marketing and Community Manager" />
                   <Picker.Item value="7" label="Trainer" />
                     </Picker>             
              <Text style={styles.mytext}> Depatement: </Text>
              <Picker  
              style={styles.loginFormTextInput}
              onValueChange={(itemvalue,itemindex)=> this.setdepartment_id(itemvalue)} >
                   <Picker.Item value="0" label="Select Departement" />
                   <Picker.Item value="1" label="Administration" />
                   <Picker.Item value="3" label="Management " />
                   <Picker.Item value="5" label="Professional Services" />
                   <Picker.Item value="4" label="Research & Development" />
                   <Picker.Item value="2" label="Sales" />
                     </Picker>
               <View style={{flex: 1, flexDirection: 'row',marginTop:20}}>
                  <View>
                     <Text style={styles.mytext}> Email Work: </Text>
                     <TextInput placeholder="Email Work"  placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setwork_email}/>
                  </View>
                  <View style={styles.box}>
                     <Text style={styles.mytext}> Work Phone: </Text>
                     <TextInput placeholder="Work Phone"  placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setwork_phone}/>
                  </View>
               </View>


               <View style={{flex: 1, flexDirection: 'row',marginTop:20}}>
                  <View>
                     <Text style={styles.mytext}> Place Work:</Text>
                     <TextInput placeholder="adress work" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.address_id}/>                   
                 </View>
                  <View style={styles.box}>
                     <Text style={styles.mytext}> Country from : </Text>
                     <TextInput placeholder="Country"  placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setplace_of_birth}/>
                  </View>
               </View>


               <View style={{flex: 1, flexDirection: 'row',marginTop:20}}>
                  <View>
                      <Text style={styles.mytext}> Gender: </Text>
                      <Picker  
                          style={styles.loginFormTextInput}
                            onValueChange={(itemvalue,itemindex)=> this.setgender(itemvalue)} >
                              <Picker.Item value="male" label="male" />
                              <Picker.Item value="female" label="female" />
                        </Picker>
                 </View>
                  <View style={styles.box}>
                       <Text style={styles.mytext}> Home Adress:</Text>
                       <TextInput placeholder="Home Adress" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}  onChangeText={this.setaddress_home_id}/>
                  </View>
               </View>




               <View style={{flex: 1, flexDirection: 'row',marginTop:20}}>
                  <View>
                   <Text>Date Birthday</Text>
                   <input type="date" />
                 </View>
                  <View style={styles.box}>
                     <Button
                        buttonStyle={styles.loginButton}
                        onPress={() => this.Createnew()}
                        title="Create"
                     />
                  </View>
               </View>
              

         </View>


    
        );

          }

}


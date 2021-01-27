import React, { useState }  from 'react';
import {Button, Text, View, TextInput,TouchableOpacity, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Picker} from 'react-native';
import styles from "../style";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';




  export default class Login extends React.Component{
     
      state = {
          username: '',
          password: '',
          myerror:'',
       }
       setusername = (text) => {
          this.setState({ username: text })
       }
       setmyerror = (text) => {
          this.setState({ myerror: text })
       }

       setpassword = (text) => {
          this.setState({ password: text })
       }
    render(){ 
        return (
        
          <View style={styles.container}>
          <Text style={styles.logo}>Admin Panel</Text>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Email..." 
              placeholderTextColor="#003f5c"
              onChangeText={this.setusername}
              />
          </View>
          <View style={styles.inputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              placeholder="Password..." 
              placeholderTextColor="#003f5c"
              onChangeText={this.setpassword}
              />
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <Text style={{color:"red"}}>{this.state.myerror}</Text>
          <TouchableOpacity 
          style={styles.loginBtn}
          onPress={() => this.singin(this.state.username,this.state.password)}          
          >
            <Text
             style={styles.loginText}
            >LOGIN</Text>
            
          </TouchableOpacity>

  
    
        </View>
      
    );
     }

     singin= (username,password)=> {
        console.log(username);
        console.log(password);
        if (username && password) { 
            try {
              fetch("http://192.168.43.19:5000/auth", {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'POST,GET,OPTIONS, PUT, DELETE'
        
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                })
              })
              .then((response) => response.json())
              .then((responseData) =>  console.log(responseData))
              .then( () => this.props.navigation.navigate( 'Profile', {
                  password: password,
                  uid:2
                } ) );
            } catch (error) {
            }
        }
        setTimeout( () => {
          this.setmyerror("Error Email or Password")
        },2000);
        
        }
      



    }
 
    //export default Login;

 
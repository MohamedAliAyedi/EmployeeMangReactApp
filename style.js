const React = require("react-native");

const { StyleSheet } = React;

export default {
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box:{
    marginLeft:20
  },
  mycontainer: {
    flex: 1,
    backgroundColor: '#fffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"orange",
    marginBottom:40
  },
  mytext:{
    fontWeight: 'bold'
  },
  inputView:{
    width:"80%",
    backgroundColor:"white",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    color:"black"
  },
  inputText:{
    height:50,
    color:"black"
  },
  myinputText:{
    paddingLeft:20,
    margin:15,
    height:50,
    color:"black",
    backgroundColor:"white"
  },
  forgot:{
    color:"black",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"orange",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  myBtn:{
    width:"20%",
    backgroundColor:"orange",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginLeft:20,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
};

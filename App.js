import React, { useState }  from 'react';

import Profile from './components/Profile';
import Login from './components/Login';
import Detail from './components/Detail';
import Update from './components/Update';
import Create from './components/Create';
//import Upload from './components/Upload';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';


const RootStack = createStackNavigator( {

  //UploadImage:Upload,
  Login: Login,
  Profile: Profile,
  Detail: Detail,
  Update: Update,
  Create: Create,
} )

const Container = createAppContainer(RootStack);


  const App=()=>
  {

     return (
      <Container/>
        );
    }
    export default App;

 
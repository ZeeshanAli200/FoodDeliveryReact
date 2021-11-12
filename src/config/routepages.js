import React, { useContext, useEffect } from "react";
import { auth, onAuthStateChanged } from "./firebase";
import Users from "../screens/usersList/users";
import Login from "../screens/usersList/login";
import {
  doc, createUserWithEmailAndPassword, db, collection, addDoc, getDocs, getDoc,
  setDoc
} from './firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';

import Nav from "../components/nav-bar";
import { GlobalContext } from '../screens/context/context'
import RestaurantHomeScreen from "../screens/foodapp/restaurant/HomePage";
import UserHomeScreen from "../screens/foodapp/customer/userHome";
import Orders from "../screens/foodapp/customer/orders";

import Dishes from "../screens/foodapp/customer/dishes";
import OrderStatus from "../screens/foodapp/customer/orderStatus";
function Routes() {
  // let history = useHistory()
  const { state, dispatch } = useContext(GlobalContext);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        fetchCurrUser(user.uid)

      }
      else {
        fetchCurrUser('')
      }
    })
  }, []);
  const fetchCurrUser = async (uid) => {
    if (uid != '') {
      let docRef = doc(db, 'FoodAppUsers', uid)
      let userInfo = await getDoc(docRef)
      userInfo = userInfo.data()
      console.log(userInfo);

      dispatch({ type: 'Curr_User', payload: userInfo })
    } else {
      dispatch({ type: 'Curr_User', payload: uid })
    }


  }
  return (
    <Router>

      <Switch>

        <Route exact path="/users/userhomePage/orderStatus"><OrderStatus /></Route>
        <Route exact path="/login/userhomePage/orderStatus"><OrderStatus /></Route>
        <Route exact path="/users/userhomePage/orders"><Orders /></Route>
        <Route exact path="/login/userhomePage/orders"><Orders /></Route>
        <Route exact path="/login/userhomePage/dishes"><Dishes /></Route>
        <Route exact path="/users/userhomePage/dishes"><Dishes /></Route>
        <Route exact path="/users/userhomePage">< UserHomeScreen /></Route>
        <Route exact path="/login/userhomePage"><UserHomeScreen /></Route>
        <Route exact path="/login/homePage"><RestaurantHomeScreen /></Route>
        <Route exact path="/users/homePage"><RestaurantHomeScreen /></Route>
        <Route exact path="/users"><Users /></Route>
        <Route exact path="/login"><Login /></Route>
        <Route exact path="/"><Nav /></Route>

      </Switch>

    </Router>
  )
}
export default Routes
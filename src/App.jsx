import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom"
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Requerimientos from "./components/Requerimientos";
import Navbar from "./components/Navbar";
import React from "react";

import {auth} from "./firebase";

function App() {
  const [firebaseUser,setFirebaseUser]=React.useState(false)
  React.useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      console.log(user);
      if (user) {
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }
    })
  },[])
  return firebaseUser!==false ? (
    <Router>
    <div className="container">
    <Navbar firebaseUser={firebaseUser}/>
    <Routes>
      <Route path="/" element={<Inicio/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="requerimientos" element={<Requerimientos/>}/>    
    </Routes>
 
    </div>
    </Router>
  ):
  (<p className="text-center"><b>¡Cargando...!</b></p>);
}

export default App;

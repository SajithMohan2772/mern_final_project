import './App.css';
import Props from './Components/Props';
import UseState from './Components/UseState';
import UseEffect from './Components/UseEffect';
import MouseEvents from './Components/MouseEvents';
import KeyboardEvents from './Components/KeyboardEvents';
import FormEvents from './Components/FormEvents';
import ArraysWithUseState from './Components/ArraysWithUseState';
import ObjectsWithUseState from './Components/ObjectsWithUseState';
import UserProvider from './Components/UserProvider';
import Login from './Components/Login';
import UserProfile from './Components/UserProfile';
import UseReducer from './Components/UseReducer';
import UseCallback from './Components/UseCallback';
import UseMemo from './Components/UseMemo';
import UseRef from './Components/UseRef';
import UseLayout from './Components/UseLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Counter from './Components/Counter';
import Dashboard from './Components/Dashboard';
import About from './Components/About';
import Post from './Components/Post';
import UseNavigate from './Components/UseNavigate';
import Error from './Components/Error';
import Dashboard_2 from './Components/Dashboard_2';
import ProtectedRoute from './Components/ProtectedRoute';
import Uncontrolled from './Components/Uncontrolled_Component';
import ControlledSeperate from './Components/Controlled_Seperate';
import ControlledObject from './Components/Controlled_Object';
import FormValidation from './Components/Form_Validation';
import AsyncValidation from './Components/Async_Validation';
import Formik from './Components/Formik';
import CrudPost from './Components/CRUD/Post.jsx';
import CrudGet from './Components/CRUD/Get.jsx';
import CrudUpdate from './Components/CRUD/Update.jsx';
import CrudSpecific from './Components/CRUD/GetSpecific.jsx';
import CrudDelete from './Components/CRUD/Delete.jsx';
import Registration from './Components/Registration';
import LoginNew from './Components/Login_new';
import GetSpecificUserMsg from './Components/CRUD/GetSpecificUserMsgs';
import ProtectedRoutesJWT from './Components/ProtectedRoutesJWT.jsx';
import React from "react";

function App() {
    return (
      <>
        {/* <Props name="React" city="Colombo"/> */}

        {/* UseState Hook */}
        {/* <UseState /> */}

        {/* MouseEvents */}
        {/* <MouseEvents />
        <KeyboardEvents />
        <FormEvents/> */}

        {/* UseState Hook with arrays and objects */}
        {/* <ArraysWithUseState/>
        <ObjectsWithUseState/> */}

        {/* UseEffect Hook */}
        {/* <UseEffect/> */}

        {/* UseContext Hook */}
        {/* <UserProvider>
          <Login />
          <UserProfile/>
        </UserProvider> */}

        {/* UseReducer Hook */}
        {/* <UseReducer/> */}

        {/* UseCallback Hook */}
        {/* <UseCallback/> */}

        {/* UseMemo Hook */}
        {/* <UseMemo/> */}

        {/* UseRef Hook */}
        {/* <UseRef/> */}

        {/* UseLayout Hook */}
        {/* <UseLayout/> */}


        {/* Routing */}
        
        {/* <Router>
          <Routes>
            <Route path="/" element={<Navigation />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/dashboard_2/*" element={<Dashboard_2 />} />
            <Route path="/dashboard/about" element={<About />} />
            <Route path="/posts/:params" element={<Post />} />
            <Route path="/useNavigate" element={<UseNavigate />} />
            <Route path="*" element={<Error />} />  
          </Routes>
        </Router> */}

        {/* Protected Routing */}

        {/* <Router>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<ProtectedRoute/>}>
                <Route path="/userProfile" element={<UserProfile />} />
              </Route>
            </Routes>
          </UserProvider>
        </Router> */}

        {/* Uncontrolled Components in Forms */}
        {/* <Uncontrolled/> */}

        {/* Controlled Components Using separate state variables in Forms */}
        {/* <ControlledSeperate/> */}

        {/* Controlled Components Using objects in Forms */}
        {/* <ControlledObject/> */}

        {/* Validatings in Forms */}
        {/* <FormValidation/> */}

        {/* Asynchronous validation of forms */}
        {/* <AsyncValidation/> */}

        {/* Use of Formik library for validations in forms */}
        {/* <Formik/> */}

        {/* CRUD Operations  */}
        {/* <CrudPost/>
        <CrudGet/>
        <CrudUpdate/>
        <CrudSpecific/>
        <CrudDelete/> */}


        {/* Registration and Login */}
        {/* <Router>
          <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/login" element={<LoginNew />} /> 
            <Route path="/createPost" element={<CrudPost />} /> 
            <Route path="/getSpecificUserMsg" element={<GetSpecificUserMsg />} /> 
            <Route path="/getAll" element={<CrudGet />} /> 
          </Routes>
        </Router> */}

       {/* Protected Routes with JWT*/}
        <Router>
              <Routes>
                  <Route path="/" element={<Registration />} />
                  <Route path="/login" element={<LoginNew />} /> 
                  <Route element={<ProtectedRoutesJWT />}>
                      <Route path="createPost" element={<CrudPost />} /> 
                      <Route path="getSpecificUserMsg" element={<GetSpecificUserMsg />} /> 
                      <Route path="getAll" element={<CrudGet />} /> 
                  </Route>
              </Routes>
          </Router>
      </>
    );
}

export default App;

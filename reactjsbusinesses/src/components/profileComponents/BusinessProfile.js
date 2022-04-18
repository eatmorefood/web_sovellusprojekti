import React, { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import {Routes, Route, Navigate, Link} from "react-router-dom";
import Personalinfo from './BusinessInfo';
import Orderhistory from './Orderhistory';
import Settings from './Settings';
import './Profile.css';

function BusinessProfile(props) {
    const decodedToken = jwt_decode(props.jwt); //decodes & stores jwt token for use when trying to access paths requiring auth

    useEffect(() => { //switch user profile navigation bar active element style depending on which page is accessed via url
        if(window.location.pathname.indexOf("personal-info") > -1){
            switchView('x');
        } else if(window.location.pathname.indexOf("order-history") > -1){
            switchView('y');
        } else if(window.location.pathname.indexOf("settings") > -1){
            switchView('z');
        }
    });

    
    function switchView(param){ //switch user profile navigation bar active element style depending on which page is opened by click
        let x = document.getElementById('businessProfilePersonalInfo');
        let y = document.getElementById('businessProfileOrderHistory');
        let z = document.getElementById('businessProfileSettings'); 

        if(param === 'x'){
            x.classList.add('profileStatusActive');
            y.classList.remove('profileStatusActive');
            z.classList.remove('profileStatusActive');
        }
        if(param === 'y'){
            x.classList.remove('profileStatusActive');
            y.classList.add('profileStatusActive');
            z.classList.remove('profileStatusActive');
        }
        if(param === 'z'){
            x.classList.remove('profileStatusActive');
            y.classList.remove('profileStatusActive');
            z.classList.add('profileStatusActive');
        }
    }

    return (
        <div className="businessProfile">
            <h1>Profile</h1>
            <div className="businessProfileOptions">
                <div className="businessProfileOptionBorder"/>
                <div><Link to="personal-info" id="businessProfilePersonalInfo" onClick={ () => switchView('x') }>Business information</Link></div>
                <div className="businessProfileOptionBorder"/>
                <div><Link to="order-history" id="businessProfileOrderHistory" onClick={ () => switchView('y') }>Order history</Link></div>
                <div className="businessProfileOptionBorder"/>
                <div><Link to="settings" id="businessProfileSettings" onClick={ () => switchView('z') }>Settings</Link></div>
                <div className="businessProfileOptionBorder"/>
            </div>


            {/*<div>{ decodedToken.user.email }</div>

            <button onClick={ loadDataWithJWT }>click me</button>

            <table>
                { userTodos.map(t =>
                    <tr>
                        <td>{t.data}</td>
                    </tr>
                    ) }
                </table>*/}
        
            <Routes>
                <Route path='/' element={<Navigate to='/business/profile/personal-info' replace />} />  
                <Route path='/personal-info' element={<Personalinfo userToken={ decodedToken } userJWT={ props.jwt } />} />
                <Route path='/order-history' element={<Orderhistory userToken={ decodedToken } userJWT={ props.jwt } customers={props.customers}/>} />
                <Route path='/settings' element={<Settings userToken={ decodedToken } userJWT={ props.jwt } logout={ props.logout } />} />
                <Route path='/*' element={<Navigate to="/business/profile/personal-info" replace/>} />
            </Routes>  
        </div>        
    );
}

export default BusinessProfile;
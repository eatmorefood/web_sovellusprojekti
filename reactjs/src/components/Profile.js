import React, { useState } from "react";
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Constants from '../Constants.json';

function Profile(props) {

    const [userTodos, setUserTodos] = useState([]);
    const decodedToken = jwt_decode(props.jwt);

    const loadDataWithJWT = async () => {
        try {
            const results = await axios.get(Constants.API_ADDRESS + '/jwt-protected',
            {
                headers: {
                    'Authorization': 'Bearer ' + props.jwt
                }
            })
            setUserTodos(results.data);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="Profile">
            This is profile
            <div>{ decodedToken.user.email }</div>

            <button onClick={ loadDataWithJWT }>click me</button>

            <table>
                { userTodos.map(t =>
                    <tr>
                        <td>{t.data}</td>
                    </tr>
                    ) }
            </table>
        </div>
    );
}

export default Profile;
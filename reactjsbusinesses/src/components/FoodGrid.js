import React from 'react'
import './MenuPage.css';
import MenuPage from './MenuPage.js';
import editbtn from '../images/editbtn.png';
import {useNavigate} from "react-router-dom";

export default function FoodGrid (props) {

    let navigation = useNavigate(); 


    function navigate(obj)
    {
        return function ()
        {
            let path = "editmenu/" + obj.idfood; 
            navigation(path);
        }
    }

    const menuCells = props.arrOfFood.map(obj =>
        <tr key={obj.idfood} className="menuCells">
            <td>{obj.name}</td>
            <td>{obj.description}</td>
            <td>{obj.category}</td>
            <td>{obj.price}€</td>
            <td><img className="foodImage" src={obj.image}/></td>
            <td><img className="editBtn" src={editbtn} onClick={navigate(obj)}/></td>
        </tr>)




    return (

        <table className="menuContainer">
            <tbody>{menuCells}</tbody>
        </table>
    )
}
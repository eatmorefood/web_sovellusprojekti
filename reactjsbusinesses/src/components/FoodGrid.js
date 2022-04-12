import React from 'react'
import './MenuPage.css';

export default function FoodGrid (props) {

    const menuCells = props.arrOfFood.map(obj =>
        <tr key={obj.idfood} className="menuCells">
            <td>{obj.name}</td>
            <td>{obj.description}</td>
            <td>{obj.category}</td>
            <td>{obj.price}</td>
            <td>{obj.image}</td>
        </tr>)


    return (

        <table className="menuContainer">
            <tbody>{menuCells}</tbody>
        </table>
    )
}
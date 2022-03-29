import React from "react";
import './Support.css';
import img from '../../images/support.png'

function Support() {

  //royalty free img from pexels.com/photo/delivery-man-wearing-a-face-mask-and-riding-a-scooter-4392876

  return (
    <div className="support">
      <div className="supportTitle">EatMoreFood help and support</div> 
      <img className="supportImage" alt="EatMoreFOod support" src={img} />

      <div className="supportContent">
        <div className="supportContentTitle">Lorem Ipsum</div>
        <div className="supportContentSubtitle">Lorem Ipsum</div>
        <div className="supportContentText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed interdum tellus. Sed ac pretium risus. Donec ipsum ipsum, convallis et tellus ac, varius ultrices risus. Duis porta erat lectus, sit amet accumsan ipsum pretium at. Sed eget orci et mauris posuere malesuada. Proin scelerisque lorem diam. Pellentesque vulputate nisi sed iaculis dictum. Proin vel massa sed purus ullamcorper bibendum. Maecenas lobortis dui ut accumsan ultricies.</div>

        <div className="supportContentSubtitle">Lorem Ipsum</div>
        <div className="supportContentText">Pellentesque maximus, augue vitae pellentesque tincidunt, lacus nisi mattis metus, et fermentum ligula enim sit amet lacus. Nam rhoncus lacus non posuere tincidunt. Sed rhoncus auctor lacus non mollis. Ut enim odio, maximus nec lacinia non, volutpat et orci. Fusce vitae est sed velit bibendum interdum. Maecenas ut metus sem. Nullam feugiat erat id consequat laoreet. Suspendisse ex purus, cursus ac congue interdum, tempus sed lacus. Sed facilisis diam ligula. Sed ornare tortor feugiat congue tincidunt. Vestibulum eu efficitur purus. Aliquam neque odio, malesuada eget elit eget, sagittis accumsan justo. Duis venenatis ullamcorper enim eget maximus. Proin interdum diam quis nisl feugiat dictum. Praesent tempor lobortis est quis viverra. Ut dignissim auctor libero ut facilisis.</div>

        <div className="supportContentTitle">Lorem Ipsum</div>
        <div className="supportContentSubtitle">Lorem Ipsum</div>
        <div className="supportContentText">Proin at lorem aliquam, consectetur dui molestie, varius ipsum. Integer tempor euismod metus, eget sagittis dui convallis sed. Nunc cursus enim et luctus hendrerit. Fusce vitae elit fermentum, placerat lacus a, lacinia nisl. Vestibulum turpis neque, aliquet nec pretium a, condimentum a justo. Ut aliquet elit quis orci volutpat, non tempor erat condimentum. Duis posuere imperdiet felis. Curabitur nec nibh massa. Curabitur eget mauris sit amet urna maximus imperdiet a vitae sem. Nam a luctus dui. Donec posuere faucibus massa et sollicitudin. Pellentesque ultrices sagittis iaculis.</div>
      </div> 
    </div>
  );
}

export default Support;
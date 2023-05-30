import React from "react";
import { Route, Redirect } from "react-router-dom";

// ProtectedRoute принимает два аргумента: component и props.
//component - это компонент, который будет отображаться, если пользователь авторизован,
//и props - это объект со свойствами, переданными компоненту.
export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {() =>
        //Если props.isLoggedIn равно true (то есть пользователь авторизован), то будет отображен компонент
        //Component с передачей ему props. В противном случае, если props.isLoggedIn равно false
        //(то есть пользователь не авторизован), произойдет перенаправление на маршрут "/sign-in"
        props.isLoggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    </Route>
  );
}

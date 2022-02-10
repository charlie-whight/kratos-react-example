import React from "react";
import {Router} from "@reach/router";
import {Login, Register, Test} from "./page";
import {Home} from "./page/home";
import {EmailLoginPage} from "./page/oidc/login";
import {Route} from "react-router-dom";

// Pages
// import {Error, Login, Register} from "../page";

export const App = () => (
    <Router basepath={"/app"}>
        <Home path="/"/>
        <Login path="login"/>
        <Register path="registration"/>
        <Test path="test"/>

        <EmailLoginPage path="authlogin"/>
    </Router>
);
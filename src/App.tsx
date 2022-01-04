import React from "react";
import {Router} from "@reach/router";
import {Login, Register} from "./page";
import {Home} from "./page/home";

// Pages
// import {Error, Login, Register} from "../page";

export const App = () => (
    <Router basepath={"/app"}>
        <Home path="/" />
        <Login path="login"/>
        <Register path="registration"/>
    </Router>
);
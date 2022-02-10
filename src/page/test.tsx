import {OIDCLogin} from "../component";
import React from "react";
import {Link, RouteComponentProps} from "@reach/router";
import Cookies from "js-cookie";
import {AuthPublicAPI} from "../service";
import {HomeState} from "./home";


export class Test extends React.Component<RouteComponentProps, HomeState> {
    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            logoutUrl: "",
            session: ""
        };
    }

    render() {
        return (
            <div>
                some random stuff
                <OIDCLogin provider={"passwordless"}/>
            </div>
        );
    }
}

import React from "react";
import {RouteComponentProps} from "@reach/router";

import {AuthPageState} from "./common";

// ==

export interface RegisterState extends AuthPageState {}

export class Hello extends React.Component<
    RouteComponentProps,
    RegisterState
    > {


    render() {



        return (
            "Hello"
        );
    }
}

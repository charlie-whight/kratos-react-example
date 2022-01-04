import React from "react";
import {Link, RouteComponentProps} from "@reach/router";
import Cookies from 'js-cookie';

import {AuthPageState} from "./common";
import {AuthPublicAPI} from "../service";
import {AuthFormField,} from "../component";
import {UiNodeInputAttributes} from "@ory/kratos-client";

export interface HomeState extends AuthPageState {
    logoutUrl?: string
}

export class Home extends React.Component<RouteComponentProps, HomeState> {
    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            logoutUrl: "",
            session: Cookies.get('ory_kratos_session')
        };
    }

    componentDidMount() {
        AuthPublicAPI.createSelfServiceLogoutFlowUrlForBrowsers(this.state.session)
            .then((data) => {
                this.setState({logoutUrl: data.data.logout_url || ''})
            })
            .catch(() => ({}))
    }

    render() {
        return (
            <Link to={this.state.logoutUrl} type="link" className="btn btn-link">
                Logout
            </Link>
        );
    }
}

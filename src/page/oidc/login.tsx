import React from "react";
import {Link, RouteComponentProps} from "@reach/router";
import Cookies from 'js-cookie';

import {AuthPageState} from "../common";
import {AuthPublicAPI} from "../../service";
import {AuthFormField,} from "../../component";
import {UiNodeInputAttributes} from "@ory/kratos-client";
import {parseURLQuery} from "../../util";
import {AcceptLoginRequest, LoginRequest} from "@ory/hydra-client";
import hydraService from "../../../pkg/sdk/hydra";
import {EmailLogin} from "../../component/email-form";

export interface OIDCLoginState extends AuthPageState {
    loginChallenge?: string
    loginRequest?: LoginRequest
    redirect_to?: string
}

export class EmailLoginPage extends React.Component<RouteComponentProps, OIDCLoginState> {
    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const loginChallenge = parseURLQuery("loginChallenge", this.props.location) as string;
        this.setState({loginChallenge: loginChallenge || ''})

        const hydraSdk = hydraService("path")
        hydraSdk.getLoginRequest(loginChallenge)
            .then((request) => {
                if (request.data.skip) {
                    let accept: AcceptLoginRequest = {
                        subject: request.data.subject
                    }

                    hydraSdk.acceptLoginRequest(
                        loginChallenge,
                        accept
                    ).then((completed) => {
                        this.setState({redirect_to: completed.data.redirect_to})
                    }).catch((err) => {
                            return err;
                        }
                    )
                } else {
                    this.setState({loginRequest: request.data})
                }
            }).catch((err) => {
                console.log(err)
                return err
            }
        )
        if (this.state.redirect_to) {}
    }


    render() {
        return (
            <EmailLogin loginChallenge={this.state.loginChallenge} actionUrl={"/app/auth/login"} />
        );
    }
}
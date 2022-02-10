import React from "react";
import {useAsync} from "react-async"

import LoginRequest, {AcceptLoginRequest} from "@ory/hydra-client"
import {AuthForm, AuthFormButton,} from "./index";
import {SelfServiceLoginFlow, UiNodeInputAttributes} from "@ory/kratos-client";
import {toUiNodePartial} from "../util/ui";
import hydraService from "../../pkg/sdk/hydra"

export interface EmailLoginProps {
    loginChallenge: string
    actionUrl: string
}

const getLoginRequest = (loginChallenge: string, path: string) => {
    const hydraSdk = hydraService(path)
    return hydraSdk.getLoginRequest(loginChallenge)
        .then((request) => {
            if (request.data.skip) {
                let accept: AcceptLoginRequest = {
                    subject: request.data.subject
                }

                hydraSdk.acceptLoginRequest(
                    loginChallenge,
                    accept
                ).then((completed) => {
                    return completed.data.redirect_to
                }).catch((err) => {
                        return err;
                    }
                )
            }
        }).catch((err) => {
                console.log(err)
                return err
            }
        )

}

export const EmailLogin: React.FC<EmailLoginProps> = (props: EmailLoginProps) => {

    let form

    const {loginChallenge, actionUrl} = props

    form =
        <form action={actionUrl} method="post">
            <input type="hidden" name="login_challenge" value={loginChallenge}/>

            <fieldset
                className="text-input-fieldset"
                data-testid="node/input/oidc">
                <label>
            <span className="typography-h3">
                <span className="required-indicator">*</span>
            </span>
                    <input
                        className="text-input"
                        name="email"
                        type="input"
                        placeholder="Email Address"
                    />
                </label>
            </fieldset>
            <div className="input-button">
                <button className="button" type="submit">Sign in</button>
            </div>
        </form>


    return form


}

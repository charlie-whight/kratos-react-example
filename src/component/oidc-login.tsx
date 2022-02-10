import React from "react";
import {useAsync} from "react-async"

import {assertResponse} from "../page/common";
import {AuthPublicAPI} from "../service";
import {redirectToSelfService,} from "../util";
import {AuthForm, AuthFormButton,} from "./index";
import {SelfServiceLoginFlow, UiNodeInputAttributes} from "@ory/kratos-client";
import {toUiNodePartial} from "../util/ui";

export interface OIDCLoginProps {
    provider: string
}

const asyncGetFlow = () => {
    return AuthPublicAPI.initializeSelfServiceLoginFlowForBrowsers()
        .then((res) => {
            if (assertResponse(res))
                redirectToSelfService("/self-service/login/browser");
            const loginFlow = res.data;
            console.log(res.data);
            return loginFlow
        })
        .catch((err) => {

                return err;
            }
        )

}

export const OIDCLogin: React.FC<OIDCLoginProps> = (props: OIDCLoginProps) => {
    const {data, isPending} = useAsync({promiseFn: asyncGetFlow})

    let form
    if (isPending) return null
    if (data) {

        const {provider} = props
        let actionUrl: string
        let method: string
        let flow: SelfServiceLoginFlow

        console.log(data)
        flow = data;
        console.log(flow.ui)
        actionUrl = flow.ui.action;
        method = flow.ui.method;
        const formFields: JSX.Element[] = [];

        flow.ui.nodes.forEach((node, index) => {
            const attributes = node.attributes as UiNodeInputAttributes
            let type = toUiNodePartial(node)
            if (type == 'button' && attributes.value == provider) {
                formFields.push(<AuthFormButton key={index} field={node}
                                                attributes={node.attributes as UiNodeInputAttributes}/>);
            }
        });

        form =
            <AuthForm actionUrl={actionUrl} method={method}>
                {formFields}
            </AuthForm>

    }

    return form
}

import React from "react";
import {Link, RouteComponentProps} from "@reach/router";

import {assertResponse, AuthPageState} from "./common";
import {AuthPublicAPI} from "../service";
import {parseURLQuery, redirectToSelfService,} from "../util";
import {AuthActionContainer, AuthContainer, AuthForm, AuthFormButton, AuthFormField, OIDCLogin,} from "../component";
import {UiNodeInputAttributes} from "@ory/kratos-client";
import {toUiNodePartial} from "../util/ui";
import {findAllByDisplayValue} from "@testing-library/react";

export interface LoginState extends AuthPageState {}

export class Login extends React.Component<RouteComponentProps, LoginState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    const flowId = parseURLQuery("flow", this.props.location) as string;

    AuthPublicAPI.initializeSelfServiceLoginFlowForBrowsers()
      .then((res) => {
        if (assertResponse(res))
          redirectToSelfService("/self-service/login/browser");

        const loginFlow = res.data;
        // const loginType = "password";

        this.setState({
          flow: loginFlow,
          authFormProps: {
            actionUrl: loginFlow.ui.action,
            method: loginFlow.ui.method,
          },
        });

        console.log(res.data);
      })
      .catch((err) => redirectToSelfService("/self-service/login/browser"));
  }

  render() {
    if (!this.state.authFormProps) return null;

    const formFields: JSX.Element[] = [];

    this.state.flow.ui.nodes.forEach((node, index) => {
      let type = toUiNodePartial(node)
      if (type == "default") {

        formFields.push(<AuthFormField key={index} field={node} attributes={node.attributes as UiNodeInputAttributes} />);
      } else if (type == 'button') {
        formFields.push(<AuthFormButton key={index} field={node} attributes={node.attributes as UiNodeInputAttributes} />);
      }
    });

    return (
      <AuthContainer subtitle="Logging in" title="Login">
        <AuthForm actionUrl={
           this.state.authFormProps.actionUrl} method={this.state.authFormProps.method}>
          {formFields}
          <AuthActionContainer>
            <Link
              to="/app/registration"
              type="link"
              className="btn btn-outline-secondary"
            >
              Register
            </Link>
            <Link to="/app/recovery" type="link" className="btn btn-link">
              Forget your password? It happens.
            </Link>
          </AuthActionContainer>
        </AuthForm>

      </AuthContainer>
    );
  }
}

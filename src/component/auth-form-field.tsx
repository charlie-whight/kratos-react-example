import React from "react";
import {UiNode, UiNodeInputAttributes, UiText} from "@ory/kratos-client";

import {getFormPlaceholder} from "../util";

export const AuthFormAttributesMessage: React.FC<{ messages?: UiText[] }> = ({
  messages,
}) => {
  if (!messages || messages === []) return null;

  const messageList: JSX.Element[] = messages.map((value: UiText, index) => {
    let messageSeverity = "";

    switch (value.type) {
      case "error": {
        messageSeverity = "text-danger";
        break;
      }
      case "warn": {
        messageSeverity = "text-warning";
        break;
      }
      default: {
        messageSeverity = "text-primary";
      }
    }

    return (
      <p key={index} className={`mb-0 ${messageSeverity}`}>
        {value.text}
      </p>
    );
  }) as JSX.Element[];

  return <div className="form-text">{messageList}</div>;
};

// ==

export interface AuthFormAttributesProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field: UiNode;
  attributes: UiNodeInputAttributes;
}

export const AuthFormField: React.FC<AuthFormAttributesProps> = ({
  field,
    attributes,
  ...otherProps
}) => (
  <div
    className={`form-group ${attributes.type !== "hidden" ? "visible" : "d-none"}`}
  >
    <label htmlFor={attributes.name} className="form-label">
      {}
    </label>
    <input
      className="form-control"
      /// @ts-ignore
      defaultValue={attributes.value}
      disabled={attributes.disabled}
      id={attributes.name}
      name={attributes.name == "method" ? "" : attributes.name}
      pattern={attributes.pattern}
      placeholder={getFormPlaceholder(attributes)}
      required={attributes.required}
      type={attributes.type}
    />
    <AuthFormAttributesMessage messages={field.messages} />
  </div>
);

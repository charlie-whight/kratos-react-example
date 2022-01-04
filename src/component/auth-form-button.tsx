import React from "react";
import {UiNode, UiNodeInputAttributes, UiText} from "@ory/kratos-client";

import {getFormPlaceholder} from "../util";
import {getNodeLabel} from "@ory/integrations/ui";
import {AuthFormAttributesMessage, AuthFormAttributesProps} from "./auth-form-field";



// ==

export const AuthFormButton: React.FC<AuthFormAttributesProps> = ({
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
        <button
            className="button"
// @ts-ignore
            onClick={attributes.onclick}
            name={attributes.name}
// @ts-ignore
            type={attributes.type}
            value={attributes.value}
         >
        {getNodeLabel(field)}
            </button>

        <AuthFormAttributesMessage messages={field.messages} />
    </div>
);

import React from "react";
import {getFormPlaceholder} from "../util";
import {AuthFormAttributesMessage, AuthFormAttributesProps} from "./auth-form-field";

export const AuthFormDefault: React.FC<AuthFormAttributesProps> = ({
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
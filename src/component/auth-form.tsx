import React from "react";

export interface AuthFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  actionUrl: string;
  method: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  children,
  actionUrl,
  method,

  ...otherProps
}) => (
  <form
    className="d-grid gap-4"
    encType="application/x-www-form-urlencoded"
    action={actionUrl}
    method={method}
    {...otherProps}
  >
    {children}
  </form>
);

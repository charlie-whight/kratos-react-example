import {Configuration, V0alpha2Api} from "@ory/kratos-client";
import {Config} from "../config";

export const AuthPublicAPI = new V0alpha2Api(
  new Configuration({
    basePath: Config.auth.publicURL,
  })
);

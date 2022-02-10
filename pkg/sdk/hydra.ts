import {AdminApi} from "@ory/hydra-client";

const hydraService = (path: string): AdminApi => {

        return new AdminApi({
                accessToken: undefined,
                apiKey: undefined,
                baseOptions: undefined,
                formDataCtor: undefined,
                password: "",
                username: "",
                isJsonMime(mime: string): boolean {
                    return false;
                },
                basePath: path
            }
        )
}

export default hydraService
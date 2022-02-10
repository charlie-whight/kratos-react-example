import { Configuration, V0alpha2Api } from '@ory/client'
import {
  V0alpha2Api as OpenSourceV0alpha2Api,
  V0alpha2ApiInterface
} from '@ory/kratos-client'

const apiBaseUrlInternal =
  process.env.KRATOS_PUBLIC_URL ||
  process.env.ORY_SDK_URL ||
  'https://public-ory-kratos.external.rvu.cloud/public'

export const apiBaseUrl = process.env.KRATOS_BROWSER_URL || 'https://public-ory-kratos.external.rvu.cloud/public'

// Alternatively use the Ory Kratos SDK.
const sdk = new OpenSourceV0alpha2Api(
    new Configuration({ basePath: apiBaseUrlInternal }))

export default sdk

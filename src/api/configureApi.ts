import { BaseAPI, Configuration, ResponseContext } from './generated'

const AUTH_STORAGE_KEY = 'apiKey'
const AUTH_HEADER_KEY = 'Authorization'

interface IApiContext {
  [key: string]: BaseAPI
}

const apiContext: IApiContext = {}

/**
 * Creates or retrieves a given api {@code GenericApi} based on the flag {@code forceRecreate}
 * The role of this wrapper is create a single point of creation/configuration of existing apis
 * that are defined with Open API Generator
 *
 * {@example}
 * const calculatorApi = injectApi(CalculatorApi);
 *
 * calculatorApi.calculate({a: 1, b: 2})
 *
 * @param GenericApi
 * @param forceRecreate
 */
export function injectApi<T extends BaseAPI>(
  GenericApi: new (config: Configuration) => T,
  forceRecreate = false
) {
  const requestedApiInstance = GenericApi.name
  if (!forceRecreate && requestedApiInstance in apiContext) {
    return apiContext[requestedApiInstance] as T
  }
  apiContext[requestedApiInstance] = new GenericApi(
    getDefaultConfiguration()
  ).withPostMiddleware(refreshApiKey)

  return apiContext[requestedApiInstance] as T
}

function getDefaultConfiguration() {
  return new Configuration({
    apiKey: () => localStorage.getItem(AUTH_STORAGE_KEY) || '',
  })
}

const refreshApiKey = (context: ResponseContext) => {
  const maybeAuthHeader = context.response.headers.get(AUTH_HEADER_KEY)
  if (maybeAuthHeader) {
    localStorage.setItem(AUTH_STORAGE_KEY, maybeAuthHeader)
  }

  return Promise.resolve()
}

import { AppContext } from "../App.context"

export const appStateReducer = (state: AppContext, action: any) => {
    switch (action.type) {
        case "SET_IS_LOADING":
            return {
                ...state,
                elementsIsLoading: action.payload,
            }
        case "SET_HAS_LOADED":
            return {
                ...state,
                elementsHasLoaded: action.payload,
            }
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
            }
        case "SET_IS_USING_BACKEND_PROXY_EXAMPLE":
            return {
                ...state,
                isUsingBackendProxyExample:
                    action.payload.isUsingBackendProxyExample,
            }
        case "SET_BACKEND_PROXY_EXAMPLE_USERS":
            return {
                ...state,
                backendProxyExampleUsers:
                    action.payload.backendProxyExampleUsers,
            }
        case "SET_ELEMENTS_INJECTOR_LOADED":
            return {
                ...state,
                elementsInjectorHasLoaded: action.payload,
            }
        default:
            return state
    }
}

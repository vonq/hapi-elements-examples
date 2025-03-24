import { createContext, useEffect, useReducer } from "react"
import { appStateReducer } from "./reducers/appStateReducer"

export type BackendProxyExampleUser = {
    id: string
    tenantId: string
    name: string
    roleId: string
    accessToken: string
}

export type AppContext = {
    elementsInjectorHasLoaded: boolean
    elementsIsLoading: boolean
    elementsHasLoaded: boolean
    isUsingBackendProxyExample: boolean
    backendProxyExampleUsers: BackendProxyExampleUser[]
    user: {
        id: string
        hapiCredentials: {
            clientToken: string
        } | null
    } | null
}

const initialState: AppContext = {
    elementsInjectorHasLoaded: false,
    elementsIsLoading: false,
    elementsHasLoaded: false,
    isUsingBackendProxyExample: false,
    backendProxyExampleUsers: [],
    user: null,
}

export const appContext = createContext<{
    state: AppContext
    setState: (...args: any[]) => void
}>({
    state: initialState,
    setState: () => {},
})

const AppContextProvider = (props: any) => {
    const [state, setState] = useReducer(appStateReducer, initialState)

    return (
        <appContext.Provider value={{ state, setState }}>
            {props.children}
        </appContext.Provider>
    )
}

export default AppContextProvider

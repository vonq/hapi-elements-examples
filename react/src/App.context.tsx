import { createContext, useEffect, useReducer } from "react"
import { appStateReducer } from "./reducers/appStateReducer"

export type AppContext = {
    elementsIsLoading: boolean
    elementsHasLoaded: boolean
    user: {
        id: string
        hapiCredentials: {
            partnerId: string
            clientId: string
            clientToken: string
        } | null
    }
}

const initialState: AppContext = {
    elementsIsLoading: false,
    elementsHasLoaded: false,
    user: {
        id: "demo-id-123",
        hapiCredentials: null,
    },
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

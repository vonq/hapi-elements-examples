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
        default:
            return state
    }
}

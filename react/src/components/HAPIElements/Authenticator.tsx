import React, {
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react"
import { appContext } from "../../App.context"
import generateHAPIElementsJWTToken from "../../requests/generateHAPIElementsJWTToken"

type Props = {} & PropsWithChildren

const HAPIElementsAuthenticator: React.ComponentType<Props> = ({
    children,
}) => {
    const { state, setState } = useContext(appContext)
    const [hasAuthenticated, setHasAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        async function authenticate() {
            try {
                const { partnerId, clientId, clientToken } =
                    await generateHAPIElementsJWTToken(state.user.id)
                setState({
                    type: "SET_USER",
                    payload: {
                        ...state.user,
                        hapiCredentials: {
                            partnerId,
                            clientId,
                            clientToken,
                        },
                    },
                })
                setHasAuthenticated(true)
            } catch {}
        }

        authenticate()
    }, [state.user.id])

    return (
        <React.Fragment>
            {hasAuthenticated ? children : "Not Authenticated"}
        </React.Fragment>
    )
}

export default HAPIElementsAuthenticator

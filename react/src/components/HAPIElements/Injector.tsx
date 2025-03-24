import React, {
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"
import { appContext } from "../../App.context"
import generateHAPIElementsJWTToken from "../../requests/generateHAPIElementsJWTToken"
import getAllBackendProxyExampleUsers from "../../requests/getAllBackendProxyExampleUsers"
import { elementsWindow } from "../../config/elementsWindow"
import {
    CampaignCreateForm,
    HapiStateValueWithListener,
    HapiTheme,
} from "@vonq/hapi-elements-types"
import { fakeEnvVars } from "../../config/env-vars"
import { OurJob } from "../../types"
import { getMappedJobToHapiElementsCampaignForm } from "../../utils/hapiElements"

type Props = {} & PropsWithChildren

const HAPIElementsInjector: React.ComponentType<Props> = ({ children }) => {
    const { state, setState } = useContext(appContext)
    const [hasAuthenticated, setHasAuthenticated] = useState<boolean>(false)

    const _onLoadElements = async () => {
        /* Updating Theme Start */

        const origTheme = (
            elementsWindow!.hapi.theming.state!
                .theme as HapiStateValueWithListener<HapiTheme>
        ).value
        const globalTheme = {
            ...origTheme.global,
            borderRadius: "4px",
            primaryBackgroundColor: "#346CA7",
            primaryTextColor: "#FFF",
        }

        const updatedTheme = {
            ...origTheme,
            global: globalTheme,
        }

        elementsWindow!.hapi.theming.state!.theme = updatedTheme

        /* Updating Theme End */

        /* Updating Font Start */
        const styleEl = document.createElement("style")
        styleEl.innerHTML = `
                @font-face {
                    font-family: "Poppins";
                    src: url('${window.location.origin}/example-font-for-docs/Poppins-Regular.ttf') format('opentype');
                }
            `
        document.head.appendChild(styleEl)
        elementsWindow!.hapi.theming.state!.fontOptions = {
            fontFaces: [
                {
                    fontFamily: "Poppins",
                    src: `url('${fakeEnvVars.hapiElementsURL}/example-font-for-docs/Poppins-Regular.ttf') format('opentype')`,
                },
            ],
            fontFamily: "Poppins",
        }

        /* Updating Font End */

        /* Updating (Prefilling) Campaign Order Form Start */

        const ourJobDetails: OurJob = {
            company_id: "your-users-company-id",
            job_title: "Some Job Title",
            job_description: "Some Job Description",
            job_category: "Customer Service",
            job_hours: "Full-Time",
            job_locations: [
                {
                    address_1: "Address 1",
                    address_2: "Address 2",
                    city: "Some City",
                    country: "Some Country",
                    postal_code: "123",
                },
            ],
            job_urls: [
                {
                    job_details_url: "https://some-url.com",
                    apply_url: "https://some-url.com",
                },
            ],
            recruiter_company: "Recruiter's Company Name",
            recruiter_company_logo_url: "https://some-url.com/some-logo.png",
            recruiters: [
                {
                    email: "recruiteremail@gmail.com",
                    first_name: "Recruiter's First Name",
                    last_name: "Recruiter's Last Name",
                    user_id: "user-id-123",
                    user_name: "username-123",
                },
            ],
        }

        const mappedJob = getMappedJobToHapiElementsCampaignForm(ourJobDetails)

        const existingCampaign = (
            elementsWindow!.hapi.campaign.state!
                .campaignForm as HapiStateValueWithListener<CampaignCreateForm>
        ).value
        elementsWindow!.hapi.campaign.state!.campaignForm =
            elementsWindow!.hapiUtils.mergeDeepOverwriteArrays(
                existingCampaign,
                mappedJob,
            )

        /* Updating (Prefilling) Campaign Order Form End */

        setState({
            type: "SET_IS_LOADING",
            payload: false,
        })
        setState({
            type: "SET_HAS_LOADED",
            payload: true,
        })
    }

    const onLoadInjector = () => {
        setState({
            type: "SET_ELEMENTS_INJECTOR_LOADED",
            payload: true,
        })
    }

    useEffect(() => {
        elementsWindow.addEventListener("hapi:load:injector", onLoadInjector)
        elementsWindow.addEventListener("hapi:load:script", _onLoadElements)

        const scriptEl = document.createElement("script")
        scriptEl.type = "module"
        scriptEl.defer = true
        scriptEl.src = `${fakeEnvVars.hapiElementsURL}/api/injector.js`

        document.head.appendChild(scriptEl)

        return () => {
            elementsWindow.removeEventListener(
                "hapi:load:script",
                _onLoadElements,
            )
            elementsWindow.removeEventListener(
                "hapi:load:injector",
                onLoadInjector,
            )
        }
    }, [])

    useEffect(() => {
        async function authenticate() {
            try {
                const response = await generateHAPIElementsJWTToken(
                    state.user!.id,
                    state.isUsingBackendProxyExample,
                )
                const clientToken = !state.isUsingBackendProxyExample
                    ? response.clientToken
                    : response.token
                setState({
                    type: "SET_USER",
                    payload: {
                        ...state.user,
                        hapiCredentials: {
                            clientToken,
                        },
                    },
                })
                elementsWindow.hapiInjector.setConfig(
                    "clientToken",
                    clientToken,
                )
                if (state.isUsingBackendProxyExample) {
                    elementsWindow.hapiInjector.setConfig(
                        "apiHost",
                        fakeEnvVars.backendProxyExampleURL +
                            fakeEnvVars.backendProxyExampleVONQHAPIProxyPath,
                    )
                    // HAPI Elements has token verification before the loader script is sent to the frontend
                    // Because the backend proxy is running locally, our sandbox environment will not be able to make a request on server side
                    // disable the verification for demo purposes
                    // you won't need to do this when going to production because our sandbox/production environment can call your backend domain
                    elementsWindow.hapiInjector.setConfig(
                        "useJWTAuthHeaders",
                        !state.isUsingBackendProxyExample,
                    )
                }

                await elementsWindow.hapiInjector.inject()
                if (state.isUsingBackendProxyExample) {
                    // reenable JWT auth headers back so the backend proxy works
                    // you won't need to do this when going to production because our sandbox/production environment can call your backend domain
                    elementsWindow.hapiApi.setHeaders({
                        "x-authorization": "Bearer " + clientToken,
                    })
                }
                setHasAuthenticated(true)
            } catch {}
        }
        if (state.user?.id) {
            authenticate()
        }
    }, [state.user?.id, state.isUsingBackendProxyExample])

    const onChangeIsRunningBackendProxyExample = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setState({
                type: "SET_IS_USING_BACKEND_PROXY_EXAMPLE",
                payload: {
                    isUsingBackendProxyExample: event.target.checked,
                },
            })
        },
        [state.isUsingBackendProxyExample],
    )

    useEffect(() => {
        async function fetchBackendProxyExampleUsers() {
            try {
                const backendProxyExampleUsers =
                    await getAllBackendProxyExampleUsers()
                setState({
                    type: "SET_BACKEND_PROXY_EXAMPLE_USERS",
                    payload: { backendProxyExampleUsers },
                })
            } catch {}
        }
        if (state.isUsingBackendProxyExample) {
            fetchBackendProxyExampleUsers()
        }
    }, [state.isUsingBackendProxyExample])

    const onChangeBackendProxyUser = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            setState({
                type: "SET_USER",
                payload: {
                    id: event.target.value,
                    hapiCredentials: null,
                },
            })
        },
        [],
    )

    return (
        <React.Fragment>
            {hasAuthenticated ? (
                children
            ) : !state.elementsInjectorHasLoaded ? (
                "Loading HAPI Elements injector, please wait..."
            ) : (
                <div>
                    <div>
                        I'm running the backend proxy example locally{" "}
                        <input
                            type={"checkbox"}
                            checked={state.isUsingBackendProxyExample}
                            onChange={onChangeIsRunningBackendProxyExample}
                        />
                    </div>
                    <div
                        style={{
                            marginTop: "1rem",
                        }}
                    >
                        Select user:
                        <select onChange={onChangeBackendProxyUser}>
                            <option selected value={""} disabled>
                                Select a user
                            </option>
                            {!state.isUsingBackendProxyExample && (
                                <option value={"demo-user-123"}>
                                    Demo User
                                </option>
                            )}
                            {state.backendProxyExampleUsers.map((user) => (
                                <option value={user.id} key={user.id}>
                                    {user.name} - {user.id}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default HAPIElementsInjector

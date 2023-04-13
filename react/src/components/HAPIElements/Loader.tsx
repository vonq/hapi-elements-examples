import React, { PropsWithChildren, useContext, useEffect } from "react"
import { elementsWindow } from "../../config/elementsWindow"
import { appContext } from "../../App.context"
import { fakeEnvVars } from "../../config/env-vars"
import {
    HapiStateValueWithListener,
    HapiTheme,
    CampaignCreateForm,
} from "@vonq/hapi-elements-types"
import { OurJob } from "../../types"
import { getMappedJobToHapiElementsCampaignForm } from "../../utils/hapiElements"

type Props = {
    onLoadElements?: () => void
} & PropsWithChildren

const HAPIElementsLoader: React.ComponentType<Props> = ({
    children,
    onLoadElements,
}) => {
    const { state, setState } = useContext(appContext)
    const _onLoadElements = async () => {
        if (onLoadElements) {
            onLoadElements()
        }
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

    useEffect(() => {
        elementsWindow.addEventListener("hapi:load:script", _onLoadElements)

        return () => {
            elementsWindow.removeEventListener(
                "hapi:load:script",
                _onLoadElements,
            )
        }
    }, [])

    const user = state.user

    const scriptSrc = `${fakeEnvVars.hapiElementsURL}/api/loader.js?partnerId=${user.hapiCredentials?.partnerId}&clientId=${user.hapiCredentials?.clientId}&clientToken=${user.hapiCredentials?.clientToken}`

    useEffect(() => {
        if (!document.getElementById("hapi-loader")) {
            setState({
                type: "SET_IS_LOADING",
                payload: true,
            })
            const scriptEl = document.createElement("script")
            scriptEl.src = scriptSrc
            scriptEl.id = "hapi-loader"
            scriptEl.type = "text/javascript"
            scriptEl.defer = true

            document.body.appendChild(scriptEl)
        } else if (elementsWindow.hapi) {
            setState({
                type: "SET_IS_LOADING",
                payload: false,
            })
        }
    }, [])

    if (!user.hapiCredentials) {
        return <React.Fragment>Not Authenticated</React.Fragment>
    }

    return (
        <React.Fragment>
            {state.elementsIsLoading
                ? "Loading Elements, please wait..."
                : children}
        </React.Fragment>
    )
}

export default HAPIElementsLoader

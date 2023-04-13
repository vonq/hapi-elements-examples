import React, { useContext, useEffect } from "react"
import HAPIElementsOrderJourneyWidget from "../components/HAPIElements/OrderJourneyWidget"
import HAPIElementsUserJourneyButtonsWidget from "../components/HAPIElements/UserJourneyButtonsWidget"
import { elementsWindow } from "../config/elementsWindow"
import {
    HapiStateValueWithListener,
    OrderJourneyStepKey,
} from "@vonq/hapi-elements-types"
import { appContext } from "../App.context"
import HAPIElementsWalletAndBasketButtonsBar from "../components/HAPIElements/WalletAndBasketButtonsBar"

type Props = {}

const ElementsOrderJourneyWithoutAddContractsPage: React.ComponentType<
    Props
> = ({}) => {
    const { state } = useContext(appContext)
    useEffect(() => {
        if (state.elementsHasLoaded) {
            const currentSteps = (
                elementsWindow!.hapi.orderJourney.state!
                    .stepsEnabled as HapiStateValueWithListener<
                    OrderJourneyStepKey[]
                >
            ).value
            elementsWindow!.hapi.orderJourney.state!.stepsEnabled =
                currentSteps.filter(
                    (step) =>
                        step !==
                        elementsWindow!.hapi.orderJourney.utils!.stepKeys
                            .addContracts,
                )
        }
    }, [state.elementsHasLoaded])

    return (
        <div className={"container flex flex-col"}>
            <h1>Elements Order Journey (without Add Contracts step) Page.</h1>
            <p>
                On the Admin page, the Add Contracts widget is shown so that the
                end-user cannot create contracts during the order journey. The
                "Add Contracts" step is hidden in the below journey and the
                widget of it is in the admin page.
            </p>
            <div className={"flex-1 overflow-hidden"}>
                <HAPIElementsWalletAndBasketButtonsBar />
                <HAPIElementsOrderJourneyWidget />
            </div>
            <div>
                <HAPIElementsUserJourneyButtonsWidget />
            </div>
        </div>
    )
}

export default ElementsOrderJourneyWithoutAddContractsPage

import React from "react"
import HAPIElementsOrderJourneyWidget from "../components/HAPIElements/OrderJourneyWidget"
import HAPIElementsUserJourneyButtonsWidget from "../components/HAPIElements/UserJourneyButtonsWidget"
import HAPIElementsWalletAndBasketButtonsBar from "../components/HAPIElements/WalletAndBasketButtonsBar"

type Props = {}

const ElementsOrderJourneyCompletePage: React.ComponentType<Props> = ({}) => {
    return (
        <div className={"container flex flex-col"}>
            <h1>Elements Order Journey (Complete) Page</h1>
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

export default ElementsOrderJourneyCompletePage

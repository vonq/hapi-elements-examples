import React from "react"
import HAPIElementsWalletButtonWidget from "./WalletButtonWidget"
import HAPIElementsBasketButtonWidget from "./BasketButtonWidget"

type Props = {}

const HAPIElementsWalletAndBasketButtonsBar: React.ComponentType<
    Props
> = ({}) => {
    return (
        <div className={"flex justify-end gap-x-2"}>
            <span>
                <HAPIElementsWalletButtonWidget />
            </span>
            <span>
                <HAPIElementsBasketButtonWidget />
            </span>
        </div>
    )
}

export default HAPIElementsWalletAndBasketButtonsBar

import React from "react"
import HAPIElementsAddContractWidget from "../components/HAPIElements/AddContractWidget"

type Props = {}

const OurAdminPage: React.ComponentType<Props> = ({}) => {
    return (
        <div>
            <h1>Our Admin Page</h1>
            <p>
                This page exists to show you that you can remove some steps in
                the order journey then include the widgets that were part of the
                hidden step in a separate page like an admin page where the end
                user can only access if they have the permission.
            </p>
            <HAPIElementsAddContractWidget />
        </div>
    )
}

export default OurAdminPage

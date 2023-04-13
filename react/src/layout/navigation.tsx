import React from "react"
import { NavLink } from "react-router-dom"
import NavigationLinks from "./navigation-links"

type Props = {}

const LayoutNavigation: React.ComponentType<Props> = ({}) => {
    return (
        <div className="navigation">
            <span className={"logo"}>MY ATS</span>
            <div className={"ml-2 gap-x-4 flex"}>
                <NavigationLinks />
            </div>
        </div>
    )
}

export default LayoutNavigation

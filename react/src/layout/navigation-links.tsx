import React from "react"
import { NavLink } from "react-router-dom"

type Props = {}

const NavigationLinks: React.ComponentType<Props> = ({}) => {
    return (
        <React.Fragment>
            <NavLink to="/">Home Page</NavLink>
            <NavLink to="/our-own-page">Our Own Page</NavLink>
            <NavLink to="/hapi-elements-order-journey-complete-page">
                HAPI Elements Order Journey (Complete)
            </NavLink>
            <NavLink to="/hapi-elements-order-journey-without-add-contracts-page">
                HAPI Elements Order Journey (without Add Contracts step)
            </NavLink>
            <NavLink to="/our-admin-page">Admin Page</NavLink>
        </React.Fragment>
    )
}

export default NavigationLinks

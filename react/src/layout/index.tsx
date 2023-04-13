import React, { PropsWithChildren } from "react"
import LayoutNavigation from "./navigation"
import LayoutBody from "./body"

type Props = {} & PropsWithChildren

const Layout: React.ComponentType<Props> = ({ children }) => {
    return (
        <React.Fragment>
            <LayoutNavigation />
            <LayoutBody>{children}</LayoutBody>
        </React.Fragment>
    )
}

export default Layout

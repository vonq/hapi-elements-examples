import React from "react"
import NavigationLinks from "../layout/navigation-links"

type Props = {}

const HomePage: React.ComponentType<Props> = ({}) => {
    return (
        <div>
            <h1>Home Page</h1>
            <p>Here are all the routes available:</p>
            <div className={"flex flex-col gap-y-2"}>
                <NavigationLinks />
            </div>
        </div>
    )
}

export default HomePage

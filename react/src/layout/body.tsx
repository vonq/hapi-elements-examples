import React, { PropsWithChildren } from "react"

type Props = {} & PropsWithChildren

const LayoutBody: React.ComponentType<Props> = ({ children }) => {
    return <div className="body">{children}</div>
}

export default LayoutBody

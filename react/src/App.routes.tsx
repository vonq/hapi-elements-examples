import { RouteObject } from "react-router-dom"
import React from "react"
import Layout from "./layout"
import OurOwn from "./pages/our-own"
import HomePage from "./pages/home"
import ElementsOrderJourneyCompletePage from "./pages/hapi-elements-order-journey-complete"
import OurAdminPage from "./pages/our-admin"
import HAPIElementsInjector from "./components/HAPIElements/Injector"
import ElementsOrderJourneyWithoutAddContractsPage from "./pages/hapi-elements-order-journey-without-add-contracts"

const getChildrenWrappedWithLayout = (children: any) => (
    <Layout>{children}</Layout>
)

const getChildrenWithHAPIElements = (children: any) => (
    <HAPIElementsInjector>{children}</HAPIElementsInjector>
)

export const appRoutes: RouteObject[] = [
    {
        path: "/",
        element: getChildrenWrappedWithLayout(<HomePage />),
    },
    {
        path: "/our-own-page",
        element: getChildrenWrappedWithLayout(<OurOwn />),
    },
    {
        path: "/hapi-elements-order-journey-complete-page",
        element: getChildrenWrappedWithLayout(
            getChildrenWithHAPIElements(<ElementsOrderJourneyCompletePage />),
        ),
    },
    {
        path: "/hapi-elements-order-journey-without-add-contracts-page",
        element: getChildrenWrappedWithLayout(
            getChildrenWithHAPIElements(
                <ElementsOrderJourneyWithoutAddContractsPage />,
            ),
        ),
    },
    {
        path: "/our-admin-page",
        element: getChildrenWrappedWithLayout(
            getChildrenWithHAPIElements(<OurAdminPage />),
        ),
    },
]

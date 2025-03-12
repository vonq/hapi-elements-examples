import * as React from "react" //do not remove this
import {WindowHapiSDKSubmodule} from "@vonq/hapi-elements-types"

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [key: string]: any
        }
    }

    interface Window { hapi: WindowHapiSDKSubmodule }
}
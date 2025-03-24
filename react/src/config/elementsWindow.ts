import { WindowHapi } from "@vonq/hapi-elements-types"
import { WindowHapiInjector } from "@vonq/hapi-elements-types/_window/window"

export const elementsWindow = window as unknown as WindowHapi &
    WindowHapiInjector &
    Window &
    typeof globalThis

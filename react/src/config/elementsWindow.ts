import { WindowHapi } from "@vonq/hapi-elements-types"

export const elementsWindow = window as unknown as WindowHapi &
    Window &
    typeof globalThis

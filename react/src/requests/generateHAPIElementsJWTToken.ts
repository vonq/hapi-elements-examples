import axios from "axios"
import { fakeEnvVars } from "../config/env-vars"

export default async (clientId: string) => {
    try {
        const { data } = await axios.post(
            // do not reuse this as this is just for demo purposes
            // you will need partnerId and partnerToken of your own and the auth should happen on your backend
            // just like this endpoint simulates auth for the demo purposes
            `${fakeEnvVars.hapiElementsURL}/api/generate-jwt-token`,

            {
                clientId,
            },
        )

        return data
    } catch {}
}

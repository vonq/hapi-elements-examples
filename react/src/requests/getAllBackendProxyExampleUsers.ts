import axios from "axios"
import { fakeEnvVars } from "../config/env-vars"

export default async () => {
    try {
        const { data } = await axios.get(
            // do not reuse this as this is just for demo purposes
            // you will need partnerId and partnerToken of your own and the auth should happen on your backend
            // just like this endpoint simulates auth for the demo purposes
            fakeEnvVars.backendProxyExampleURL + "/api/users",
        )

        return data
    } catch {}
}

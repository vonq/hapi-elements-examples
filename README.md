# HAPI Elements Examples

All projects can be run by `cd` into respective directory then do:
1. `yarn`
2. `yarn start` 


## Framework Examples

### React
React with TypeScript can be found in `react` folder.

React example can be ran in conjunction with the NodeJS Backend Proxy example.

### NodeJS Backend Proxy with Role Based Access Control
ExpressJS with TypeScript can be found in `backend-proxy` folder.

Before running, do `cp .env.example .env` and change the following variables with the credentials you were given:
- `HAPI_BACKEND_PARTNER_ID`
- `HAPI_BACKEND_PARTNER_TOKEN`

The entrypoint to the example is in `src/index.ts`

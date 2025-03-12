import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import axios, { AxiosError } from "axios";
import https from "https";
import url from "url";

const agent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL certificate validation
});

dotenv.config();

const log = (...args: any[]) => {
  console.log("[HAPI Elements Examples][Backend Proxy]", ...args);
};

const app = express();
const PORT = process.env.PORT || 3001;

// CORS
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "*", // Allow all methods (GET, POST, PUT, DELETE, etc.)
    allowedHeaders: "*", // Allow all headers
  })
);

// Middleware
app.use(express.json());

// Routes

// Replace with your API path
const ourHAPIProxyPath = "/api/integrations/vonq";

app.all(`${ourHAPIProxyPath}/*`, async (req: Request, res: Response) => {
  try {
    // Parse the incoming request URL
    const parsedUrl = url.parse(req.originalUrl, true);

    // Replace HAPI_BACKEND_ENDPOINT env var with HAPI Backend base URL
    const vonqHAPIHostUrl =
      process.env.HAPI_BACKEND_ENDPOINT ||
      "https://marketplace.web-acceptance.vonq-aws.com";
    const vonqHAPIHostParsedUrl = url.parse(vonqHAPIHostUrl);

    const vonqHAPIPathUrl = parsedUrl.path?.replace(ourHAPIProxyPath, "");

    // Modify the parsed URL as needed
    const newUrl = vonqHAPIHostUrl + vonqHAPIPathUrl;

    // Create the options object to forward the request with the same method, headers, and data
    const options = {
      method: req.method, // Forward the same method (GET, POST, PUT, DELETE, etc.)
      url: newUrl, // Use the modified URL
      headers: {
        ...req.headers,
        Host: vonqHAPIHostParsedUrl.host,
      }, // Forward the same headers
      data: req.body, // Forward the same body if applicable (for POST, PUT, etc.)
      httpsAgent: agent, // Use the custom agent to bypass SSL validation
    };

    // Send the request to the external API
    const response = await axios(options);

    // log("response", response);

    // Forward the response from the external API to the client
    res.status(response.status).set(response.headers).send(response.data);
  } catch (error) {
    log("error", error);

    const axiosError = error as unknown as AxiosError;
    // Forward the error response (including status, headers, and body) as is
    if (axiosError.response) {
      // If the error contains a response, forward it to the client
      res
        .status(axiosError.response.status)
        .set(axiosError.response.headers)
        .send(axiosError.response.data);
    } else {
      // If there is no response (e.g., network error), send a generic error message
      res
        .status(500)
        .json({ message: "Error forwarding request to external API" });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

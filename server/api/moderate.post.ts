import { Configuration, OpenAIApi } from "openai";

// it's an async function now!
export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // setup the configuration
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // instantiate the openaiClient
    const openaiClient = new OpenAIApi(configuration);

    // Make the call to the moderation endpoint
    const res = await openaiClient.createModeration({
        input: body?.message,
    });

    // return the result
    return res.data;
});


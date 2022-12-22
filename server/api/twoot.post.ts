import { Configuration, OpenAIApi } from "openai";
interface ModerateResponse {
    id: string;
    model: string;
    results: ModerateResults[];
}

interface ModerateResults {
    categories: ModerateCategories;
    category_scores?: object;
    flagged?: boolean;
}

interface ModerateCategories {
    hate: boolean,
    ["hate/threatening"]: false,
    ["self-harm"]: false,
    sexual: false,
    ["sexual/minors"]: false,
    violence: false,
    ["violence/graphic"]: false
}

// it's an async function now!
export default defineEventHandler(async (event) => {
    const body: { message: string } = await readBody(event);

    const moderation: ModerateResponse = await $fetch("/api/moderate", {
        method: "post",
        body,
    });

    const result = moderation.results && moderation.results[0];
    const { message } = body;

    if (result?.flagged) {
        // Data is flagged, do not proceed
        const { categories } = result;

        const reasons = Object.keys(categories).reduce((acc: string[], cat: string) => {
            if (categories[cat]) acc = [...acc, cat];
            return acc;
        }, [])

        return (`The input '${message}' was flagged. Reasons: ${reasons.join(', ')}`)
    } else {
        // Post the data to the backend
        return `Data '${message}' was not flagged. 👌 Saving to database...`
    }
});


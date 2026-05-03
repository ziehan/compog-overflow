const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://compog-overflow.vercel.app";

const request = async (path, options) => {
    const response = await fetch(`${baseUrl}${path}`, options);
    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        const message = data && data.error ? data.error : "Request failed";
        throw new Error(message);
    }

    return data;
};

export const getQuestions = async () => {
    return request("/api/questions");
};

export const createQuestion = async (payload) => {
    return request("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
};

export const deleteQuestion = async (id) => {
    return request(`/api/questions/${id}`, { method: "DELETE" });
};

export const getQuestionDetail = async (id) => {
    return request(`/api/questions/${id}`);
};

export const createAnswer = async (id, payload) => {
    return request(`/api/questions/${id}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
};

export const deleteAnswer = async (id) => {
    return request(`/api/answers/${id}`, { method: "DELETE" });
};

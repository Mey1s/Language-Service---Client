export const fetchApi = async (url: string, method: string, body?: any) => {
    try {
        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body && JSON.stringify(body),
        });
        const data = await res.json();
        return data;
    }
    catch (err) {
        return {err};
    }
}
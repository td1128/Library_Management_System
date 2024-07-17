const addBook = async (req) => {
    const API_URL = import.meta.env.VITE_APP_API_URL;
    const ADMIN_PATH = import.meta.env.VITE_APP_ADMIN_PATH;

    const res = await fetch(`${API_URL}/${ADMIN_PATH}/book/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    });

    const data = await res.json();

    return data;
}

export default addBook;

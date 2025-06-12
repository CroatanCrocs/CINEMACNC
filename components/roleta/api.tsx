const SERVER = 'http://silence:8080/api/v1';
export async function fetchCurrentCategory() {
    const response = await fetch(SERVER + '/category/current', );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    return response.json();
}

export async function fetchCategories() {
    const response = await fetch(SERVER + '/category', );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    return response.json();
}

interface CurrentCategoryPayload {
    category_id: number;
    from_date: string;
    to_date: string;
}

export async function postCurrentCategory(payload: CurrentCategoryPayload) {
    const response = await fetch(`${SERVER}/category/current`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error('Failed to create current category');
    }

    return response.json();
}
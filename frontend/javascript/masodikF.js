document.addEventListener('DOMContentLoaded', () => {
    visit();
});

async function GetMethodFetch(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GET hiba: ${response.status} ( ${response.statusText} )`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`GET hiba: ${error.message}`);
    }
}

async function PostMethodFetch(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`POST hiba: ${response.status} ( ${response.statusText} )`);
        }
        console.log(data);
        return await response.json();
    } catch (error) {
        throw new Error(`POST hiba: ${error.message}`);
    }
}

async function visit() {
    try {
        const response = await PostMethodFetch('/api/visits');
        document.getElementById('visits').innerText = response.visits;
    } catch (error) {
        console.error(error);
    }
}

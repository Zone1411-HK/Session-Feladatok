document.addEventListener('DOMContentLoaded', () => {
    feladat2();
});
async function feladat2() {
    try {
        const response = await GetMethodFetch('api/lekerd');
        document.getElementById('bekezdes').innerText = response.adat;
        console.log(response.adat);
    } catch (error) {
        console.log(error);
    }
}
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

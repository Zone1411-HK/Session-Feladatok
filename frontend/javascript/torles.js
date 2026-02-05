document.addEventListener('DOMContentLoaded', () => {
    adjSzam();
    document.getElementById('deleteFavs').addEventListener('click', torol);
});
async function GET(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status + ' ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}
async function POST(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(response.status + ' ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

async function adjSzam() {
    const response = await GET('/api/kedvenc/lekeres');
    if (typeof response.adat != 'string') {
        document.getElementById('numOfFavs').innerText = response.adat.length;
    } else {
        document.getElementById('numOfFavs').innerText = 0;
    }
}

async function torol() {
    const response = await POST('/api/kedvenc/torles');
    alert('KI VAGY TÖRÖLVE KIS HAVER');
    document.getElementById('numOfFavs').innerText = 0;
}

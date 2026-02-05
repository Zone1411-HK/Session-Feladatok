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

document.addEventListener('DOMContentLoaded', () => {
    loadFavs();
});

async function loadFavs() {
    try {
        const response = await GET('/api/kedvenc/lekeres');
        if (typeof response.adat != 'string') {
            const ul = document.getElementById('favGyumolcsok');
            ul.replaceChildren();
            for (const ad of response.adat) {
                const li = document.createElement('li');
                li.innerText = ad;
                li.classList.add('list-group-item', 'list-group-item-primary');
                ul.appendChild(li);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

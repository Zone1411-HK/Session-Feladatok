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

document.addEventListener('DOMContentLoaded', () => {
    loadPage();
});

async function loadPage() {
    const response = await GetMethodFetch('/api/color');
    const p = document.getElementById('message');
    const body = document.getElementsByTagName('body')[0];
    console.log(response);
    if (response.success == 'Siker') {
        p.innerText = `Az oldal háttérszínét Ön választotta\n(${response.color})`;
        body.style.backgroundColor = response.color;
    } else {
        p.innerText = `Az oldal háttérszínét nem választotta ki`;
    }
}

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
    alertStats();
});

async function alertStats() {
    const response = await GetMethodFetch('/api/visits');
    if (response.success == 'Siker') {
        alert(`Ez a(z) 5. látogatásod ebben a munkamenetben`);
    } else {
        alert('Nem látogatta meg még az oldalt, vagy valami más hiba történt');
    }
}

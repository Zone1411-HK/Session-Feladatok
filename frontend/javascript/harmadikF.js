document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitColor').addEventListener('click', saveColor);
});

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

async function saveColor() {
    try {
        const color = document.getElementById('color').value;
        const response = await PostMethodFetch('/api/color', {
            color: color
        });
        if (response.success == 'Siker') {
            document.getElementById('valasz').innerText = response.success + ' ' + response.color;
        }
    } catch (error) {
        console.error(error);
    }
}

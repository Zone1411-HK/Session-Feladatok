document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('gyumolcsMentes').addEventListener('click', mentes);
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

async function mentes() {
    try {
        const checkboxes = document.getElementsByClassName('form-check-input');
        let gyumArr = [];
        for (const checkbox of checkboxes) {
            if (checkbox.checked) {
                gyumArr.push(checkbox.value);
            }
        }

        console.log(gyumArr);
        if (gyumArr.length == 0) {
            alert('NEM ADTÁL MEG GYÜMÖLCSÖT!');
        } else {
            const response = await POST('/api/kedvenc/mentes', {
                gyumolcsok: gyumArr
            });
            alert(response.success + ' ' + response.adat);
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * dynamic-lists.js - Dynamic List Loader for IKKSU Sorong Raya
 * Handles loading of KK members and Worship Schedule from JSON
 */

async function loadDynamicLists() {
    await Promise.all([
        loadKK() ,
        loadJadwal()
    ]);
}

async function loadKK() {
    const kkContainer = document.getElementById('kk-container');
    if (!kkContainer) return;

    try {
        const response = await fetch('kk.json');
        const parokiList = await response.json();

        kkContainer.innerHTML = ''; // Clear loading state

        parokiList.forEach(item => {
            const parokiCard = document.createElement('div');
            parokiCard.className = 'paroki-card';
            
            let membersListHtml = '';
            item.members.forEach(member => {
                membersListHtml += `<li>${member}</li>`;
            });

            parokiCard.innerHTML = `
                <h4>${item.paroki}</h4>
                <ol>
                    ${membersListHtml}
                </ol>
            `;

            kkContainer.appendChild(parokiCard);
        });

        // Register the parent container for reveal if necessary, 
        // though index.html already has 'reveal' on the section/directory div.
    } catch (error) {
        console.error('Error loading KK data:', error);
        kkContainer.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: var(--gorga-red);">Gagal memuat daftar KK. Silakan muat ulang halaman.</p>';
    }
}

async function loadJadwal() {
    const jadwalBody = document.getElementById('jadwal-body');
    if (!jadwalBody) return;

    try {
        const response = await fetch('jadwal.json');
        const schedule = await response.json();

        jadwalBody.innerHTML = ''; // Clear loading state

        schedule.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.no}</td>
                <td>${item.pemimpin}</td>
                <td>${item.waktu}</td>
                <td>${item.lokasi}</td>
            `;
            jadwalBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error loading schedule:', error);
        jadwalBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color: var(--gorga-red);">Gagal memuat jadwal.</td></tr>';
    }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadDynamicLists);

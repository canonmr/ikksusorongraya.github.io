/**
 * gallery.js - Dynamic Gallery Loader for IKKSU Sorong Raya
 */

async function loadGallery() {
    const galleryContainer = document.getElementById('dynamic-gallery');
    if (!galleryContainer) return;

    try {
        const response = await fetch('albums.json');
        const albums = await response.json();

        galleryContainer.innerHTML = ''; // Clear existing content

        for (const album of albums) {
            const albumCard = await createAlbumCard(album);
            galleryContainer.appendChild(albumCard);
            
            // Register with scroll reveal observer if available
            if (window.revealObserver) {
                window.revealObserver.observe(albumCard);
            }
        }
    } catch (error) {
        console.error('Error loading albums:', error);
        galleryContainer.innerHTML = '<p class="error-msg">Gagal memuat galeri. Silakan coba lagi nanti.</p>';
    }
}

async function createAlbumCard(album) {
    // Fetch readme.txt to get Name and Link
    let albumName = album.id;
    let albumLink = '#';
    let albumDesc = '';

    const encodedPath = encodeURI(album.path);

    try {
        const res = await fetch(`${encodedPath}readme.txt`);
        const text = await res.text();
        
        const nameMatch = text.match(/Album Name:\s*(.*)/i);
        const linkMatch = text.match(/Link:\s*(.*)/i);
        const descMatch = text.match(/Description:\s*(.*)/i);

        if (nameMatch) albumName = nameMatch[1].trim();
        if (linkMatch) albumLink = linkMatch[1].trim();
        if (descMatch) albumDesc = descMatch[1].trim();
    } catch (e) {
        console.warn(`Could not load readme.txt for ${album.id}`);
    }

    const card = document.createElement('div');
    card.className = 'album-card reveal';

    // Create Highlights Grid
    let highlightsHtml = '';
    album.highlights.forEach(img => {
        highlightsHtml += `
            <div class="highlight-item">
                <img src="${encodedPath}${encodeURI(img)}" alt="${albumName}" loading="lazy">
            </div>
        `;
    });

    card.innerHTML = `
        <div class="album-content">
            <div class="album-header">
                <h3>${albumName}</h3>
                <p>${albumDesc}</p>
            </div>
            <div class="highlights-grid">
                ${highlightsHtml}
            </div>
            <div class="album-footer">
                <a href="${albumLink}" target="_blank" class="btn-album">
                    Lihat Album Lengkap (Google Photos)
                    <svg viewBox="0 0 24 24" width="18" height="18"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </a>
            </div>
        </div>
    `;

    return card;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', loadGallery);

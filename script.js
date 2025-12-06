// --------------------------
// CONFIGURACIÓN
// --------------------------
const totalPages = 6;   // ← CAMBIA ESTO AL TOTAL DE PNGs
// --------------------------

let currentPage = 1;

const img = document.getElementById("pageImage");
const indicator = document.getElementById("pageIndicator");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const expandBtn = document.getElementById("expandBtn");

function updatePage() {
    const pageStr = String(currentPage).padStart(2, "0"); // 01, 02, 03…
    img.src = `paginas/${pageStr}.png`;
    indicator.textContent = `Página ${currentPage} / ${totalPages}`;
}

prevBtn.onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        updatePage();
    }
};

nextBtn.onclick = () => {
    if (currentPage < totalPages) {
        currentPage++;
        updatePage();
    }
};

expandBtn.onclick = () => {
    img.requestFullscreen();
};

// Inicializar
updatePage();

// --------------------------
// CONFIGURACIÓN
// --------------------------
const totalPages = 6;   // ← CAMBIA ESTO
// --------------------------

let currentPage = 2;

const img = document.getElementById("pageImage");
const indicator = document.getElementById("pageIndicator");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const expandBtn = document.getElementById("expandBtn");

function updatePage() {
    img.src = `${currentPage}.png`;
    indicator.textContent = `Página ${currentPage} / ${totalPages}`;
}

prevBtn.onclick = () => {
    if (currentPage > 2) {
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


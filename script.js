// -------------------------
// CONFIGURACIÓN
// -------------------------
const startPage = 2;
const endPage = 7;

const coverPage = 2;
let currentPage = coverPage;

// Elementos
const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");
const indicator = document.getElementById("pageIndicator");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const expandBtn = document.getElementById("expandBtn");

// -------------------------
// ACTUALIZAR PÁGINAS
// -------------------------
function updatePages() {

    if (currentPage === coverPage) {
        // SOLO LA PORTADA
        leftPage.classList.add("hidden");
        rightPage.classList.remove("hidden");

        rightPage.src = `${coverPage}.png`;

        indicator.textContent = `Página 1 / ${endPage - startPage + 1}`;
        return;
    }

    // DOBLE PÁGINA
    leftPage.classList.remove("hidden");
    rightPage.classList.remove("hidden");

    // Página izquierda
    leftPage.src = `${currentPage}.png`;

    // Página derecha
    let next = currentPage + 1;

    if (next <= endPage) {
        rightPage.src = `${next}.png`;
        rightPage.classList.remove("hidden");
    } else {
        // si no existe página derecha
        rightPage.classList.add("hidden");
    }

    let visualIndex = currentPage - startPage + 1;
    indicator.textContent = `Página ${visualIndex} / ${endPage - startPage + 1}`;
}

// -------------------------
// NAVEGACIÓN
// -------------------------
function goPrev() {

    if (currentPage === coverPage) return;

    if (currentPage === 3) {
        currentPage = coverPage;
        updatePages();
        return;
    }

    currentPage -= 2;
    if (currentPage < 3) currentPage = 3;

    updatePages();
}

function goNext() {

    if (currentPage === coverPage) {
        currentPage = 3;   // Después de portada → páginas 3–4
        updatePages();
        return;
    }

    let next = currentPage + 2;

    if (next <= endPage) {
        currentPage = next;
    } else {
        currentPage = endPage; // última página sola
    }

    updatePages();
}

// Botones
prevBtn.onclick = goPrev;
nextBtn.onclick = goNext;

// Pantalla completa
expandBtn.onclick = () => {
    document.documentElement.requestFullscreen();
};

// Clic en la pantalla
document.addEventListener("click", (e) => {
    const mid = window.innerWidth / 2;
    if (e.clientX < mid) goPrev();
    else goNext();
});

// Flechas del teclado
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
});

// Inicializar
updatePages();



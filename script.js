// -------------------------
// CONFIGURACIÓN
// -------------------------
const startPage = 2;
const endPage = 7;

// La portada es la página 2
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
        // Mostrar solo portada
        leftPage.classList.add("hidden");
        rightPage.classList.remove("hidden");

        rightPage.src = `${coverPage}.png`;
        indicator.textContent = `Página 1 / ${endPage - startPage + 1}`;
        return;
    }

    // Mostrar dos páginas
    leftPage.classList.remove("hidden");
    rightPage.classList.remove("hidden");

    // Página izquierda (impar)
    leftPage.src = `${currentPage}.png`;

    // Página derecha (siguiente)
    const next = currentPage + 1;
    rightPage.src = next <= endPage ? `${next}.png` : "";

    const numShown = currentPage - startPage + 1;
    indicator.textContent = `Página ${numShown} - ${numShown + 1} / ${endPage - startPage + 1}`;
}

// -------------------------
// NAVEGACIÓN
// -------------------------
function goPrev() {
    if (currentPage === coverPage) return;

    if (currentPage > startPage) {
        currentPage -= 2;
        if (currentPage < startPage) currentPage = startPage;
        updatePages();
    }
}

function goNext() {
    let next = currentPage === coverPage ? currentPage + 1 : currentPage + 2;

    if (next <= endPage) {
        currentPage = next;
        updatePages();
    }
}

prevBtn.onclick = goPrev;
nextBtn.onclick = goNext;

// Pantalla completa
expandBtn.onclick = () => {
    document.documentElement.requestFullscreen();
};

// -------------------------
// CLIC EN LADOS DE LA PANTALLA
// -------------------------
document.addEventListener("click", (e) => {
    const mid = window.innerWidth / 2;
    if (e.clientX < mid) goPrev();
    else goNext();
});

// -------------------------
// FLECHAS DEL TECLADO
// -------------------------
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
});

// Inicializar
updatePages();



// -------------------------
// CONFIGURACIÓN
// -------------------------
const startPage = 2;
const endPage = 7;
const coverPage = 2;
let currentPage = coverPage;

// Elementos (comprobación segura)
const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");
const indicator = document.getElementById("pageIndicator");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const expandBtn = document.getElementById("expandBtn");
const pageWrapper = document.getElementById("pageWrapper");

// Si falta algo, detenemos y mostramos en consola para depurar
if (!leftPage || !rightPage || !indicator || !prevBtn || !nextBtn || !expandBtn) {
    console.error("Falta algún elemento HTML. Asegúrate de que index.html tenga los IDs: leftPage, rightPage, pageIndicator, prevBtn, nextBtn, expandBtn");
}

// -------------------------
// FUNCIONES DE ACTUALIZACIÓN
// -------------------------
function updatePages() {
    // Seguridad: si faltan elementos, salir
    if (!leftPage || !rightPage || !indicator) return;

    if (currentPage === coverPage) {
        // PORTADA sola (solo rightPage visible)
        leftPage.classList.add("hidden");
        rightPage.classList.remove("hidden");
        rightPage.src = `${coverPage}.png`;
        indicator.textContent = `Página 1 / ${endPage - startPage + 1}`;
        return;
    }

    // DOBLE PÁGINA
    leftPage.classList.remove("hidden");
    rightPage.classList.remove("hidden");

    leftPage.src = `${currentPage}.png`;

    const next = currentPage + 1;
    if (next <= endPage) {
        rightPage.src = `${next}.png`;
        rightPage.classList.remove("hidden");
    } else {
        rightPage.classList.add("hidden");
    }

    // Indicador: número visual de spreads (1 = portada, 2 = 3-4, etc.)
    const visualIndex = currentPage - startPage + 1;
    const totalVisual = endPage - startPage + 1;
    indicator.textContent = `Página ${visualIndex} / ${totalVisual}`;
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
        currentPage = 3;
        updatePages();
        return;
    }

    // Avanzar 2 en 2: 3 -> 5 -> 7
    const candidate = currentPage + 2;
    if (candidate <= endPage) currentPage = candidate;
    else currentPage = endPage; // última página suelta si es impar
    updatePages();
}

// -------------------------
// EVENTOS BOTONES (detener propagación)
// -------------------------
if (prevBtn) {
    prevBtn.addEventListener("click", (ev) => {
        ev.stopPropagation(); // evita el listener global de document
        goPrev();
    });
}
if (nextBtn) {
    nextBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        goNext();
    });
}
if (expandBtn) {
    expandBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        // fullscreen del documento (mejor que solo la imagen)
        if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
    });
}

// -------------------------
// CLIC EN LA PANTALLA (solo si no clickeaste un control)
// -------------------------
document.addEventListener("click", (e) => {
    // Si el click fue sobre un botón o dentro de pageWrapper, permitimos la lógica:
    // Como ya usamos stopPropagation en botones, aquí solo recibimos clicks fuera de botones.
    const mid = window.innerWidth / 2;
    if (e.clientX < mid) goPrev();
    else goNext();
}, false);

// -------------------------
// TECLAS DEL TECLADO
// -------------------------
document.addEventListener("keydown", (e) => {
    // evitar cuando el usuario escribe en un input
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
    }
});

// -------------------------
// SWIPE TÁCTIL (móvil)
// -------------------------
let touchStartX = null;
let touchStartY = null;

document.addEventListener("touchstart", (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, {passive: true});

document.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const touchEndX = (e.changedTouches && e.changedTouches[0].clientX) || 0;
    const touchEndY = (e.changedTouches && e.changedTouches[0].clientY) || 0;
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;

    // filtrar gestos mayoritariamente horizontales
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) goPrev(); // swipe right = ir atrás
        else goNext();        // swipe left = ir adelante
    }

    touchStartX = null;
    touchStartY = null;
}, {passive: true});

// -------------------------
// INICIALIZAR
// -------------------------
updatePages();




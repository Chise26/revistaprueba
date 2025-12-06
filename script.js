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
const pageWrapper = document.getElementById("pageWrapper");

// Seguridad: avisar si falta algo
if (!leftPage || !rightPage || !indicator || !prevBtn || !nextBtn || !expandBtn || !pageWrapper) {
    console.error("Falta algún elemento. IDs requeridos: leftPage, rightPage, pageIndicator, prevBtn, nextBtn, expandBtn, pageWrapper");
}

// -------------------------
// ACTUALIZAR VISOR
// -------------------------
function updatePages() {
    if (!leftPage || !rightPage || !indicator) return;

    if (currentPage === coverPage) {
        // Mostrar sólo portada (right)
        leftPage.classList.add("hidden");
        rightPage.classList.remove("hidden");
        rightPage.src = `${coverPage}.png`;
        indicator.textContent = `Página 1 / ${endPage - startPage + 1}`;
        return;
    }

    // Mostrar spread (dos páginas)
    leftPage.classList.remove("hidden");
    rightPage.classList.remove("hidden");

    leftPage.src = `${currentPage}.png`;
    const rightNum = currentPage + 1;
    if (rightNum <= endPage) {
        rightPage.src = `${rightNum}.png`;
        rightPage.classList.remove("hidden");
    } else {
        rightPage.classList.add("hidden");
    }

    const visualIndex = currentPage - startPage + 1; // 1-based visual
    const totalVisual = endPage - startPage + 1;
    indicator.textContent = `Página ${visualIndex} / ${totalVisual}`;
}

// -------------------------
// NAVEGACIÓN LÓGICA
// -------------------------
function goPrev() {
    if (currentPage === coverPage) return;

    if (currentPage === 3) {
        // 3-4 -> volver a portada
        currentPage = coverPage;
    } else {
        // resto: retroceder 2 páginas
        currentPage = Math.max(3, currentPage - 2);
    }
    updatePages();
}

function goNext() {
    if (currentPage === coverPage) {
        currentPage = 3; // portada -> primera spread 3-4
    } else {
        const candidate = currentPage + 2;
        if (candidate <= endPage) currentPage = candidate;
        else currentPage = endPage; // última impar sola
    }
    updatePages();
}

// -------------------------
// BOTONES (evitar propagación al contenedor)
// -------------------------
if (prevBtn) prevBtn.addEventListener("click", (ev) => { ev.stopPropagation(); goPrev(); });
if (nextBtn) nextBtn.addEventListener("click", (ev) => { ev.stopPropagation(); goNext(); });
if (expandBtn) expandBtn.addEventListener("click", (ev) => {
    ev.stopPropagation();

    // entrar a fullscreen del contenedor de imágenes
    if (!document.fullscreenElement) {
        pageWrapper.requestFullscreen?.();
    } else {
        document.exitFullscreen?.();
    }
});

// -------------------------
// CLIC EN EL VISOR (pageWrapper) — evita usar document
// -------------------------
if (pageWrapper) {
    pageWrapper.addEventListener("click", (e) => {
        // calcular click relativo al contenedor (más preciso en layouts responsivos)
        const rect = pageWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width / 2) goPrev();
        else goNext();
    });
}

// -------------------------
// TECLAS
// -------------------------
document.addEventListener("keydown", (e) => {
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
// SWIPE (sólo en el contenedor)
// -------------------------
let touchStartX = null;
let touchStartY = null;

if (pageWrapper) {
    pageWrapper.addEventListener("touchstart", (e) => {
        if (!e.touches || e.touches.length === 0) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, {passive: true});

    pageWrapper.addEventListener("touchend", (e) => {
        if (touchStartX === null) return;
        const touchEndX = (e.changedTouches && e.changedTouches[0].clientX) || 0;
        const touchEndY = (e.changedTouches && e.changedTouches[0].clientY) || 0;
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;

        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) goPrev();
            else goNext();
        }

        touchStartX = null;
        touchStartY = null;
    }, {passive: true});
}

// -------------------------
// INICIALIZAR
// -------------------------
updatePages();





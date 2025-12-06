const startPage = 2;
const endPage = 7;

let currentPage = startPage;

const img = document.getElementById("pageImage");
const indicator = document.getElementById("pageIndicator");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const expandBtn = document.getElementById("expandBtn");

function updatePage() {
    img.src = `${currentPage}.png`;
    indicator.textContent = `Página ${currentPage - startPage + 1} / ${endPage - startPage + 1}`;
}

function goPrev() {
    if (currentPage > startPage) {
        currentPage--;
        updatePage();
    }
}

function goNext() {
    if (currentPage < endPage) {
        currentPage++;
        updatePage();
    }
}

// ------------------------------
// CONTROLES BOTONES
// ------------------------------
prevBtn.onclick = goPrev;
nextBtn.onclick = goNext;

// Pantalla completa
expandBtn.onclick = () => {
    img.requestFullscreen();
};

// ------------------------------
// 1) NAVEGACIÓN CON TECLADO
// ------------------------------
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        goPrev();
    } else if (e.key === "ArrowRight") {
        goNext();
    }
});

// ------------------------------
// 2) NAVEGACIÓN HACIENDO CLICK EN LA IMAGEN
//    - click izquierdo → avanzar
//    - click en lado izquierdo → retroceder
// ------------------------------
img.addEventListener("click", (e) => {
    const x = e.clientX;

    if (x < window.innerWidth / 2) {
        // Clic en la mitad izquierda
        goPrev();
    } else {
        // Clic en la mitad derecha
        goNext();
    }
});

// Inicializar
updatePage();

};
updatePage();


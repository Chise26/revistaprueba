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

prevBtn.onclick = () => {
    if (currentPage > startPage) {
        currentPage--;
        updatePage();
    }
};

nextBtn.onclick = () => {
    if (currentPage < endPage) {
        currentPage++;
        updatePage();
    }
};

expandBtn.onclick = () => {
    img.requestFullscreen();
};
updatePage();


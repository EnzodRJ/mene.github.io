const images = document.querySelector('.carousel-images');
const imageCount = images.children.length;
let currentIndex = 0;

function updateCarousel() {
    images.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imageCount) % imageCount;
    updateCarousel();
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imageCount;
    updateCarousel();
});

function showDetailedText(imageIndex) {
    const detailedText = document.getElementById('detailed-text');
    let content = '';

    switch (imageIndex) {
        case 1:
            content = `
                <h2>Caneta Azul - Letra</h2>
                <p>Os leucócitos, também conhecidos como glóbulos brancos, são as células responsáveis por defender o organismo contra infecções, doenças, alergias e resfriados, sendo parte da imunidade de cada pessoa. Essas células são transportadas no sangue para serem utilizadas sempre que um vírus, uma bactéria, ou qualquer outro organismo estranho entra no corpo humano, eliminando-os e impedindo que provoquem problemas de saúde </p>
                <iframe src="https://www.youtube.com/embed/2P_esm8cNgU" title="YouTube video player" allowfullscreen></iframe>
            `;
            break;
        case 2:
            content = `
                <h2>Olha, Se Você Não Me Ama</h2>
                <p>Os leucócitos, também conhecidos como glóbulos brancos, são as células responsáveis por defender o organismo contra infecções, doenças, alergias e resfriados, sendo parte da imunidade de cada pessoa. Essas células são transportadas no sangue para serem utilizadas sempre que um vírus, uma bactéria, ou qualquer outro organismo estranho entra no corpo humano, eliminando-os e impedindo que provoquem problemas de saúde</p>
                <iframe src="https://www.youtube.com/embed/F09qaP7eEWc" title="YouTube video player" allowfullscreen></iframe>
            `;
            break;
        case 3:
            content = `
                <h2>Parabéns</h2>
                <p>Os leucócitos, também conhecidos como glóbulos brancos, são as células responsáveis por defender o organismo contra infecções, doenças, alergias e resfriados, sendo parte da imunidade de cada pessoa. Essas células são transportadas no sangue para serem utilizadas sempre que um vírus, uma bactéria, ou qualquer outro organismo estranho entra no corpo humano, eliminando-os e impedindo que provoquem problemas de saúde</p>
                <iframe src="https://www.youtube.com/embed/ZRFT2lWBJJg" title="YouTube video player" allowfullscreen></iframe>
            `;
            break;
    }

    detailedText.innerHTML = content;
    detailedText.style.display = 'block';
}

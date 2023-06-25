const carousel = document.querySelector('.carousel');
const carouselItems = carousel.querySelector('.carousel-items');
const prevBtn = carousel.querySelector('.prev');
const nextBtn = carousel.querySelector('.next');

let currentIndex = 0;
let intervalId;

function moveToNextSlide() {
  currentIndex++;
  if (currentIndex >= carouselItems.children.length) {
    currentIndex = 0;
  }
  updateSlidePosition();
}

function updateSlidePosition() {
  const slideWidth = carouselItems.children[0].offsetWidth;
  carouselItems.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function startAutoPlay() {
  intervalId = setInterval(moveToNextSlide, 3000);
}

function stopAutoPlay() {
  clearInterval(intervalId);
}

prevBtn.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = carouselItems.children.length - 1;
  }
  updateSlidePosition();
  stopAutoPlay();
});

nextBtn.addEventListener('click', () => {
  moveToNextSlide();
  stopAutoPlay();
});

startAutoPlay();

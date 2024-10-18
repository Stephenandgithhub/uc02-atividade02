//Flip card

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.remove('flipped');

        card.classList.add('flipped');
  });
});

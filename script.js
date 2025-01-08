const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');
const main = document.querySelector('main');

updateBigCup();

// Add event listeners to each cup
smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => toggleHighlightCups(idx));
});

function toggleHighlightCups(idx) {
    if (smallCups[idx].classList.contains('full') &&
        (!smallCups[idx + 1] || !smallCups[idx + 1].classList.contains('full'))) {
        idx--;
    }

    smallCups.forEach((cup, idx2) => {
        cup.classList.toggle('full', idx2 <= idx);
    });

    updateBigCup();
}

function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length;
    const totalCups = smallCups.length;

    if (fullCups === 0) {
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
    } else {
        percentage.style.visibility = 'visible';
        percentage.style.height = `${(fullCups / totalCups) * 330}px`;
        percentage.innerText = `${(fullCups / totalCups) * 100}%`;
    }

    if (fullCups === totalCups) {
        remained.style.visibility = 'hidden';
        remained.style.height = 0;

        // Show congratulations message
        showCongratulations();
    } else {
        remained.style.visibility = 'visible';
        liters.innerText = `${(2 - (fullCups * 0.25)).toFixed(2)}L`;
    }
}

function showCongratulations() {
    const congratsMessage = document.createElement('div');
    congratsMessage.className = 'congratulations';
    congratsMessage.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You’ve reached your daily water intake goal! 🎉</p>
    `;
    main.appendChild(congratsMessage);

    // Optional: Auto-hide the message after a few seconds
    setTimeout(() => {
        congratsMessage.remove();
    }, 5000);
}

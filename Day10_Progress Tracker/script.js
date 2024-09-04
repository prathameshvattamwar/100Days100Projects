const progressBar = document.getElementById('progress-bar');
const steps = document.querySelectorAll('.step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentStep = 1;

nextBtn.addEventListener('click', () => {
    currentStep++;
    if (currentStep > steps.length) {
        currentStep = steps.length;
    }
    updateProgress();
});

prevBtn.addEventListener('click', () => {
    currentStep--;
    if (currentStep < 1) {
        currentStep = 1;
    }
    updateProgress();
});

function updateProgress() {
    steps.forEach((step, idx) => {
        if (idx < currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    progressBar.style.width = ((currentStep - 1) / (steps.length - 1)) * 100 + '%';

    if (currentStep === 1) {
        prevBtn.disabled = true;
    } else if (currentStep === steps.length) {
        nextBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
}

updateProgress();

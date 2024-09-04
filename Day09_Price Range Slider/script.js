document.addEventListener('DOMContentLoaded', function() {
    const rangeMin = document.getElementById('rangeMin');
    const rangeMax = document.getElementById('rangeMax');
    const minValueDisplay = document.getElementById('minValue');
    const maxValueDisplay = document.getElementById('maxValue');
    const minValueTooltip = document.getElementById('minValueTooltip');
    const maxValueTooltip = document.getElementById('maxValueTooltip');
    const slider = document.querySelector('.slider');

    function updateSlider() {
        const min = parseInt(rangeMin.value);
        const max = parseInt(rangeMax.value);

        if (min > max - 10) {
            rangeMin.value = max - 10;
        }
        if (max < min + 10) {
            rangeMax.value = min + 10;
        }

        minValueDisplay.textContent = `₹${rangeMin.value}`;
        maxValueDisplay.textContent = `₹${rangeMax.value}`;
        minValueTooltip.textContent = `₹${rangeMin.value}`;
        maxValueTooltip.textContent = `₹${rangeMax.value}`;

        const minPercent = (rangeMin.value / rangeMin.max) * 100;
        const maxPercent = (rangeMax.value / rangeMax.max) * 100;

        slider.querySelector('.range-highlight').style.left = `${minPercent}%`;
        slider.querySelector('.range-highlight').style.width = `${maxPercent - minPercent}%`;

        minValueTooltip.style.left = `${minPercent}%`;
        maxValueTooltip.style.left = `${maxPercent}%`;

        // Adjust tooltip positions to stay above the slider
        const minTooltipOffset = 40;
        const maxTooltipOffset = 40;

        minValueTooltip.style.top = `-${minTooltipOffset}px`;
        maxValueTooltip.style.top = `-${maxTooltipOffset}px`;
    }

    rangeMin.addEventListener('input', updateSlider);
    rangeMax.addEventListener('input', updateSlider);

    // Initial call to set the range highlight and tooltips
    updateSlider();
});

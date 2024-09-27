const itemsPerPage = 10;
const totalItems = 100;
const totalPages = Math.ceil(totalItems / itemsPerPage);
let currentPage = 1;

// Generate sample data
const data = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);

function renderContent(page) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear previous content

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const rows = data.slice(start, end).map((item, index) => {
        return `
            <tr>
                <td>${start + index + 1}</td>
                <td>${item}</td>
            </tr>
        `;
    });

    content.innerHTML = rows.join('');
}

function renderPagination() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const pageNumbers = document.getElementById('pageNumbers');

    // Disable/Enable Previous and Next buttons
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Clear page numbers before re-rendering
    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.onclick = () => changePage(i);
        pageNumbers.appendChild(pageButton);
    }
}

function changePage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderContent(page);
    renderPagination();
}

document.addEventListener('DOMContentLoaded', () => {
    renderContent(currentPage);
    renderPagination();

    // Add event listeners for previous and next buttons
    document.getElementById('prevButton').addEventListener('click', () => changePage(currentPage - 1));
    document.getElementById('nextButton').addEventListener('click', () => changePage(currentPage + 1));
});

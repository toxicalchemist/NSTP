// Function to Open Modal
function openModal(title, description, imageSrc) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('productModal').style.display = 'flex';
}

// Function to Close Modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Close Modal on Clicking Outside
window.onclick = function(event) {
    let modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
}

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const placesContainer = document.getElementById('placesContainer');

    // Add dynamic places input
    placesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-place-btn')) {
            const count = placesContainer.querySelectorAll('.place-input').length + 1;
            const newGroup = document.createElement('div');
            newGroup.className = 'input-group mb-2';
            newGroup.innerHTML = `
                <input type="text" class="form-control place-input" placeholder="Place ${count}" required>
                <button type="button" class="btn btn-danger remove-place-btn">-</button>
            `;
            placesContainer.appendChild(newGroup);
        }
        if (e.target.classList.contains('remove-place-btn')) {
            e.target.parentElement.remove();
        }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Regex validation
        const nameRegex = /^[a-zA-Z ]{2,}$/;
        const locationRegex = /^[a-zA-Z0-9 ,.-]{2,}$/;

        const travellerName = document.getElementById('travellerName').value.trim();
        const dateOfTravel = document.getElementById('dateOfTravel').value;
        const pickupLocation = document.getElementById('pickupLocation').value.trim();
        const destination = document.getElementById('destination').value.trim();
        const numPersons = document.getElementById('numPersons').value;
        const termsAccepted = document.getElementById('terms').checked;
        const placeInputs = document.querySelectorAll('.place-input');
        const placesToVisit = [...placeInputs].map(input => input.value.trim());

        // Validate fields
        if (!nameRegex.test(travellerName)) {
            alert('Please enter a valid name (only letters and spaces).');
            return;
        }
        if (!locationRegex.test(pickupLocation) || !locationRegex.test(destination)) {
            alert('Please enter valid locations (letters, numbers, commas, dots, hyphens).');
            return;
        }
        if (placesToVisit.some(place => !locationRegex.test(place))) {
            alert('Please enter valid place names.');
            return;
        }
        if (!termsAccepted) {
            alert('You must accept the Terms and Conditions.');
            return;
        }

        // Prepare data
        const bookingData = {
            travellerName,
            dateOfTravel,
            pickupLocation,
            destination,
            placesToVisit,
            numPersons
        };

        // Save to sessionStorage
        sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

        // Redirect
        window.location.href = 'success.html';
    });
});

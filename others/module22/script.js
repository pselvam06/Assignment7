// script.js - Enhanced with Regex Validation and REST Operator

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  initFormValidation();
  initDynamicFields();
  initModalFunctionality();
  initSmoothScrolling();
  initFormSubmissionHandlers();
});

// FORM VALIDATION WITH REGEX
const validationPatterns = {
  name: /^[a-zA-Z\u00C0-\u017F\s']{2,50}$/, // Allows letters, accents, spaces, apostrophes
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Standard email format
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, // International phone format
  date: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD format
  destination: /.+/, // At least one character
  persons: /^[1-9][0-9]?$|^20$/, // 1-20
  message: /^[\s\S]{10,500}$/ // 10-500 characters
};

function initFormValidation() {
  // Booking Form Validation
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(event) {
      if (!validateBookingForm()) {
        event.preventDefault();
        event.stopPropagation();
      }
      bookingForm.classList.add('was-validated');
    });

    // Add real-time validation feedback
    addLiveValidation(bookingForm);
  }

  // Contact Form Validation
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      if (!validateContactForm()) {
        event.preventDefault();
        event.stopPropagation();
      }
      contactForm.classList.add('was-validated');
    });

    // Add real-time validation feedback
    addLiveValidation(contactForm);
  }
}

function addLiveValidation(form) {
  // Add input event listeners for real-time validation
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', function() {
      validateField(this);
    });
    
    // Validate on blur (when user leaves the field)
    field.addEventListener('blur', function() {
      validateField(this);
    });
  });
}

function validateField(field) {
  const fieldId = field.id || field.name;
  const value = field.value.trim();
  const form = field.closest('form');

  // Skip validation for non-required fields that are empty
  if (!field.required && value === '') {
    field.setCustomValidity('');
    return true;
  }

  // Special handling for checkboxes
  if (field.type === 'checkbox') {
    if (!field.checked) {
      field.setCustomValidity('You must agree to the terms and conditions');
      return false;
    }
    field.setCustomValidity('');
    return true;
  }

  // Validate based on field type/ID
  if (fieldId in validationPatterns) {
    if (!validationPatterns[fieldId].test(value)) {
      let errorMessage = getErrorMessage(fieldId, value);
      field.setCustomValidity(errorMessage);
      return false;
    }
  } else if (field.required && value === '') {
    field.setCustomValidity('This field is required');
    return false;
  }

  field.setCustomValidity('');
  return true;
}

function getErrorMessage(fieldId, value) {
  switch(fieldId) {
    case 'name':
      return 'Please enter a valid name (2-50 letters)';
    case 'email':
      return 'Please enter a valid email address';
    case 'phone':
      return 'Please enter a valid phone number';
    case 'date':
      return 'Please select a valid date';
    case 'destination':
      return 'Please select a destination';
    case 'persons':
      return 'Please enter a number between 1-20';
    case 'message':
      return 'Message must be 10-500 characters';
    default:
      return 'Invalid input';
  }
}

function validateBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return false;

  let isValid = true;
  const requiredFields = ['name', 'email', 'phone', 'date', 'destination', 'persons', 'terms'];

  requiredFields.forEach(fieldId => {
    const field = form.querySelector(`#${fieldId}`) || form.querySelector(`[name="${fieldId}"]`);
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

function validateContactForm() {
  const form = document.querySelector('#contact form');
  if (!form) return false;

  let isValid = true;
  const requiredFields = ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'];

  requiredFields.forEach(fieldId => {
    const field = form.querySelector(`#${fieldId}`);
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

// DYNAMIC FORM FIELD MANAGEMENT WITH REST OPERATOR
function initDynamicFields() {
  const placesContainer = document.getElementById('placesContainer');
  if (!placesContainer) return;

  // Add event listener for existing "Add" buttons
  document.querySelectorAll('.add-place').forEach(button => {
    button.addEventListener('click', addPlaceField);
  });

  // Delegate event for dynamically added "Remove" buttons
  placesContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-place')) {
      removePlaceField(e.target.closest('.input-group'));
    } else if (e.target.parentElement.classList.contains('remove-place')) {
      removePlaceField(e.target.parentElement.closest('.input-group'));
    }
  });
}

function addPlaceField() {
  const container = document.getElementById('placesContainer');
  const newInput = document.createElement('div');
  newInput.className = 'input-group mb-2';
  newInput.innerHTML = `
    <input type="text" class="form-control" name="places[]" placeholder="Place to visit" 
           pattern="^[a-zA-Z\u00C0-\u017F\s,'-]{3,50}$" 
           title="Please enter a valid place name (3-50 characters)">
    <button class="btn btn-outline-danger remove-place" type="button">
      <i class="fas fa-minus"></i>
    </button>
  `;
  container.appendChild(newInput);
}

function removePlaceField(fieldGroup) {
  const container = document.getElementById('placesContainer');
  if (container.children.length > 1) {
    container.removeChild(fieldGroup);
  }
}

// Collect all places using REST operator
function getAllPlaces() {
  const placesInputs = [...document.querySelectorAll('input[name="places[]"]')];
  return placesInputs.map(input => input.value.trim()).filter(place => place !== '');
}

// MODAL FUNCTIONALITY
function initModalFunctionality() {
  const termsModal = document.getElementById('termsModal');
  if (termsModal) {
    termsModal.addEventListener('show.bs.modal', function(event) {
      // Custom logic when modal shows
    });
  }

  document.querySelectorAll('[data-bs-dismiss="modal"]').forEach(button => {
    button.addEventListener('click', function() {
      const modal = bootstrap.Modal.getInstance(button.closest('.modal'));
      if (modal) modal.hide();
    });
  });
}

// SMOOTH SCROLLING
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, null, targetId);
      }
    });
  });
}

// FORM SUBMISSION WITH REST OPERATOR FOR DYNAMIC FIELDS
function initFormSubmissionHandlers() {
  handleFormSubmission('bookingForm', 'Thank you for your booking request! We will contact you shortly.');
  handleFormSubmission('contactForm', 'Thank you for your message! We will get back to you soon.');
}

function handleFormSubmission(formId, successMessage) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm(form)) return;

    // Prepare form data, including dynamic fields
    const formData = prepareFormData(form);
    
    // Simulate AJAX submission (replace with actual fetch/axios call)
    simulateSubmission(formData)
      .then(() => {
        showSuccessMessage(successMessage);
        form.reset();
        form.classList.remove('was-validated');
      })
      .catch(error => {
        showErrorMessage('Submission failed. Please try again.');
        console.error('Form submission error:', error);
      });
  });
}

function validateForm(form) {
  let isValid = true;
  form.querySelectorAll('input, textarea, select').forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  return isValid;
}

function prepareFormData(form) {
  const formData = new FormData(form);
  
  // For booking form, collect all places using REST operator
  if (form.id === 'bookingForm') {
    const places = getAllPlaces();
    formData.delete('places[]'); // Remove individual place fields
    places.forEach((place, index) => {
      formData.append(`places[${index}]`, place);
    });
  }
  
  return Object.fromEntries(formData.entries());
}

function simulateSubmission(formData) {
  console.log('Form data to be submitted:', formData);
  return new Promise((resolve) => {
    setTimeout(resolve, 1000); // Simulate network delay
  });
}

function showSuccessMessage(message) {
  // In a real app, you might use a toast or modal instead of alert
  alert(message);
}

function showErrorMessage(message) {
  alert(message);
}


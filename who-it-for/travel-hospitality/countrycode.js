const countryData = [
  { name: "Afghanistan", code: "+93", flag: "🇦🇫" },
  { name: "Albania", code: "+355", flag: "🇦🇱" },
  { name: "Algeria", code: "+213", flag: "🇩🇿" },
  { name: "Andorra", code: "+376", flag: "🇦🇩" },
  { name: "Angola", code: "+244", flag: "🇦🇴" },
  { name: "Antigua and Barbuda", code: "+1-268", flag: "🇦🇬" },
  { name: "Argentina", code: "+54", flag: "🇦🇷" },
  { name: "Armenia", code: "+374", flag: "🇦🇲" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Austria", code: "+43", flag: "🇦🇹" },
  { name: "Azerbaijan", code: "+994", flag: "🇦🇿" },
  { name: "Bahamas", code: "+1-242", flag: "🇧🇸" },
  { name: "Bahrain", code: "+973", flag: "🇧🇭" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
  { name: "Barbados", code: "+1-246", flag: "🇧🇧" },
  { name: "Belarus", code: "+375", flag: "🇧🇾" },
  { name: "Belgium", code: "+32", flag: "🇧🇪" },
  { name: "Belize", code: "+501", flag: "🇧🇿" },
  { name: "Benin", code: "+229", flag: "🇧🇯" },
  { name: "Bhutan", code: "+975", flag: "🇧🇹" },
  { name: "Bolivia", code: "+591", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", code: "+387", flag: "🇧🇦" },
  { name: "Botswana", code: "+267", flag: "🇧🇼" },
  { name: "Brazil", code: "+55", flag: "🇧🇷" },
  { name: "Brunei", code: "+673", flag: "🇧🇳" },
  { name: "Bulgaria", code: "+359", flag: "🇧🇬" },
  { name: "Burkina Faso", code: "+226", flag: "🇧🇫" },
  { name: "Burundi", code: "+257", flag: "🇧🇮" },
  { name: "Cabo Verde", code: "+238", flag: "🇨🇻" },
  { name: "Cambodia", code: "+855", flag: "🇰🇭" },
  { name: "Cameroon", code: "+237", flag: "🇨🇲" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Central African Republic", code: "+236", flag: "🇨🇫" },
  { name: "Chad", code: "+235", flag: "🇹🇩" },
  { name: "Chile", code: "+56", flag: "🇨🇱" },
  { name: "China", code: "+86", flag: "🇨🇳" },
  { name: "Colombia", code: "+57", flag: "🇨🇴" },
  { name: "Comoros", code: "+269", flag: "🇰🇲" },
  { name: "Congo, Democratic Republic of the", code: "+243", flag: "🇨🇩" },
  { name: "Congo, Republic of the", code: "+242", flag: "🇨🇬" },
  { name: "Costa Rica", code: "+506", flag: "🇨🇷" },
  { name: "Croatia", code: "+385", flag: "🇭🇷" },
  { name: "Cuba", code: "+53", flag: "🇨🇺" },
  { name: "Cyprus", code: "+357", flag: "🇨🇾" },
  { name: "Czech Republic", code: "+420", flag: "🇨🇿" },
  { name: "Denmark", code: "+45", flag: "🇩🇰" },
  { name: "Djibouti", code: "+253", flag: "🇩🇯" },
  { name: "Dominica", code: "+1-767", flag: "🇩🇲" },
  { name: "Dominican Republic", code: "+1-809", flag: "🇩🇴" },
  { name: "Ecuador", code: "+593", flag: "🇪🇨" },
  { name: "Egypt", code: "+20", flag: "🇪🇬" },
  { name: "El Salvador", code: "+503", flag: "🇸🇻" },
  { name: "Equatorial Guinea", code: "+240", flag: "🇬🇶" },
  { name: "Eritrea", code: "+291", flag: "🇪🇷" },
  { name: "Estonia", code: "+372", flag: "🇪🇪" },
  { name: "Eswatini", code: "+268", flag: "🇸🇿" },
  { name: "Ethiopia", code: "+251", flag: "🇪🇹" },
  { name: "Fiji", code: "+679", flag: "🇫🇯" },
  { name: "Finland", code: "+358", flag: "🇫🇮" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Gabon", code: "+241", flag: "🇬🇦" },
  { name: "Gambia", code: "+220", flag: "🇬🇲" },
  { name: "Georgia", code: "+995", flag: "🇬🇪" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "Ghana", code: "+233", flag: "🇬🇭" },
  { name: "Greece", code: "+30", flag: "🇬🇷" },
  { name: "Grenada", code: "+1-473", flag: "🇬🇩" },
  { name: "Guatemala", code: "+502", flag: "🇬🇹" },
  { name: "Guinea", code: "+224", flag: "🇬🇳" },
  { name: "Guinea-Bissau", code: "+245", flag: "🇬🇼" },
  { name: "Guyana", code: "+592", flag: "🇬🇾" },
  { name: "Haiti", code: "+509", flag: "🇭🇹" },
  { name: "Honduras", code: "+504", flag: "🇭🇳" },
  { name: "Hungary", code: "+36", flag: "🇭🇺" },
  { name: "Iceland", code: "+354", flag: "🇮🇸" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩" },
  { name: "Iran", code: "+98", flag: "🇮🇷" },
  { name: "Iraq", code: "+964", flag: "🇮🇶" },
  { name: "Ireland", code: "+353", flag: "🇮🇪" },
  { name: "Israel", code: "+972", flag: "🇮🇱" },
  { name: "Italy", code: "+39", flag: "🇮🇹" },
  { name: "Jamaica", code: "+1-876", flag: "🇯🇲" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "Jordan", code: "+962", flag: "🇯🇴" },
  { name: "Kazakhstan", code: "+7", flag: "🇰🇿" },
  { name: "Kenya", code: "+254", flag: "🇰🇪" },
  { name: "Kiribati", code: "+686", flag: "🇰🇮" },
  { name: "Korea, North", code: "+850", flag: "🇰🇵" },
  { name: "Korea, South", code: "+82", flag: "🇰🇷" },
  { name: "Kosovo", code: "+383", flag: "🇽🇰" },
  { name: "Kuwait", code: "+965", flag: "🇰🇼" },
  { name: "Kyrgyzstan", code: "+996", flag: "🇰🇬" },
  { name: "Laos", code: "+856", flag: "🇱🇦" },
  { name: "Latvia", code: "+371", flag: "🇱🇻" },
  { name: "Lebanon", code: "+961", flag: "🇱🇧" },
  { name: "Lesotho", code: "+266", flag: "🇱🇸" },
  { name: "Liberia", code: "+231", flag: "🇱🇷" },
  { name: "Libya", code: "+218", flag: "🇱🇾" },
  { name: "Liechtenstein", code: "+423", flag: "🇱🇮" },
  { name: "Lithuania", code: "+370", flag: "🇱🇹" },
  { name: "Luxembourg", code: "+352", flag: "🇱🇺" },
  { name: "Madagascar", code: "+261", flag: "🇲🇬" },
  { name: "Malawi", code: "+265", flag: "🇲🇼" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
  { name: "Maldives", code: "+960", flag: "🇲🇻" },
  { name: "Mali", code: "+223", flag: "🇲🇱" },
  { name: "Malta", code: "+356", flag: "🇲🇹" },
  { name: "Marshall Islands", code: "+692", flag: "🇲🇭" },
  { name: "Mauritania", code: "+222", flag: "🇲🇷" },
  { name: "Mauritius", code: "+230", flag: "🇲🇺" },
  { name: "Mexico", code: "+52", flag: "🇲🇽" },
  { name: "Micronesia", code: "+691", flag: "🇫🇲" },
  { name: "Moldova", code: "+373", flag: "🇲🇩" },
  { name: "Monaco", code: "+377", flag: "🇲🇨" },
  { name: "Mongolia", code: "+976", flag: "🇲🇳" },
  { name: "Montenegro", code: "+382", flag: "🇲🇪" },
  { name: "Morocco", code: "+212", flag: "🇲🇦" },
  { name: "Mozambique", code: "+258", flag: "🇲🇿" },
  { name: "Myanmar", code: "+95", flag: "🇲🇲" },
  { name: "Namibia", code: "+264", flag: "🇳🇦" },
  { name: "Nauru", code: "+674", flag: "🇳🇷" },
  { name: "Nepal", code: "+977", flag: "🇳🇵" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱" },
  { name: "New Zealand", code: "+64", flag: "🇳🇿" },
  { name: "Nicaragua", code: "+505", flag: "🇳🇮" },
  { name: "Niger", code: "+227", flag: "🇳🇪" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
  { name: "North Macedonia", code: "+389", flag: "🇲🇰" },
  { name: "Norway", code: "+47", flag: "🇳🇴" },
  { name: "Oman", code: "+968", flag: "🇴🇲" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰" },
  { name: "Palau", code: "+680", flag: "🇵🇼" },
  { name: "Panama", code: "+507", flag: "🇵🇦" },
  { name: "Papua New Guinea", code: "+675", flag: "🇵🇬" },
  { name: "Paraguay", code: "+595", flag: "🇵🇾" },
  { name: "Peru", code: "+51", flag: "🇵🇪" },
  { name: "Philippines", code: "+63", flag: "🇵🇭" },
  { name: "Poland", code: "+48", flag: "🇵🇱" },
  { name: "Portugal", code: "+351", flag: "🇵🇹" },
  { name: "Qatar", code: "+974", flag: "🇶🇦" },
  { name: "Romania", code: "+40", flag: "🇷🇴" },
  { name: "Russia", code: "+7", flag: "🇷🇺" },
  { name: "Rwanda", code: "+250", flag: "🇷🇼" },
  { name: "Saint Kitts and Nevis", code: "+1-869", flag: "🇰🇳" },
  { name: "Saint Lucia", code: "+1-758", flag: "🇱🇨" },
  { name: "Saint Vincent and the Grenadines", code: "+1-784", flag: "🇻🇨" },
  { name: "Samoa", code: "+685", flag: "🇼🇸" },
  { name: "San Marino", code: "+378", flag: "🇸🇲" },
  { name: "Sao Tome and Principe", code: "+239", flag: "🇸🇹" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "Senegal", code: "+221", flag: "🇸🇳" },
  { name: "Serbia", code: "+381", flag: "🇷🇸" },
  { name: "Seychelles", code: "+248", flag: "🇸🇨" },
  { name: "Sierra Leone", code: "+232", flag: "🇸🇱" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Slovakia", code: "+421", flag: "🇸🇰" },
  { name: "Slovenia", code: "+386", flag: "🇸🇮" },
  { name: "Solomon Islands", code: "+677", flag: "🇸🇧" },
  { name: "Somalia", code: "+252", flag: "🇸🇴" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
  { name: "South Sudan", code: "+211", flag: "🇸🇸" },
  { name: "Spain", code: "+34", flag: "🇪🇸" },
  { name: "Sri Lanka", code: "+94", flag: "🇱🇰" },
  { name: "Sudan", code: "+249", flag: "🇸🇩" },
  { name: "Suriname", code: "+597", flag: "🇸🇷" },
  { name: "Sweden", code: "+46", flag: "🇸🇪" },
  { name: "Switzerland", code: "+41", flag: "🇨🇭" },
  { name: "Syria", code: "+963", flag: "🇸🇾" },
  { name: "Tajikistan", code: "+992", flag: "🇹🇯" },
  { name: "Tanzania", code: "+255", flag: "🇹🇿" },
  { name: "Thailand", code: "+66", flag: "🇹🇭" },
  { name: "Timor-Leste", code: "+670", flag: "🇹🇱" },
  { name: "Togo", code: "+228", flag: "🇹🇬" },
  { name: "Tonga", code: "+676", flag: "🇹🇴" },
  { name: "Trinidad and Tobago", code: "+1-868", flag: "🇹🇹" },
  { name: "Tunisia", code: "+216", flag: "🇹🇳" },
  { name: "Turkey", code: "+90", flag: "🇹🇷" },
  { name: "Turkmenistan", code: "+993", flag: "🇹🇲" },
  { name: "Tuvalu", code: "+688", flag: "🇹🇻" },
  { name: "Uganda", code: "+256", flag: "🇺🇬" },
  { name: "Ukraine", code: "+380", flag: "🇺🇦" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "Uruguay", code: "+598", flag: "🇺🇾" },
  { name: "Uzbekistan", code: "+998", flag: "🇺🇿" },
  { name: "Vanuatu", code: "+678", flag: "🇻🇺" },
  { name: "Vatican City", code: "+39-06", flag: "🇻🇦" },
  { name: "Venezuela", code: "+58", flag: "🇻🇪" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳" },
  { name: "Yemen", code: "+967", flag: "🇾🇪" },
  { name: "Zambia", code: "+260", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "+263", flag: "🇿🇼" }
];

let isOpen = false; // Track if dropdown is open
let filteredCountries = [...countryData]; // Copy of country data for filtering
let focusedIndex = -1; // Track focused item for keyboard navigation

// Function to populate country dropdown options
function populateCountryOptions(countries = countryData) {
  const countryOptionsContainer = document.getElementById('country-options');
  if (!countryOptionsContainer) return;

  // Clear existing options
  countryOptionsContainer.innerHTML = '';

  // Add countries to dropdown
  countries.forEach((country, index) => {
    const option = document.createElement('div');
    option.className = 'country-option';
    option.setAttribute('data-index', index);
    option.innerHTML = `${country.flag} <span class="country-name-text">${country.name}</span>`;

    option.addEventListener('click', () => {
      selectCountry(country);
    });

    countryOptionsContainer.appendChild(option);
  });
}

// Function to select a country and update UI
function selectCountry(country, closeDropdown = true) {
  const countryInput = document.getElementById('country-input');
  const phoneCodeSpan = document.getElementById('phone-code');
  const dropdown = document.getElementById('country-dropdown');

  if (countryInput) {
    countryInput.value = country.name;
    // Dispatch input event to ensure other listeners handle the change if needed, 
    // but avoid infinite loop if called from handleInputSearch
    // in this case we are just updating the value for casing.
  }

  if (phoneCodeSpan) {
    phoneCodeSpan.textContent = country.code;
  }

  if (dropdown && closeDropdown) {
    dropdown.classList.remove('active');
    
    
    isOpen = false;
  }
}

// Function to toggle dropdown visibility
function toggleDropdown() {
  const dropdown = document.getElementById('country-dropdown');
  if (!dropdown) return;

  if (isOpen) {
    dropdown.classList.remove('active');
    
    
  } else {
    dropdown.classList.add('active');
    
    
  }

  isOpen = !isOpen;
}

// Function to filter countries based on search term
function filterCountries(searchTerm) {
  filteredCountries = countryData.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  populateCountryOptions(filteredCountries);

  // Reset focused index
  focusedIndex = -1;

  // Show dropdown if not already visible
  if (!isOpen) {
    toggleDropdown();
  }
}

// Function to handle keyboard navigation
function handleKeyboardNavigation(event) {
  const dropdown = document.getElementById('country-dropdown');
  const options = document.querySelectorAll('.country-option');

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      focusedIndex = Math.min(focusedIndex + 1, options.length - 1);
      updateFocusedOption(options);
      break;

    case 'ArrowUp':
      event.preventDefault();
      focusedIndex = Math.max(focusedIndex - 1, -1);
      updateFocusedOption(options);
      break;

    case 'Enter':
      event.preventDefault();
      if (focusedIndex >= 0 && filteredCountries[focusedIndex]) {
        selectCountry(filteredCountries[focusedIndex]);
      }
      break;

    case 'Escape':
      if (isOpen) {
        dropdown.classList.remove('active');
        
        
        isOpen = false;
      }
      break;
  }
}

// Function to update focused option styling
function updateFocusedOption(options) {
  // Remove highlight from all options
  options.forEach(option => {
    option.classList.remove('focused');
  });

  // Highlight the focused option if it exists
  if (focusedIndex >= 0 && options[focusedIndex]) {
    options[focusedIndex].classList.add('focused');
    // Scroll the focused option into view
    options[focusedIndex].scrollIntoView({ block: 'nearest' });
  }
}

// Function to handle input for search
function handleInputSearch(event) {
  const inputValue = event.target.value;

  if (inputValue.trim() !== '') {
    filterCountries(inputValue);

    // Check for exact match (case-insensitive)
    const exactMatch = countryData.find(c => c.name.toLowerCase() === inputValue.trim().toLowerCase());
    if (exactMatch) {
      // Select the country but keep dropdown open so user can continue typing if needed
      // (e.g. "Dominica" vs "Dominican Republic")
      selectCountry(exactMatch, false);
    }
  } else {
    populateCountryOptions(); // Show all countries if input is empty
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
  const dropdown = document.getElementById('country-dropdown');
  const input = document.getElementById('country-input');

  if (isOpen &&
    !dropdown.contains(event.target) &&
    !input.contains(event.target)) {
    dropdown.classList.remove('active');
    
    
    isOpen = false;
  }
});

// Form validation function
function validateForm(event) {
  event.preventDefault(); // Prevent default form submission

  // Get all required fields
  const firstName = document.querySelector('input[placeholder="John"]');
  const lastName = document.querySelector('input[placeholder="Doe"]');
  const workEmail = document.querySelector('input[placeholder="john@hotel.com"]');
  const companyName = document.querySelector('input[placeholder="Your Hotel Group"]');
  const countryInput = document.getElementById('country-input');

  // Reset previous error indicators
  const allInputs = document.querySelectorAll('input, textarea');
  allInputs.forEach(input => {
    input.classList.remove('form-input-error');
    // Remove any existing error messages
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  });

  let isValid = true;

  // Validate first name
  if (!firstName.value.trim()) {
    firstName.classList.add('form-input-error');
    showError(firstName, 'First name is required');
    isValid = false;
  }

  // Validate last name
  if (!lastName.value.trim()) {
    lastName.classList.add('form-input-error');
    showError(lastName, 'Last name is required');
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!workEmail.value.trim()) {
    workEmail.classList.add('form-input-error');
    showError(workEmail, 'Work email is required');
    isValid = false;
  } else if (!emailRegex.test(workEmail.value.trim())) {
    workEmail.classList.add('form-input-error');
    showError(workEmail, 'Please enter a valid email address');
    isValid = false;
  }

  // Validate company name
  if (!companyName.value.trim()) {
    companyName.classList.add('form-input-error');
    showError(companyName, 'Company name is required');
    isValid = false;
  }

  // Validate country
  if (!countryInput.value.trim() || countryInput.value.trim() === "Select or type a country...") {
    countryInput.classList.add('form-input-error');
    showError(countryInput, 'Country is required');
    isValid = false;
  }

  // If form is valid, submit it
  if (isValid) {
    // Here you would typically submit the form data
    alert('Form submitted successfully!');
    // Uncomment the next line to actually submit the form
    // event.target.submit();
  } else {
    // Scroll to the first error field
    const firstErrorField = document.querySelector('.error-message')?.parentNode?.querySelector('input');
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstErrorField.focus();
    }
  }
}

// Function to show error message
function showError(field, message) {
  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message form-error-text';
  errorDiv.textContent = message;

  // Add error message after the field
  field.parentNode.appendChild(errorDiv);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Populate the initial country options
  populateCountryOptions();

  // Set up event listeners
  const countryInput = document.getElementById('country-input');
  if (countryInput) {
    countryInput.addEventListener('focus', toggleDropdown);
    countryInput.addEventListener('input', handleInputSearch);
    countryInput.addEventListener('keydown', handleKeyboardNavigation);
  }

  // Add form submission listener
  const formElement = document.querySelector('form');
  if (formElement) {
    formElement.addEventListener('submit', validateForm);
  }

  // Update phone code when a country is selected
  const phoneCodeSpan = document.getElementById('phone-code');
  if (phoneCodeSpan) {
    // Set default to '+'
    phoneCodeSpan.textContent = '+';
  }
});
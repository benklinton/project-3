(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')
  const state = document.querySelector('input[name="state"]');
  const zip = document.querySelector('input[name="zip"]');
  const email = document.querySelector('input[name="email"]');
  const phone = document.querySelector('input[name="phone"]');

  const validStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const validateState = (state) => {
    return validStates.includes(state.value.toUpperCase());
  }
  const validateZip = (zip) => {
    const zipPattern = /^[0-9]{5}$/;
    return zipPattern.test(zip.value);
  }

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.value);
  }

  const validatePhone = (phone) => {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    return phonePattern.test(phone.value);
  }

  $(state).on('input', function() {
    if (state && !validateState(state)) {
      $('.state-feedback').text('Please enter a valid state abbreviation.');
      state.classList.remove('is-valid')
      state.classList.add('is-invalid')
    }
    else {
      state.classList.remove('is-invalid');
      state.classList.add('is-valid');
    }
  });

  $(zip).on('input', function() {
    if (zip && !validateZip(zip)) {
      $('.zip-feedback').text('Please enter a valid zip code.');
      zip.classList.remove('is-valid')
      zip.classList.add('is-invalid')
    }
    else {
      zip.classList.remove('is-invalid');
      zip.classList.add('is-valid');
    }
  });

 $(email).on('input', function() {
    if (email && !validateEmail(email)) {
      $('.email-feedback').text('Please enter a valid email address.');
    }
    else {
      email.classList.remove('is-invalid');
      email.classList.add('is-valid');
    }
  });

  $(phone).on('input', function() {
    if (phone && !validatePhone(phone)) {
      $('.phone-feedback').text('Format must be ###-###-####.');
     phone.classList.remove('is-valid')
      phone.classList.add('is-invalid')
    }
    else {
      phone.classList.remove('is-invalid');
      phone.classList.add('is-valid');
    }
  });

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      let isValid = true;
      const state = form.querySelector('input[name="state"]');
      const email = form.querySelector('input[name="email"]');
      const phone = form.querySelector('input[name="phone"]');
      const zip = form.querySelector('input[name="zip"]');

      if (state && !validateState(state)) {
        isValid = false;
      } else {
        state.classList.remove('is-invalid');
      }
      if (zip && !validateZip(zip)) {
        isValid = false;
      } else {
        zip.classList.remove('is-invalid');
      }
      if (email && !validateEmail(email)) {
        isValid = false;
      } else {
        email.classList.remove('is-invalid');
      }
      if (phone && !validatePhone(phone)) {
        isValid = false;
        phone.classList.remove('is-valid')
        phone.classList.add('is-invalid')
      }
      else {
        phone.classList.remove('is-invalid');
        phone.classList.add('is-valid');
      }
      if (!form.checkValidity() || !isValid) {
        event.preventDefault()
        event.stopPropagation()
      }
      else {
        event.preventDefault();
        $("#form").css('display', 'none');
        $("#form-confirmation").css('display', 'block');
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
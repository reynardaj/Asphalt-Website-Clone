

// Products Page
function filterSelection(category) {
    var items = document.querySelectorAll('.gallery-content');
        if (category === 'all') {
            items.forEach(item => item.classList.add('show'));
        } else {
            items.forEach(item => {
                item.classList.remove('show');
                if (item.getAttribute('data-category') === category) {
                    item.classList.add('show');
                }
            });
        }
    }
    
document.addEventListener('DOMContentLoaded', function() {
    filterSelection('all');

    function setActive(event) {
        const activeBtn = document.querySelector('.gallery-btn-active');
        
        // Check if an active button exists
        if (activeBtn) {
        // Remove active class from the currently active button
        activeBtn.classList.add('gallery-btn');
        activeBtn.classList.remove('gallery-btn-active');
        }
        
        event.target.classList.add('gallery-btn-active');
        event.target.classList.remove('gallery-btn');
    }

    // Use event delegation to add event listener to the container
    const buttonContainer = document.querySelector('.gallery-btn-container');
    buttonContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('gallery-btn')) {
        setActive(event);
        }
    });
});

// News Page

document.addEventListener("DOMContentLoaded", function() {
    let currentIndex = 0;
    const carousel = document.querySelector('.carousel');
    const indicators = document.querySelectorAll('.indicator');
    const numItems = document.querySelectorAll('.carousel-item').length;
    const intervalTime = 3000; // 3 seconds

    function updateCarousel() {
        const width = carousel.clientWidth;
        carousel.style.transform = `translateX(-${currentIndex * width}px)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % numItems;
        updateCarousel();
    }

    function moveToPreviousSlide() {
        currentIndex = (currentIndex - 1 + numItems) % numItems;
        updateCarousel();
    }

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            currentIndex = parseInt(indicator.dataset.index);
            updateCarousel();
        });
    });

    let autoSlide = setInterval(moveToNextSlide, intervalTime);

    // Add event listeners for sliding functionality
    document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
        autoSlide = setInterval(moveToNextSlide, intervalTime);
    });

    document.querySelector('.prev-btn').addEventListener('click', () => {
        moveToPreviousSlide();
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        moveToNextSlide();
    });

    updateCarousel();

});

// E-sport Page

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counting');

    const updateCount = (counter) => {
        const target = +counter.getAttribute('data-count').replace(/\D/g, ''); // Remove non-numeric characters from target
        const count = +counter.innerText.replace(/\D/g, ''); // Remove non-numeric characters from count
        const increment = target / 100;

        if (count < target) {
            if (counter.getAttribute('data-count').includes('$')) {
                counter.innerText = `$${Math.ceil(count + increment).toLocaleString()}`;
            } else {
                counter.innerText = Math.ceil(count + increment).toLocaleString();
            }
            setTimeout(() => updateCount(counter), 10);
        } else {
            if (counter.getAttribute('data-count').includes('$')) {
                counter.innerText = `$${target.toLocaleString()}`;
            } else {
                counter.innerText = target.toLocaleString();
            }
        }
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCount(entry.target);
                observer.unobserve(entry.target); // Stop observing once the animation starts
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});

// Subscription Page
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.subscription-form');
  
    form.addEventListener('submit', function(event) {
      let isFormValid = true;
  
      // Clear previous error messages
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(errorMessage => errorMessage.textContent = '');
  
      // Validate Name
      const nameInput = document.querySelector('#nameInput');
      if (!validateName(nameInput.value)) {
        isFormValid = false;
        document.querySelector('#error-message-name').textContent = 'Name must be at least 3 characters long.';
      }
  
      // Validate Email
      const emailInput = document.querySelector('#emailInput');
      if (!validateEmail(emailInput.value)) {
        isFormValid = false;
        document.querySelector('#error-message-email').textContent = 'Please enter a valid email address.';
      }
  
      // Validate Date of Birth
      const dobInput = document.querySelector('#dobInput');
      if (!validateDOB(dobInput.value)) {
        isFormValid = false;
        document.querySelector('#error-message-dob').textContent = 'You must be at least 10 years old.';
      }
  
      // Validate Gender
      const genderSelected = document.querySelector('input[name="gender"]:checked');
      if (!genderSelected) {
        isFormValid = false;
        document.querySelector('#error-message-gender').textContent = 'Please select your gender.';
      }
  
      // Validate Terms and Conditions
      const termsCheckbox = document.querySelector('#termsCheckbox');
      if (!termsCheckbox.checked) {
        isFormValid = false;
        document.querySelector('#error-message-terms').textContent = 'You must agree to the terms and conditions.';
      }
  
      // If any input is not valid, prevent the form from being submitted
      if (!isFormValid) {
        event.preventDefault();
      }
    });
  
    function validateName(name) {
      return name.length >= 3;
    }
  
    function validateEmail(email) {
      const atSymbol = email.indexOf('@');
      const dot = email.lastIndexOf('.');
      return atSymbol > 1 && dot > atSymbol + 2 && dot < email.length - 2;
    }
  
    function validateDOB(dob) {
      const dobDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      const monthDifference = today.getMonth() - dobDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
        return age > 10;
      }
      return age >= 10;
    }
  });
  
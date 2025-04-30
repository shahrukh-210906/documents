// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Hero animation - ambulance moves across screen
    const ambulance = document.getElementById('main-ambulance');
    const trafficLight = document.getElementById('traffic-light');
    
    // Animate the hero ambulance
    setTimeout(() => {
        ambulance.style.transition = 'left 8s linear';
        ambulance.style.left = '120%';
        
        // Change traffic light when ambulance is near
        setTimeout(() => {
            const lights = trafficLight.querySelectorAll('.traffic-light');
            lights.forEach(light => light.classList.remove('active'));
            trafficLight.querySelector('.green').classList.add('active');
        }, 5000);
    }, 1000);
    
    // Workflow animation controls
    const startBtn = document.getElementById('start-animation');
    const resetBtn = document.getElementById('reset-animation');
    const animatedAmbulance = document.getElementById('animated-ambulance');
    const northLight = document.getElementById('north-light');
    const eastLight = document.getElementById('east-light');
    const car1 = document.getElementById('car1');
    const car2 = document.getElementById('car2');
    const steps = document.querySelectorAll('.animation-steps .step');
    
    let animationInProgress = false;
    
    startBtn.addEventListener('click', startWorkflowAnimation);
    resetBtn.addEventListener('click', resetWorkflowAnimation);
    
    function startWorkflowAnimation() {
        if (animationInProgress) return;
        animationInProgress = true;
        
        // Reset all elements to starting position
        resetElements();
        
        // Highlight step 1
        updateSteps(1);
        
        // Ambulance starts approaching
        animatedAmbulance.style.animation = 'ambulance-approach 15s linear';
        animatedAmbulance.style.left = '120%';
        
        // Cars moving normally
        car1.style.animation = 'car-move 10s linear infinite';
        car2.style.animation = 'car-move 8s linear infinite';
        car2.style.animationDelay = '2s';
        
        // Step 2: System calculates timing (after 3 seconds)
        setTimeout(() => {
            updateSteps(2);
        }, 3000);
        
        // Step 3: Lights change (when ambulance is near)
        setTimeout(() => {
            updateSteps(3);
            
            // Change north light to green
            const northLights = northLight.querySelectorAll('.traffic-light');
            northLights.forEach(light => light.classList.remove('active'));
            northLight.querySelector('.green').classList.add('active');
            
            // Change east light to red
            const eastLights = eastLight.querySelectorAll('.traffic-light');
            eastLights.forEach(light => light.classList.remove('active'));
            eastLight.querySelector('.red').classList.add('active');
            
            // Stop normal traffic
            car1.style.animation = 'none';
            car2.style.animation = 'none';
            
        }, 6000);
        
        // Step 4: Ambulance passes through
        setTimeout(() => {
            updateSteps(4);
        }, 9000);
        
        // Reset after animation completes
        setTimeout(() => {
            animationInProgress = false;
        }, 15000);
    }
    
    function resetWorkflowAnimation() {
        // Stop all animations
        animatedAmbulance.style.animation = 'none';
        car1.style.animation = 'none';
        car2.style.animation = 'none';
        
        // Reset positions
        resetElements();
        
        // Reset steps
        steps.forEach(step => step.classList.remove('active'));
        steps[0].classList.add('active');
        
        animationInProgress = false;
    }
    
    function resetElements() {
        animatedAmbulance.style.left = '-150px';
        car1.style.left = '100px';
        car2.style.left = '300px';
        
        // Reset lights to default (north red, east red)
        const northLights = northLight.querySelectorAll('.traffic-light');
        northLights.forEach(light => light.classList.remove('active'));
        northLight.querySelector('.red').classList.add('active');
        
        const eastLights = eastLight.querySelectorAll('.traffic-light');
        eastLights.forEach(light => light.classList.remove('active'));
        eastLight.querySelector('.red').classList.add('active');
    }
    
    function updateSteps(stepNumber) {
        steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === stepNumber) {
                step.classList.add('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const organization = document.getElementById('organization').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For this demo, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. We'll contact you soon at ${email}.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Mobile menu toggle (would need HTML/CSS additions)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.style.display = 'none';
    document.querySelector('nav').appendChild(mobileMenuToggle);
    
    function setupMobileMenu() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuToggle.style.display = 'block';
        navLinks.style.display = 'none';
        
        mobileMenuToggle.addEventListener('click', function() {
            if (navLinks.style.display === 'none' || navLinks.style.display === '') {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '60px';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'var(--primary-blue)';
                navLinks.style.padding = '1rem';
                navLinks.style.width = '200px';
            } else {
                navLinks.style.display = 'none';
            }
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.style.display = 'none';
            });
        });
    }
    
    // Check screen size and setup mobile menu if needed
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            setupMobileMenu();
        } else {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.style.display = '';
                mobileMenuToggle.style.display = 'none';
            }
        }
    }
    
    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
});

// JS for ambulance simulation
let ambulance = document.getElementById('ambulance');
let redLight = document.querySelector('.red');
let yellowLight = document.querySelector('.yellow');
let greenLight = document.querySelector('.green');

let position = -50;
let interval;

function startSimulation() {
  position = -50;
  ambulance.style.left = position + 'px';
  clearInterval(interval);

  interval = setInterval(() => {
    position += 2;
    ambulance.style.left = position + 'px';

    // Simulate light change
    if (position < 300) {
      setLight('red');
    } else if (position < 500) {
      setLight('yellow');
    } else {
      setLight('green');
    }

    if (position > 800) {
      clearInterval(interval);
      setLight('red');
    }
  }, 30);
}

function setLight(color) {
  redLight.classList.remove('active');
  yellowLight.classList.remove('active');
  greenLight.classList.remove('active');

  if (color === 'red') redLight.classList.add('active');
  if (color === 'yellow') yellowLight.classList.add('active');
  if (color === 'green') greenLight.classList.add('active');
}

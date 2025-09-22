document.addEventListener('DOMContentLoaded', function() {
    // Create animated background elements
    createBackgroundElements();
    
    // Add scroll event for navbar
    window.addEventListener('scroll', handleScroll);
    
    // Add mouse move effect for floating elements
    document.addEventListener('mousemove', parallaxEffect);
    
    // Add animation on scroll for elements
    setupScrollAnimations();
    
    // Initialize particles
    createParticles();
});

// Create background elements
function createBackgroundElements() {
    const background = document.createElement('div');
    background.className = 'background';
    
    // Add gradient particles
    const particle1 = document.createElement('div');
    particle1.className = 'particles particle-1';
    
    const particle2 = document.createElement('div');
    particle2.className = 'particles particle-2';
    
    const particle3 = document.createElement('div');
    particle3.className = 'particles particle-3';
    
    // Add floating elements
    const floating1 = document.createElement('div');
    floating1.className = 'floating floating-1';
    
    const floating2 = document.createElement('div');
    floating2.className = 'floating floating-2';
    
    const floating3 = document.createElement('div');
    floating3.className = 'floating floating-3';
    
    // Append all elements
    background.appendChild(particle1);
    background.appendChild(particle2);
    background.appendChild(particle3);
    background.appendChild(floating1);
    background.appendChild(floating2);
    background.appendChild(floating3);
    
    document.body.insertBefore(background, document.body.firstChild);
}

// Handle scroll event for navbar
function handleScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Parallax effect on mouse move
function parallaxEffect(e) {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 30;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const animateOnScroll = (elements, className) => {
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add(className);
            }
        });
    };
    
    // Add animation to skills
    const skills = document.querySelectorAll('.skill');
    window.addEventListener('scroll', () => {
        animateOnScroll(skills, 'animate');
    });
    
    // Initial check
    animateOnScroll(skills, 'animate');
}

// Create interactive particles
function createParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    document.body.appendChild(canvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect particles
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Start animation
    animate();
}

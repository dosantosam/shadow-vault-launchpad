
// Countdown Timer functionality
let timeLeft = {
    hours: 2,
    minutes: 47,
    seconds: 33
};

// Course pricing logic
const coursePrice = 197;
const courseNames = [
    'João comprou este curso',
    'Mariana acabou de garantir acesso',
    'Carlos comprou o curso',
    'Ana garantiu seu acesso',
    'Rafael adquiriu o curso',
    'Patricia garantiu acesso',
    'Bruno comprou agora',
    'Camila acabou de comprar',
    'Diego garantiu seu lugar',
    'Fernanda adquiriu o curso'
];

function updateCountdown() {
    // Update main countdown
    document.getElementById('hours').textContent = String(timeLeft.hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(timeLeft.minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(timeLeft.seconds).padStart(2, '0');
    
    // Update final countdown
    const finalCountdown = document.getElementById('final-countdown');
    if (finalCountdown) {
        finalCountdown.textContent = `${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;
    }
}

function decrementTime() {
    if (timeLeft.seconds > 0) {
        timeLeft.seconds--;
    } else if (timeLeft.minutes > 0) {
        timeLeft.minutes--;
        timeLeft.seconds = 59;
    } else if (timeLeft.hours > 0) {
        timeLeft.hours--;
        timeLeft.minutes = 59;
        timeLeft.seconds = 59;
    } else {
        // Reset timer when it reaches 0
        timeLeft = { hours: 2, minutes: 47, seconds: 33 };
    }
    
    updateCountdown();
}

// Start countdown timer
setInterval(decrementTime, 1000);

// Initialize countdown display
updateCountdown();

// CTA Button click handler
function handleCtaClick() {
    // Add click animation
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    // Log click for tracking
    console.log('CTA clicked at:', new Date().toLocaleTimeString());
    
    // Here you would typically redirect to a checkout page or open a modal
    // For demo purposes, we'll show an alert
    alert(`🚀 Redirecionando para pagamento...\n\n✅ Curso completo por apenas R$ ${coursePrice}\n✅ Acesso vitalício\n✅ Garantia de 7 dias`);
}

// Add some dynamic effects
document.addEventListener('DOMContentLoaded', function() {
    // Add entrance animations to proof cards
    const proofCards = document.querySelectorAll('.proof-card');
    proofCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add entrance animations to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Random testimonial updates (simulate live activity)
    const testimonialTimes = document.querySelectorAll('.testimonial-time');
    
    function updateTestimonialTimes() {
        testimonialTimes.forEach(timeElement => {
            const currentMinutes = parseInt(timeElement.textContent);
            if (Math.random() < 0.3) { // 30% chance to update
                const newTime = Math.max(1, currentMinutes + Math.floor(Math.random() * 3) - 1);
                timeElement.textContent = `${newTime} min atrás`;
            }
        });
    }
    
    // Update testimonial times every 30 seconds
    setInterval(updateTestimonialTimes, 30000);
    
    // Add glitch effect to title on hover
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        glitchText.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.1s infinite';
        });
        
        glitchText.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    }
    
    // Simulate live course purchases
    const proofAmounts = document.querySelectorAll('.proof-amount');
    const proofTimes = document.querySelectorAll('.proof-time .time');
    
    function updatePaymentProofs() {
        // Randomly update one proof every 45-90 seconds
        if (Math.random() < 0.7) {
            const randomIndex = Math.floor(Math.random() * proofAmounts.length);
            const times = ['14:42', '15:13', '15:28', '15:35', '15:41', '15:47'];
            
            proofAmounts[randomIndex].textContent = courseNames[Math.floor(Math.random() * courseNames.length)];
            proofTimes[randomIndex].textContent = times[Math.floor(Math.random() * times.length)];
            
            // Add flash effect
            const card = proofAmounts[randomIndex].closest('.proof-card');
            card.style.border = '2px solid #ffff00';
            card.style.boxShadow = '0 0 20px rgba(255, 255, 0, 0.5)';
            
            setTimeout(() => {
                card.style.border = '1px solid #00ff41';
                card.style.boxShadow = '';
            }, 2000);
        }
    }
    
    // Update proofs every 60-120 seconds
    setInterval(updatePaymentProofs, 60000 + Math.random() * 60000);
    
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.payment-proofs-section, .pain-points-section, .testimonials-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add urgent notification popup after 30 seconds
setTimeout(() => {
    if (Math.random() < 0.8) { // 80% chance to show
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ff0040;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                border: 2px solid #ffff00;
                box-shadow: 0 4px 20px rgba(255, 0, 64, 0.3);
                z-index: 1000;
                font-family: 'Source Code Pro', monospace;
                font-weight: bold;
                max-width: 300px;
                animation: slideIn 0.5s ease;
            ">
                🚨 URGENTE! 🚨<br>
                <span style="font-size: 0.9em;">Apenas 47 vagas restantes!</span><br>
                <button onclick="this.parentElement.parentElement.remove(); handleCtaClick();" style="
                    background: #00ff41;
                    color: #000;
                    border: none;
                    padding: 0.5rem 1rem;
                    margin-top: 0.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                ">GARANTIR VAGA</button>
                <button onclick="this.parentElement.parentElement.remove();" style="
                    background: transparent;
                    color: white;
                    border: 1px solid white;
                    padding: 0.5rem 1rem;
                    margin: 0.5rem 0 0 0.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.8em;
                ">Fechar</button>
            </div>
        `;
        
        // Add slideIn animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }
}, 30000);

// Enhanced exit-intent popup
let exitIntentShown = false;

document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        
        const exitPopup = document.createElement('div');
        exitPopup.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Orbitron', monospace;
            ">
                <div style="
                    background: #111111;
                    border: 3px solid #ff0040;
                    padding: 2rem;
                    text-align: center;
                    max-width: 500px;
                    border-radius: 10px;
                    box-shadow: 0 0 50px rgba(255, 0, 64, 0.5);
                ">
                    <h2 style="color: #ff0040; font-size: 2rem; margin-bottom: 1rem;">
                        ⚠️ ESPERE! ⚠️
                    </h2>
                    <p style="color: #ffff00; font-size: 1.2rem; margin-bottom: 1rem;">
                        Você está perdendo a chance de economizar milhares em impostos!
                    </p>
                    <p style="color: white; margin-bottom: 2rem;">
                        Este curso pode economizar mais em impostos do que você pagaria por ele.<br>
                        Não deixe o governo continuar te explorando.
                    </p>
                    <button onclick="this.parentElement.parentElement.remove(); handleCtaClick();" style="
                        background: #00ff41;
                        color: #000;
                        border: none;
                        padding: 1rem 2rem;
                        font-size: 1.2rem;
                        font-weight: bold;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-right: 1rem;
                        font-family: 'Orbitron', monospace;
                    ">
                        🚀 SIM, QUERO ECONOMIZAR!
                    </button>
                    <button onclick="this.parentElement.parentElement.remove();" style="
                        background: transparent;
                        color: #999;
                        border: 1px solid #999;
                        padding: 1rem 2rem;
                        font-size: 1rem;
                        border-radius: 5px;
                        cursor: pointer;
                    ">
                        Continuar pagando demais...
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(exitPopup);
    }
});

// Log page view for analytics
console.log('Tax optimization landing page loaded:', new Date().toLocaleString());

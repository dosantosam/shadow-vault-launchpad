// Countdown Timer
function startCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const finalCountdownElement = document.getElementById('final-countdown');
    
    // Set initial time (2 hours, 47 minutes, 33 seconds)
    let totalSeconds = 2 * 3600 + 47 * 60 + 33;
    
    function updateDisplay() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        if (finalCountdownElement) {
            finalCountdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    function countdown() {
        updateDisplay();
        
        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            // Reset to initial time when it reaches 0
            totalSeconds = 2 * 3600 + 47 * 60 + 33;
        }
    }
    
    // Update immediately
    updateDisplay();
    
    // Update every second
    setInterval(countdown, 1000);
}

// Payment Proofs Animation
function startPaymentProofs() {
    const proofCards = document.querySelectorAll('.proof-card');
    const names = ['João', 'Mariana', 'Carlos', 'Ana', 'Pedro', 'Juliana', 'Roberto', 'Fernanda'];
    
    function updateProofCard(card, index) {
        const nameElement = card.querySelector('.proof-amount');
        const timeElement = card.querySelector('.time');
        
        if (nameElement && timeElement) {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const now = new Date();
            const randomMinutes = Math.floor(Math.random() * 60);
            now.setMinutes(now.getMinutes() - randomMinutes);
            
            nameElement.textContent = `${randomName} comprou este curso`;
            timeElement.textContent = now.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            // Add animation
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'fadeIn 0.5s ease-out';
            }, 10);
        }
    }
    
    // Update proof cards every 15-30 seconds
    proofCards.forEach((card, index) => {
        setInterval(() => {
            updateProofCard(card, index);
        }, (15 + Math.random() * 15) * 1000);
    });
}

// CTA Click Handler
function handleCtaClick() {
    // Add click tracking or redirect logic here
    console.log('CTA clicked - redirecting to checkout...');
    
    // Example: redirect to checkout page
    // window.location.href = 'https://your-checkout-page.com';
    
    // For now, just show an alert
    alert('Redirecionando para o checkout...');
}

// Video loading functionality
function loadVideo() {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoUrl = 'https://youtu.be/untD4TJy5xs?si=KzH0PFQufqV1DMwZ';
    
    // Convert YouTube URL to embed format
    const videoId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    
    if (videoId && videoId[1]) {
        const embedUrl = `https://www.youtube.com/embed/${videoId[1]}?autoplay=1&rel=0`;
        videoPlayer.innerHTML = `
            <iframe class="video-iframe" 
                    src="${embedUrl}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
        `;
    } else {
        // Fallback for invalid URL - keep placeholder
        console.log('Video will be available soon');
    }
}

// Exit intent popup functionality
let exitIntentTriggered = false;
let exitTimer;

function showExitPopup() {
    if (!exitIntentTriggered) {
        exitIntentTriggered = true;
        document.getElementById('exitPopup').style.display = 'flex';
        startExitTimer();
    }
}

function closeExitPopup() {
    document.getElementById('exitPopup').style.display = 'none';
    clearInterval(exitTimer);
}

function startExitTimer() {
    let timeLeft = 300; // 5 minutes in seconds
    const timerElement = document.getElementById('exit-timer');
    
    exitTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(exitTimer);
            closeExitPopup();
        }
        timeLeft--;
    }, 1000);
}

// Enhanced exit intent detection
document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0) {
        showExitPopup();
    }
});

// Mobile exit intent (back button)
let isBackButtonClicked = false;
window.addEventListener('beforeunload', function(e) {
    if (!isBackButtonClicked) {
        isBackButtonClicked = true;
        showExitPopup();
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// Keyboard exit intent (Alt+F4, Ctrl+W)
document.addEventListener('keydown', function(e) {
    if ((e.altKey && e.key === 'F4') || (e.ctrlKey && e.key === 'w')) {
        showExitPopup();
    }
});

// Close popup when clicking outside
document.getElementById('exitPopup').addEventListener('click', function(e) {
    if (e.target === this) {
        closeExitPopup();
    }
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    startPaymentProofs();
    console.log('Landing page loaded successfully');
});


// Persistent Countdown Timer
function startCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Get stored end time or create new one (15 minutes from now)
    let endTime = localStorage.getItem('countdownEndTime');
    
    if (!endTime) {
        // First visit - set countdown to 15 minutes from now
        const now = new Date().getTime();
        endTime = now + (15 * 60 * 1000); // 15 minutes in milliseconds
        localStorage.setItem('countdownEndTime', endTime);
    }
    
    function updateDisplay() {
        const now = new Date().getTime();
        const timeLeft = parseInt(endTime) - now;
        
        if (timeLeft <= 0) {
            // Reset timer when it reaches 0
            const newEndTime = new Date().getTime() + (15 * 60 * 1000);
            localStorage.setItem('countdownEndTime', newEndTime);
            endTime = newEndTime;
            return;
        }
        
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update immediately
    updateDisplay();
    
    // Update every second
    setInterval(updateDisplay, 1000);
}

// CTA Click Handler - Updated to redirect to payment link
function handleCtaClick() {
    console.log('CTA clicked - redirecting to checkout...');
    
    // Dispara evento para o Meta Pixel
    fbq('track', 'Lead'); // ou 'InitiateCheckout' se preferir

    // Redirect to the payment link
    window.open('https://pay.kirvano.com/3eaa9564-6bd6-49d5-a83b-723fc3cc5ce6', '_blank');
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
        if (timerElement) {
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
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
const exitPopup = document.getElementById('exitPopup');
if (exitPopup) {
    exitPopup.addEventListener('click', function(e) {
        if (e.target === this) {
            closeExitPopup();
        }
    });
}

// Quiz Logic
let currentQuestion = 1;
const totalQuestions = 3;
let quizAnswers = {};

function nextQuestion() {
    const currentAnswer = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    
    if (!currentAnswer) {
        alert('Por favor, selecione uma resposta antes de continuar.');
        return;
    }
    
    // Store answer
    quizAnswers[`q${currentQuestion}`] = currentAnswer.value;
    
    // Hide current question
    document.getElementById(`question${currentQuestion}`).style.display = 'none';
    
    // Show next question or submit button
    currentQuestion++;
    
    if (currentQuestion <= totalQuestions) {
        document.getElementById(`question${currentQuestion}`).style.display = 'block';
        updateProgress();
        
        if (currentQuestion === totalQuestions) {
            document.getElementById('nextBtn').style.display = 'none';
            document.getElementById('submitBtn').style.display = 'block';
        }
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
    
    progressFill.style.width = progressPercentage + '%';
    progressText.textContent = `${currentQuestion} de ${totalQuestions}`;
}

function submitQuiz() {
    const currentAnswer = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    
    if (!currentAnswer) {
        alert('Por favor, selecione uma resposta antes de finalizar.');
        return;
    }
    
    // Store final answer
    quizAnswers[`q${currentQuestion}`] = currentAnswer.value;
    
    // Store answers in localStorage (optional)
    localStorage.setItem('quizAnswers', JSON.stringify(quizAnswers));
    
    // Mark quiz as completed
    localStorage.setItem('quizCompleted', 'true');
    
    // Track quiz completion
    if (typeof fbq !== 'undefined') {
        fbq('track', 'CompleteRegistration');
    }
    
    // Hide quiz and show thank you
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('thankYouContainer').style.display = 'flex';
    
    // Start redirect countdown
    startRedirectCountdown();
}

function startRedirectCountdown() {
    let countdown = 3;
    const countdownElement = document.getElementById('redirectCountdown');
    
    const interval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(interval);
            // Redirect to main site
            window.location.href = 'https://espancandoareceita.com.br/';
        }
    }, 1000);
}

// Enable next button when an option is selected
document.addEventListener('change', function(e) {
    if (e.target.type === 'radio') {
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        
        if (nextBtn && nextBtn.style.display !== 'none') {
            nextBtn.disabled = false;
        }
        if (submitBtn && submitBtn.style.display !== 'none') {
            submitBtn.disabled = false;
        }
    }
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already completed the quiz
    const hasCompletedQuiz = localStorage.getItem('quizCompleted');
    
    if (hasCompletedQuiz) {
        // Skip quiz and go directly to main site
        window.location.href = 'https://espancandoareceita.com.br/';
        return;
    }
    
    // Initialize quiz
    updateProgress();
    
    // Disable buttons initially
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('submitBtn').disabled = true;
    
    console.log('Quiz loaded successfully');
});

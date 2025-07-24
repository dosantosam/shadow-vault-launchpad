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
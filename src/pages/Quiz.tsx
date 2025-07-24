import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showThankYou, setShowThankYou] = useState(false);

  const questions = [
    {
      question: "Você é CLT, PJ ou autônomo?",
      options: ["CLT", "PJ", "Autônomo"]
    },
    {
      question: "Você está insatisfeito com o quanto você paga de imposto?",
      options: ["Sim", "Não"]
    },
    {
      question: "Você conhece alguma estratégia fiscal?",
      options: ["Sim", "Não"]
    }
  ];

  useEffect(() => {
    // Check if quiz was already completed
    const quizCompleted = localStorage.getItem('quizCompleted');
    if (quizCompleted === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer('');

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      localStorage.setItem('quizCompleted', 'true');
      localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
      setShowThankYou(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  if (showThankYou) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f9f9f9 0%, #e8e8e8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div>
            <h2 style={{
              color: '#b30000',
              fontSize: '2.5rem',
              marginBottom: '16px',
              fontWeight: '700'
            }}>Obrigado!</h2>
            <p style={{
              color: '#666',
              fontSize: '1.1rem'
            }}>Redirecionando...</p>
          </div>
        </div>
      </div>
    );
  }

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f9f9f9 0%, #e8e8e8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  };

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%'
  };

  const progressBarStyle: React.CSSProperties = {
    width: '100%',
    height: '6px',
    background: '#e0e0e0',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '16px'
  };

  const progressFillStyle: React.CSSProperties = {
    height: '100%',
    background: 'linear-gradient(90deg, #b30000 0%, #d60000 100%)',
    transition: 'width 0.3s ease',
    width: `${((currentQuestion + 1) / questions.length) * 100}%`
  };

  const questionTitleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: '32px',
    lineHeight: '1.3'
  };

  const optionButtonStyle: React.CSSProperties = {
    padding: '16px 24px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    background: 'white',
    color: '#222',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    width: '100%'
  };

  const selectedOptionStyle: React.CSSProperties = {
    ...optionButtonStyle,
    borderColor: '#b30000',
    background: '#b30000',
    color: 'white'
  };

  const nextButtonStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px',
    background: selectedAnswer ? '#b30000' : '#ccc',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: selectedAnswer ? 'pointer' : 'not-allowed',
    transition: 'all 0.2s ease',
    marginTop: '32px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ marginBottom: '40px' }}>
          <div style={progressBarStyle}>
            <div style={progressFillStyle}></div>
          </div>
          <p style={{
            textAlign: 'center',
            color: '#666',
            fontSize: '0.9rem',
            margin: '0'
          }}>
            Pergunta {currentQuestion + 1} de {questions.length}
          </p>
        </div>

        <div>
          <h2 style={questionTitleStyle}>
            {questions[currentQuestion].question}
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '32px'
          }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                style={selectedAnswer === option ? selectedOptionStyle : optionButtonStyle}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            style={nextButtonStyle}
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
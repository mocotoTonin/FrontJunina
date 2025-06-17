import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useGameLimits } from '@/hooks/useGameLimits';
import { useDailyTicket } from '@/hooks/useDailyTicket';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '@/hooks/useLoading';

const QuizGame = ({ onClose }: { onClose: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const { toast } = useToast();
  const { recordGamePlay } = useGameLimits();
  const { markGameAsPlayed, hasPlayedGame } = useDailyTicket();
  const navigate = useNavigate();
  const { startLoading } = useLoading();

  useEffect(() => {
    if (hasPlayedGame('quiz')) {
      toast({
        title: "⏰ Limite diário atingido",
        description: "Você já jogou este jogo hoje. Volte amanhã!",
        duration: 5000,
      });
      onClose();
      return;
    }
  }, []);

  const questions = [
    {
      question: "Qual santo é homenageado na festa de São João?",
      answers: ["São Pedro", "São João Batista", "São Paulo", "São José"],
      correct: 1
    },
    {
      question: "Qual dança típica é tradicional nas festas juninas?",
      answers: ["Samba", "Frevo", "Quadrilha", "Forró"],
      correct: 2
    },
    {
      question: "Que comida típica é feita com milho nas festas juninas?",
      answers: ["Pamonha", "Feijoada", "Brigadeiro", "Coxinha"],
      correct: 0
    },
    {
      question: "Em que mês tradicionalmente acontecem as festas juninas?",
      answers: ["Maio", "Junho", "Julho", "Agosto"],
      correct: 1
    },
    {
      question: "Qual instrumento é típico do forró?",
      answers: ["Violão", "Piano", "Sanfona", "Bateria"],
      correct: 2
    },
    {
      question: "Qual é a bebida típica das festas juninas?",
      answers: ["Caipirinha", "Quentão", "Cerveja", "Refrigerante"],
      correct: 1
    },
    {
      question: "Que tipo de roupa é tradicional nas festas juninas?",
      answers: ["Smoking", "Roupa caipira", "Terno", "Vestido de gala"],
      correct: 1
    },
    {
      question: "Qual doce é típico das festas juninas?",
      answers: ["Brigadeiro", "Pé de moleque", "Pudim", "Torta"],
      correct: 1
    },
    {
      question: "As festas juninas celebram principalmente:",
      answers: ["A colheita", "O inverno", "O carnaval", "O ano novo"],
      correct: 0
    },
    {
      question: "Qual é o principal símbolo das festas juninas?",
      answers: ["Árvore de Natal", "Fogueira", "Ovos de Páscoa", "Fantasias"],
      correct: 1
    },
    {
      question: "Que brincadeira é comum nas festas juninas?",
      answers: ["Videogame", "Pescaria", "Futebol", "Tênis"],
      correct: 1
    },
    {
      question: "Qual é a origem das festas juninas no Brasil?",
      answers: ["Indígena", "Africana", "Europeia", "Asiática"],
      correct: 2
    }
  ];

  const handleAnswerClick = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
        recordGamePlay('quiz');
        markGameAsPlayed('quiz');
      }
    }, 1500);
  };

  const handleClose = () => {
    startLoading();
    setTimeout(() => {
      onClose();
      navigate('/mini-jogos');
    }, 1000);
  };

  if (showResult) {
    return (
      <div className="glass-effect p-4 sm:p-6 rounded-2xl max-w-md mx-auto text-center">
        <Trophy className="w-12 sm:w-16 h-12 sm:h-16 text-junina-yellow-400 mx-auto mb-4" />
        <h3 className="text-xl sm:text-2xl font-bold text-junina-yellow-400 mb-4 font-poetsen">
          Quiz Concluído!
        </h3>
        <p className="text-white font-poppins mb-4">
          Você acertou {score} de {questions.length} perguntas!
        </p>
        <Button
          onClick={handleClose}
          className="w-full bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold"
        >
          Finalizar
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-effect p-4 sm:p-6 rounded-2xl max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-junina-yellow-400 mb-2 font-poetsen">
          Quiz Junino
        </h3>
        <p className="text-white font-poppins mb-4 text-sm sm:text-base">
          Pergunta {currentQuestion + 1} de {questions.length}
        </p>
        <div className="w-full bg-junina-blue-800 rounded-full h-2 mb-4">
          <div 
            className="bg-junina-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg sm:text-xl text-white font-poppins mb-4 text-center">
          {questions[currentQuestion].question}
        </h4>
        
        <div className="space-y-3">
          {questions[currentQuestion].answers.map((answer, index) => {
            let buttonClass = "w-full p-3 sm:p-4 text-left rounded-lg border transition-all duration-200 font-poppins text-sm sm:text-base ";
            
            if (!isAnswered) {
              buttonClass += "border-junina-yellow-400/30 text-white hover:bg-junina-yellow-400/20 hover:border-junina-yellow-400";
            } else {
              if (index === questions[currentQuestion].correct) {
                buttonClass += "border-junina-green-400 bg-junina-green-400/20 text-junina-green-400";
              } else if (index === selectedAnswer) {
                buttonClass += "border-junina-red-400 bg-junina-red-400/20 text-junina-red-400";
              } else {
                buttonClass += "border-junina-yellow-400/30 text-white/60";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className={buttonClass}
                disabled={isAnswered}
              >
                <div className="flex items-center justify-between">
                  <span>{answer}</span>
                  {isAnswered && index === questions[currentQuestion].correct && (
                    <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-junina-green-400" />
                  )}
                  {isAnswered && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                    <XCircle className="w-4 sm:w-5 h-4 sm:h-5 text-junina-red-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <p className="text-white font-poppins text-sm sm:text-base mb-4">
          Pontuação: {score}/{questions.length}
        </p>
        <Button
          onClick={handleClose}
          variant="outline"
          size="sm"
          className="border-junina-red-400 text-junina-red-400 hover:bg-junina-red-400 hover:text-white"
        >
          Fechar
        </Button>
      </div>
    </div>
  );
};

export default QuizGame;
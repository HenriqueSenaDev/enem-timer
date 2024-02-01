import { ITimerQuestionOption } from '../../types/timer';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QuestionTimeModal from './components/question-time-modal';
import QuantityModal from './components/quantity-modal';
import TimerArea from './components/timer-area';
import './styles.css';

function Questions() {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState<boolean>(true);
  const [questionsQuantity, setQuestionsQuantity] = useState<number>(0);
  const [timeOption, setTimeOption] = useState<ITimerQuestionOption>({
    description: '',
    timeLabel: '',
    milisseconds: 0,
  });

  const { pathname } = useLocation();

  const isInfinity = useRef<boolean>(pathname === '/questions/infinity');

  return (
    <div className='questions-wrapper'>
      {isTimeModalOpen && (
        <QuestionTimeModal
          setIsTimeModalOpen={setIsTimeModalOpen}
          setTimeOption={setTimeOption}
        />
      )}

      {(!isInfinity.current && !questionsQuantity) && (
        <QuantityModal setQuantity={setQuestionsQuantity} />
      )}

      <div className='questions-container'>
        <div className='questions-header'>
          <h1>
            {isInfinity.current
              ? 'Questões Infinitas'
              : `${questionsQuantity}
              quest${questionsQuantity > 1 ? 'ões' : 'ão'}`
            }
          </h1>

          <p>{timeOption.description}</p>
        </div>

        <TimerArea
          milisPerQuestion={timeOption.milisseconds}
          isTimeModalOpen={isTimeModalOpen}
          questionsQuantity={questionsQuantity}
        />
      </div>
    </div>
  );
}

export default Questions;

import { ITimerQuestionOption } from '../../types/timer';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QuestionTimeModal from './components/question-time-modal';
import QuantityModal from './components/quantity-modal';
import TimerArea from './components/timer-area';
import './styles.css';

function Questions() {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState<boolean>(true);
  const [timeOption, setTimeOption] = useState<ITimerQuestionOption>({
    description: '',
    timeLabel: '',
    milisseconds: 0,
    questionsQuantity: undefined,
  });

  const { pathname } = useLocation();

  const isInfinity = useRef<boolean>(pathname === '/questions/infinity');

  function handleSetQuantity(qnt: number) {
    setTimeOption(prev => ({
      ...prev,
      questionsQuantity: qnt
    }));
  }

  return (
    <div className='questions-wrapper'>
      {isTimeModalOpen && (
        <QuestionTimeModal
          setIsTimeModalOpen={setIsTimeModalOpen}
          setTimeOption={setTimeOption}
        />
      )}

      {(!isInfinity.current && !timeOption.questionsQuantity) && (
        <QuantityModal setQuantity={handleSetQuantity} />
      )}

      <div className='questions-container'>
        <div className='questions-header'>
          <h1>
            {isInfinity.current
              ? 'Questões Infinitas'
              : `${timeOption.questionsQuantity || 0} questões`
            }
          </h1>

          <p>{timeOption.description}</p>
        </div>

        <TimerArea
          milisPerQuestion={timeOption.milisseconds}
          questionsQuantity={timeOption.questionsQuantity}
          isTimeModalOpen={isTimeModalOpen}
          isInfinity={isInfinity.current}
        />
      </div>
    </div>
  );
}

export default Questions;

import { ITimerQuestionOption } from '../../types/timer';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QuestionTimeModal from './components/question-time-modal';
import QuantityModal from './components/quantity-modal';
import TimerArea from './components/timer-area';

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
    <div className='flex justify-center items-center flex-col'>
      {isTimeModalOpen && (
        <QuestionTimeModal
          setIsTimeModalOpen={setIsTimeModalOpen}
          setTimeOption={setTimeOption}
        />
      )}

      {(!isInfinity.current && !timeOption.questionsQuantity) && (
        <QuantityModal setQuantity={handleSetQuantity} />
      )}

      <div className='w-full px-[22px] pt-[22px] pb-9 min-h-[100vh] flex flex-col items-center lg:pt-8 lg:pb-[5%] lg:max-w-[900px] xl:max-w-[1000px] 2xl:max-w-[1160px]'>
        <div className='self-baseline'>
          <h1 className='text-lg font-normal mb-2 lg:text-2xl'>
            {isInfinity.current
              ? 'Questões Infinitas'
              : `${timeOption.questionsQuantity || 0} questões`
            }
          </h1>

          <p className='text-xs lg:text-[15px]'>
            {timeOption.description}
          </p>
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

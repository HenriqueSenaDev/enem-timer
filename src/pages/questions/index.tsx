import { ITimerQuestionOption } from '../../types/timer';
import { useState } from 'react';
import QuestionTimeModal from './components/question-time-modal';
import TimerArea from './components/timer-area';
import './styles.css';

function Questions() {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState<boolean>(true);
  const [timeOption, setTimeOption] = useState<ITimerQuestionOption>({
    description: '',
    timeLabel: '',
    milisseconds: 0,
  });

  return (
    <div className='questions-wrapper'>
      {isTimeModalOpen && (
        <QuestionTimeModal
          setIsTimeModalOpen={setIsTimeModalOpen}
          setTimeOption={setTimeOption}
        />
      )}

      <div className='questions-container'>
        <div className='questions-header'>
          <h1>Questões Infinitas</h1>

          <p>{timeOption.description}</p>
        </div>

        <TimerArea
          milisPerQuestion={timeOption.milisseconds}
          isTimeModalOpen={isTimeModalOpen}
        />
      </div>
    </div>
  );
}

export default Questions;

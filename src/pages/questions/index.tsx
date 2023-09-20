import { useContext, useState } from 'react';
import { TimerContext } from '../../contexts/timer';
import QuestionTimeModal from './components/question-time-modal';
import TimerArea from './components/timer-area';
import './styles.css';

function Questions() {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState<boolean>(true);

  const { timeOptionInfo } = useContext(TimerContext);

  return (
    <div className='questions-wrapper'>
      {isTimeModalOpen && <QuestionTimeModal setIsTimeModalOpen={setIsTimeModalOpen}/>}

      <div className='questions-container'>
        <div className='questions-header'>
          <h1>Questões Infinitas</h1>

          <p>{timeOptionInfo?.timeSpecification || 'Indefinido'}</p>
        </div>

        <TimerArea />
      </div>
    </div>
  );
}

export default Questions;

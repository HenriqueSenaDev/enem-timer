import { useEffect, useState } from 'react';
import QuestionTimeModal from './components/question-time-modal';
import TimerArea from './components/timer-area';
import './styles.css';

function Questions() {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState<boolean>(true);
  const [questionSpecification, setQuestionSpecification] = useState<string | null>(null);
  const [secondsPerQuestion, setSecondsPerQuestion] = useState<number | null>(null);

  function getSecondsPerQuestion() {
    const timeString = questionSpecification!.split('-')[1];
    const timeWithoutExtraNote = timeString.split('(')[0];
    const [minutes, seconds] = timeWithoutExtraNote.split('m');

    setSecondsPerQuestion(Number(minutes) * 60 + Number(seconds));
  }

  useEffect(() => {
    if (questionSpecification) getSecondsPerQuestion();
  }), [questionSpecification];

  return (
    <div className='questions-wrapper'>
      {isTimeModalOpen && (
        <QuestionTimeModal
          setIsTimeModalOpen={setIsTimeModalOpen}
          questionSpecification={questionSpecification}
          setQuestionSpecification={setQuestionSpecification}
        />
      )}

      <div className='questions-container'>
        <div className='questions-header'>
          <h1>Questões Infinitas</h1>

          <p>{questionSpecification || 'Indefinido'}</p>
        </div>

        <TimerArea secondsPerQuestion={secondsPerQuestion} />
      </div>
    </div>
  );
}

export default Questions;

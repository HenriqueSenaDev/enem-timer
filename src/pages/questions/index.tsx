import { useEffect, useState } from 'react';
import QuestionTimeModal from './components/question-time-modal';
import TimerArea from './components/timer-area';
import './styles.css';

function Questions() {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState<boolean>(true);
  const [questionSpecification, setQuestionSpecification] = useState<string | null>(null);
  const [milissecondsPerQuestion, setMilissecondsPerQuestion] = useState<number | null>(null);

  function getMilissecondsPerQuestion() {
    const timeString = questionSpecification!.split('-')[2];
    const timeWithoutExtraNote = timeString.split('(')[0];
    const [minutes, seconds] = timeWithoutExtraNote.split('m');

    setMilissecondsPerQuestion((Number(minutes) * 60 + Number(seconds)) * 1000);
  }

  useEffect(() => {
    if (questionSpecification) getMilissecondsPerQuestion();
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

        <TimerArea milissecondsPerQuestion={milissecondsPerQuestion} />
      </div>
    </div>
  );
}

export default Questions;

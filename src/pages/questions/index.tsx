import { useEffect, useState } from 'react';
import Button from '../../components/button';
import Timer from './components/timer';
import TimeTable from './components/timetable';
import QuestionTimeModal from './components/question-time-modal';
import './styles.css';

interface QuestionTime {
  general: string;
  current: string;
}

function Questions() {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState<boolean>(true);
  const [questionSpecification, setQuestionSpecification] = useState<string | null>(null);
  const [secondsPerQuestion, setSecondsPerQuestion] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [questionsTime, setQuestionsTime] = useState<QuestionTime[]>([]);

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

        <div className='timer-area'>
          <Timer />

          <TimeTable questionsTime={questionsTime} />

          <div className='timer-buttons'>
            {isRunning ? (
              <div className='timer-options-area'>
                <div className='options-row'>
                  <Button
                    text='Resetar questão'
                    shortcut='R'
                    onClick={() => {}}
                  />

                  <Button
                    text='Próxima questão'
                    shortcut='Space Bar'
                    onClick={() => {}}
                  />
                </div>

                <div className='options-row'>
                  <Button
                    text='Esconder tabela'
                    shortcut='T'
                    onClick={() => {}}
                  />

                  <Button
                    text='Finalizar'
                    primary
                    shortcut='Enter'
                    onClick={() => setIsRunning(false)}
                  />
                </div>
              </div>
            ) : (
              <Button
                text='Iniciar'
                primary
                shortcut='Enter'
                onClick={() => setIsRunning(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;

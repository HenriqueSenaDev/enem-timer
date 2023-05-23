import { useState } from 'react';
import Button from '../../components/button';
import Timer from './components/timer';
import TimeTable from './components/timetable';
import QuestionTimeModal from './components/question-time-modal';
import './styles.css';

function Questions() {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState<boolean>(true);
  const [questionSpecification, setQuestionSpecification] = useState<
    string | null
  >(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

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

          <TimeTable />

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
                    onClick={() => {}}
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

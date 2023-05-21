import { useState } from 'react';
import Button from '../../components/button';
import Timer from './components/timer';
import TimeTable from './components/timetable';
import './styles.css';

function Questions() {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  return (
    <div className='questions-wrapper'>
      <div className='questions-container'>
        <div className='questions-header'>
          <h1>Questões Infinitas</h1>

          <p>Enem 1º dia (com 1h30 de Redação) - 2m30s</p>
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

import { useRef, useState } from 'react';
import { ITimerQuestionOption } from '../../../../types/timer';
import { questionTimeMask, timeLabelToMilis } from './utils/components';
import Button from '../../../../components/button';
import './styles.css';

interface IProps {
  setIsTimeModalOpen: (conditional: boolean) => void;
  setTimeOption: (option: ITimerQuestionOption) => void;
}

function QuestionTimeModal({ setIsTimeModalOpen, setTimeOption }: IProps) {
  const [customTime, setCustomTime] = useState('');

  const chosenOptionRef = useRef<ITimerQuestionOption>();

  const options: ITimerQuestionOption[] = [
    {
      description: 'Enem 1º dia | Linguagens e Humanas (1h30 de Redação): 2m30.',
      timeLabel: '02m30',
      milisseconds: 2.5 * 60 * 1000
    },
    {
      description: 'Enem 1º dia | Linguagens e Humanas (1h00 de Redação): 3m00.',
      timeLabel: '03m00',
      milisseconds: 3 * 60 * 1000
    },
    {
      description: 'Enem 2º dia | Natureza e Matemática: 3m15.',
      timeLabel: '03m15',
      milisseconds: 3.25 * 60 * 1000
    },
  ];

  function closeModal() {
    if (!chosenOptionRef.current)
      return alert('Selecione ou insira uma duração por questão.');

    setIsTimeModalOpen(false);
  }

  function handleCustomTime(input: string) {
    const time = questionTimeMask(input);
    setCustomTime(time);

    chosenOptionRef.current = {
      description: `Customizado: ${time}`,
      timeLabel: time,
      milisseconds: timeLabelToMilis(time)
    }
  }

  function handleConfirm() {
    const chosen = chosenOptionRef.current as ITimerQuestionOption;
    const regex = /^\d{2}m\d{2}$/;

    if (!regex.exec(chosen.timeLabel)) {
      alert('Valor inválido.');
      return setCustomTime('');
    }

    setTimeOption(chosen);
    closeModal();
  }

  return (
    <div className='question-time-modal-wrapper'>
      <div className='question-time-modal'>
        <h1>Média por questão</h1>

        <div className='question-time-options'>
          {options.map(option => (
            <button
              key={option.milisseconds}
              className='time-option'
              onClick={() => {
                chosenOptionRef.current = option;
              }}
            >
              <h1>{option.description}</h1>

              <span>{option.timeLabel}</span>
            </button>
          ))}

          <button className='time-option'>
            <h1>Customizado</h1>

            <input
              type="text"
              placeholder='00m00'
              value={customTime}
              maxLength={5}
              onChange={evt => handleCustomTime(evt.target.value)}
            />
          </button>
        </div>

        <Button
          text='Confirmar'
          style={{ backgroundColor: '#120080' }}
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
}

export default QuestionTimeModal;

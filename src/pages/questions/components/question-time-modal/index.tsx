import { useRef } from 'react';
import { ITimerQuestionOption } from '../../../../types/timer';
import Button from '../../../../components/button';
import './styles.css';

interface IProps {
  setIsTimeModalOpen: (conditional: boolean) => void;
  setTimeOption: (option: ITimerQuestionOption) => void;
}

function QuestionTimeModal({ setIsTimeModalOpen, setTimeOption }: IProps) {
  const isChosen = useRef<boolean>(false);

  const options: ITimerQuestionOption[] = [
    {
      description: 'Enem 1º dia | Linguagens e Humanas (1h30 de Redação): 2m30.',
      timeLabel: '2m30',
      milisseconds: 2.5 * 60 * 1000
    },
    {
      description: 'Enem 1º dia | Linguagens e Humanas (1h00 de Redação): 3m00.',
      timeLabel: '3m00',
      milisseconds: 3 * 60 * 1000
    },
    {
      description: 'Enem 2º dia | Natureza e Matemática: 3m15.',
      timeLabel: '3m15',
      milisseconds: 3.25 * 60 * 1000
    },
  ];

  function closeModal() {
    if (!isChosen.current)
      return alert('Selecione ou insira uma duração por questão.');

    setIsTimeModalOpen(false);
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
                isChosen.current = true;
                setTimeOption(option);
              }}
            >
              <h1>{option.description}</h1>

              <span>{option.timeLabel}</span>
            </button>
          ))}
        </div>

        <Button
          text='Confirmar'
          style={{ backgroundColor: '#120080' }}
          onClick={closeModal}
        />
      </div>
    </div>
  );
}

export default QuestionTimeModal;

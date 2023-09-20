import { useContext } from 'react';
import { TimerContext } from '../../../../contexts/timer';
import Button from '../../../../components/button';
import TimeOption from './components/time-option';
import './styles.css';

interface IProps {
  setIsTimeModalOpen: (conditional: boolean) => void;
}

function QuestionTimeModal({ setIsTimeModalOpen }: IProps) {
  const { timeOptionInfo } = useContext(TimerContext);

  function closeModal() {
    if (!timeOptionInfo)
      return alert('Selecione ou insira uma duração por questão.');

    setIsTimeModalOpen(false);
  }

  return (
    <div className='question-time-modal-wrapper'>
      <div className='question-time-modal'>
        <h1>Média por questão</h1>

        <div className='question-time-options'>
          <TimeOption
            title='Enem 2009 - 2023'
            description='1º dia (Linguagens e Humanas)'
            extraNote='1h30 de Redação'
            time='2m30'
          />

          <TimeOption
            title='Enem 2009 - 2023'
            description='1º dia (Linguagens e Humanas)'
            extraNote='1h00 de Redação'
            time='3m00'
          />

          <TimeOption
            title='Enem 2009 - 2023'
            description='2º dia (Matemática e Natureza)'
            extraNote=''
            time='3m15'
          />
        </div>

        <Button
          text='Confirmar'
          shortcut=''
          primary
          onClick={closeModal}
        />
      </div>
    </div>
  );
}

export default QuestionTimeModal;

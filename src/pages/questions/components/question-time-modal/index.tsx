import { useState } from 'react';
import Button from '../../../../components/button';
import TimeOption from './components/time-option';
import './styles.css';

interface IProps {
  setIsTimeModalOpen: (conditional: boolean) => void;
  questionSpecification: string | null;
  setQuestionSpecification: (newQuestionSpecification: string) => void;
}

function QuestionTimeModal({
  setIsTimeModalOpen,
  questionSpecification,
  setQuestionSpecification,
}: IProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function closeModal() {
    if (!questionSpecification)
      return alert('Selecione ou insira uma duração por questão.');

    setIsTimeModalOpen(false);
  }

  function checkOutClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.target === document.querySelector('.question-time-modal-wrapper')) {
      closeModal();
    }
  }

  return (
    <div className='question-time-modal-wrapper' onClick={checkOutClick}>
      <div className='question-time-modal'>
        <h1>Média por questão</h1>

        <div className='question-time-options'>
          <TimeOption
            title='Enem 2009 - 2023'
            description='1º dia (Linguagens e Humanas)'
            extraNote='1h30 de Redação'
            time='2m30'
            index={1}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setQuestionSpecification={setQuestionSpecification}
          />

          <TimeOption
            title='Enem 2009 - 2023'
            description='1º dia (Linguagens e Humanas)'
            extraNote='1h00 de Redação'
            time='3m00'
            index={2}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setQuestionSpecification={setQuestionSpecification}
          />

          <TimeOption
            title='Enem 2009 - 2023'
            description='2º dia (Matemática e Natureza)'
            extraNote=''
            time='3m15'
            index={3}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setQuestionSpecification={setQuestionSpecification}
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

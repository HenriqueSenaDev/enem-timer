import { useRef, useState } from 'react';
import { ITimerQuestionOption } from '../../../../types/timer';
import { questionTimeMask } from '../../../../utils/masks/questions';
import { unformatQuestionMillis } from '../../../../utils/unformatters/questions';
import Button from '../../../../components/button';

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
      milisseconds: unformatQuestionMillis(time)
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
    <div className='w-full h-full flex items-center justify-center absolute bg-[rgba(0,0,0,0.3)] z-[2] p-5'>
      <div className='w-full max-w-[342px] bg-[#080C33] rounded-[10px] flex flex-col items-center justify-center pt-[22px] pb-[26px] lg:py-[30px] lg:px-0 lg:max-w-[540px]'>
        <h1 className='text-base font-normal lg:text-[19px]'>
          Média por questão
        </h1>

        <div className='w-full my-[22px] flex flex-col items-center justify-center cursor-pointer lg:mt-9 lg:mb-10'>
          {options.map(option => (
            <button
              key={option.milisseconds}
              className="w-full flex justify-between items-center py-[10px] px-7 bg-[#080C33] text-[white] outline-none border-none cursor-pointer font-['Montserrat'] lg:py-5 lg:px-7 focus:bg-[#121a62] hover:bg-[#121a62]"
              onClick={() => {
                chosenOptionRef.current = option;
              }}
            >
              <h1 className='text-sm text-left max-w-[170px] lg:text-base lg:max-w-[unset]'>
                {option.description}
              </h1>

              <span className='text-[15px] font-light underline underline-offset-4'>
                {option.timeLabel}
              </span>
            </button>
          ))}

          <button className="w-full flex justify-between items-center py-[10px] px-7 bg-[#080C33] text-[white] outline-none border-none cursor-pointer font-['Montserrat'] lg:py-5 lg:px-7 focus:bg-[#121a62] hover:bg-[#121a62]">
            <h1 className='text-sm text-left max-w-[170px] lg:text-base lg:max-w-[unset]'>
              Customizado
            </h1>

            <input
              className="max-w-[75px] flex justify-center items-center p-[10px] bg-[#13174B] text-white text-sm outline-none border-none rounded-[15px] font-['Montserrat']"
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

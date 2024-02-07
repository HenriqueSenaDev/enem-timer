import { useRef, useState } from "react";
import { IEssayTimeOption } from "../../../../types/essay";
import { essayTimeMask } from "../../../../utils/masks/essay";
import { unformatEssayMillis } from "../../../../utils/unformatters/essay";
import Button from "../../../../components/button";

interface IProps {
  setTimeOption: (option: IEssayTimeOption) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

function EssayTimeModal({ setTimeOption, setIsModalOpen }: IProps) {
  const [customTime, setCustomTime] = useState('');

  const chosenOptionRef = useRef<IEssayTimeOption>();

  const options: IEssayTimeOption[] = [
    {
      milliseconds: 1.5 * 60 * 60 * 1000,
      timeLabel: '1h30'
    },
    {
      milliseconds: 60 * 60 * 1000,
      timeLabel: '1h00'
    }
  ];

  function closeModal() {
    if (!chosenOptionRef.current)
      return alert('Selecione ou insira uma duração por questão.');

    setIsModalOpen(false);
  }

  function handleCustomTime(input: string) {
    const time = essayTimeMask(input);
    setCustomTime(time);

    chosenOptionRef.current = {
      timeLabel: time,
      milliseconds: unformatEssayMillis(time),
    }
  }

  function handleConfirm() {
    const chosen = chosenOptionRef.current as IEssayTimeOption;
    const regex = /^\d{1}h\d{2}$/;

    if (!regex.exec(chosen.timeLabel)) {
      alert('Valor inválido.');
      return setCustomTime('');
    }

    setTimeOption(chosen);
    closeModal();
  }

  return (
    <div className='w-full h-full flex items-center justify-center absolute bg-[rgba(0,0,0,0.3)] z-[2] p-5'>
      <div className='w-full max-w-[342px] bg-[#080C33] rounded-[10px] flex flex-col items-center justify-center pt-[22px] pb-[26px] lg:py-[30px] lg:px-0'>
        <h1 className='text-base font-normal mb-5 lg:text-[19px]'>
          Tempo de Redação
        </h1>

        <div className='w-full flex flex-col items-center justify-center cursor-pointer'>
          {options.map(option => (
            <button
              key={option.milliseconds}
              className="w-full flex justify-between items-center py-[10px] px-7 bg-[#080C33] text-[white] outline-none border-none cursor-pointer font-['Montserrat'] lg:py-5 focus:bg-[#121a62] hover:bg-[#121a62]"
              onClick={() => chosenOptionRef.current = option}
            >
              <h1 className='text-sm text-left max-w-[170px] lg:text-base lg:max-w-[unset]'>
                Tempo de Redação:
              </h1>

              <span className='text-[15px] font-light underline underline-offset-4'>
                {option.timeLabel}
              </span>
            </button>
          ))}
        </div>

        <button className="w-full flex justify-between items-center py-[10px] px-7 bg-[#080C33] text-[white] outline-none border-none cursor-pointer font-['Montserrat'] lg:px-7 focus:bg-[#121a62] hover:bg-[#121a62]">
          <h1 className='text-sm text-left max-w-[170px] lg:text-base lg:max-w-[unset]'>
            Customizado
          </h1>

          <input
            className="max-w-[75px] flex justify-center items-center p-[10px] bg-[#13174B] text-white text-sm outline-none border-none rounded-[15px] font-['Montserrat']"
            type="text"
            placeholder='0h00'
            value={customTime}
            maxLength={4}
            onChange={evt => handleCustomTime(evt.target.value)}
          />
        </button>

        <Button
          text='Confirmar'
          style={{ backgroundColor: '#120080', marginTop: 16 }}
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
}

export default EssayTimeModal;

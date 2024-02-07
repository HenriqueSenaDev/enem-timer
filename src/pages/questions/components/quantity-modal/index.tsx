import { useState } from "react";
import Button from "../../../../components/button";

interface IProps {
  setQuantity: (quantity: number) => void;
}

function QuantityModal({ setQuantity }: IProps) {
  const [inputValue, setInputValue] = useState<string>('1');

  function handleConfirm() {
    const amount = (Number(inputValue));
    if (isNaN(amount)) return alert('Insira um número válido.');

    if (amount <= 0 || amount > 100)
      return alert('Insira um número de 1 a 100.');

    setQuantity(amount);
  }

  return (
    <div className='w-full h-full flex items-center justify-center absolute bg-[rgba(0,0,0,0.3)] z-[1] p-5'>
      <div className='w-full max-w-[300px] bg-[#080C33] rounded-[10px] flex flex-col items-center justify-center py-[30px] lg:max-w-[320px]'>
        <div className='flex items-center gap-5 mb-5'>
          <h1 className='text-base font-normal text-center lg:text-[19px]'>
            Questões:
          </h1>

          <input
            className="max-w-[70px] flex items-center justify-center p-[10px] bg-[#13174B] text-white text-sm outline-none border-none rounded-[15px] font-['Montserrat']"
            type='number'
            value={inputValue}
            onChange={(evt) => {
              setInputValue(evt.target.value);
            }}
          />
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

export default QuantityModal;

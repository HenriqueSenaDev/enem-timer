import { useState } from "react";
import Button from "../../../../components/button";
import './styles.css';

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
    <div className='quantity-modal-wrapper'>
      <div className='quantity-modal'>
        <div className='quantity-modal-content'>
          <h1>Questões:</h1>

          <input
            type="number"
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

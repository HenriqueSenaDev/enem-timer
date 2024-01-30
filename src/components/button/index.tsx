import { ComponentProps } from 'react';
import './styles.css';

interface IProps extends ComponentProps<'button'> {
  text: string;
  shortcut?: string;
}

function Button({ text, shortcut, ...rest }: IProps) {
  return (
    <div className='button-wrapper'>
      <button {...rest}>
        {text}
      </button>

      <span>{shortcut}</span>
    </div>
  );
}

export default Button;

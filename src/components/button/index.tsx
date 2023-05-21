import './styles.css';

interface IProps {
  text: string;
  shortcut: string;
  primary?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ text, shortcut, primary, onClick }: IProps) {
  return (
    <div className='button-wrapper'>
      <button
        onClick={onClick}
        style={primary ? { backgroundColor: '#120080' } : {}}
      >
        {text}
      </button>

      <span>{shortcut}</span>
    </div>
  );
}

export default Button;

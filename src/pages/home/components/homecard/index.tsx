import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

interface IHomeCardProps {
  header: string,
  imgSource: string,
  items: string[],
  linkTo: string,
  style?: CSSProperties
}

function HomeCard({ header, imgSource, items, linkTo, style }: IHomeCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className='home-card'
      style={style || {}}
      onClick={() => navigate(linkTo)}
    >
      <h1>{header}</h1>

      <div className='home-card-img-area'>
        <div className="home-card-blur" />

        <img src={imgSource} alt={header} />
      </div>

      <ul className='home-card-items'>
        {items.map(item => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  );
}

export default HomeCard;

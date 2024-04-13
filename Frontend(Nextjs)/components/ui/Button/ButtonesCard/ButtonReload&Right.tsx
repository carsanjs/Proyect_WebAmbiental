import './buttonreload&right.css';
import { ReactNode, MouseEvent } from 'react';

interface ButtonRRProps {
  svg: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ButtonRR: React.FC<ButtonRRProps> = ({ svg, onClick }) => {
  return (
    <div>
      <button onClick={onClick} type="submit" className="button">
        <div className="button-box">
          <span className="button-elem">{svg}</span>
        </div>
      </button>
    </div>
  );
};

export default ButtonRR;


interface ButtonProps {
  onClick: () => void;
  text: string;
  view: string;
};

const Button = ({ onClick, text, view }: ButtonProps) => {
  return <button className={text === view ? 'active-button' : ''} onClick={onClick}>{text}</button>;
};


export default Button;
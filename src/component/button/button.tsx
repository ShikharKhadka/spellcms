const Button = ({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) => {
  return (
    <button onClick={onClick} type="submit" className=" px-4 py-2 rounded">
      {title}
    </button>
  );
};

export default Button;

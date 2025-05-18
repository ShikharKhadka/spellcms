const Button = ({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) => {
  return (
    <button  className="px-4 py-2 rounded" onClick={onClick} type="submit">
      {title}
    </button>
  );
};

export default Button;

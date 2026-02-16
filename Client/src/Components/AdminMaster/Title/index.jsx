import './index.css'

const Title = ({ text1, text2 }) => {
  return (
    <h1 className="title-admin">
      {text1} <span className="title">{text2}</span>
    </h1>
  );
};

export default Title
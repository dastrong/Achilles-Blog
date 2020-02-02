import React from 'react';

type Props = {
  handleClick?: () => void;
  content: string;
};

const styles = {
  outline: 'none',
  border: 'none',
  margin: '10px auto',
  height: '50px',
  padding: '15px 20px',
  borderRadius: '30px',
  fontSize: '1em',
  lineHeight: '100%',
  backgroundColor: '#f7eeab',
  boxShadow: '-1px -1px 4px #828180, 1px 1px 1px #8b9457',
  cursor: 'pointer',
};

const Button = ({ handleClick, content }: Props) => (
  <button style={styles} onClick={handleClick}>
    {content}
  </button>
);

export default Button;

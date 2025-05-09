import React from "react";

interface IconButtonProps {
  icon: React.ReactElement;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, style }) => {
  return (
    <button onClick={onClick} style={style}>
      {icon}
    </button>
  );
};

export default IconButton;

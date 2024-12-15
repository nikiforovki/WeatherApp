import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureScale } from '../../Redux/actions/actions'; // Убедитесь, что путь указан правильно
import { selectTemperatureScale } from '../../Redux/slice/'; // И здесь тоже

const ToggleContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 163px;
  height: 38px;
  left: 1132px;
  top: 32px;
  background: #ffffff;
  border-radius: 29px;
  padding: 5px;
  cursor: pointer;
`;

const ActiveToggleButton = styled.button`
  width: 12px;
  height: 22px;
  color: rgba(19, 38, 74, 0.2);
  border: none;
  border-radius: 29px;
  padding: 5px 10px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  background: none;
`;

const InactiveToggleButton = styled.button`
  width: 12px;
  height: 22px;
  color: rgb(26, 175, 224);
  border: none;
  border-radius: 29px;
  padding: 5px 10px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  background: none;
`;

const SlashButton = styled.button`
  width: 12px;
  height: 21px;
  color: rgb(16, 16, 16);
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  background: none;
`;

export const TemperatureScaleToggle = ({
  onScaleChange,
}: {
  onScaleChange: (scale: 'C' | 'F') => void;
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onScaleChange(isActive ? 'C' : 'F');
  };

  return (
    <ToggleContainer onClick={handleClick}>
      {isActive ? (
        <ActiveToggleButton>C</ActiveToggleButton>
      ) : (
        <InactiveToggleButton>C</InactiveToggleButton>
      )}
      <SlashButton>/</SlashButton>
      {!isActive ? (
        <ActiveToggleButton>F</ActiveToggleButton>
      ) : (
        <InactiveToggleButton>F</InactiveToggleButton>
      )}
    </ToggleContainer>
  );
};

import React, { useState } from 'react';
import styled from 'styled-components';
import IconSearch from '../../../public/assets/images/IconSearch';
import Downshift from 'downshift';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 38px;
  margin-left: 71px;
  width: 912px;
  height: 27px;
  box-sizing: border-box;
  background-color: transparent;
`;

const StyledInput = styled.input`
  position: fixed;
  border-bottom: 1px solid #ffffff;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 4px;
  width: 912px;
  height: 27px;
  box-sizing: border-box;
  background-color: transparent;
  padding-left: 30px;
`;

const StyledIconSearch = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  margin-left: 890px;
  margin-top: 5px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
`;

const CityItem = styled.div`
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const InputSearch: React.FC<{
  onCityChange: (city: string) => void;
}> = ({ onCityChange }) => {
  const [inputValue, setInputValue] = useState('');
  const cities = ['Москва', 'Санкт-Петербург', 'Екатеринбург'];

  return (
    <SearchContainer>
      <Downshift
        onChange={(selectedOption) => {
          if (selectedOption) {
            onCityChange(selectedOption.label);
          }
        }}
        itemToString={(item) => (item ? item.label : '')}
      >
        {({
          getInputProps,
          getMenuProps,
          getLabelProps,
          isOpen,
          highlightedIndex,
          selectedItem,
          getItemProps,
        }) => (
          <>
            <StyledInput
              {...getInputProps()}
              value={inputValue}
              onChange={({ target }) => setInputValue(target.value)}
            />
            <StyledIconSearch>
              <IconSearch />
            </StyledIconSearch>
            <Dropdown {...getMenuProps()}>
              {isOpen &&
                cities.map((city, index) => (
                  <CityItem
                    {...getItemProps({
                      key: city,
                      index,
                      item: { label: city },
                    })}
                    style={{
                      backgroundColor:
                        index === highlightedIndex ? 'lightgray' : null,
                    }}
                  >
                    {city}
                  </CityItem>
                ))}
            </Dropdown>
          </>
        )}
      </Downshift>
    </SearchContainer>
  );
};

import React from 'react'
import styled from 'styled-components'
import ArrowDown from '~/components/icons/arrow-down'
import ArrowUp from '~/components/icons/arrow-up'

const ToggleWrapper = styled.div`
  padding: 20px;
`
const ToggleButton = styled.button`
  transition: all 0.3s ease-in-out;
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ color, theme }) =>
    color ? theme.backgroundColor[color] : theme.backgroundColor.blue};
  font-weight: 700;
  padding: 20px;
  border-color: ${({ theme }) => theme.borderColor.black};
  border-style: solid;
  border-width: 4px;
  position: relative;

  &::before,
  &::after {
    position: absolute;
    content: '';
    transition: all 0.3s ease-in-out;
    background-color: ${({ color, theme }) =>
      color ? theme.textColor[color] : theme.textColor.blue};
  }
  &::before {
    bottom: -14px;
    height: 10px;
    width: calc(100% + 8px);
    left: 0.8px;
    transform: skewX(45deg);
    box-shadow: inset 0px -4px 0px #000000, inset 4px 0px 0px #000000,
      inset -4px 0px 0px #000000;
  }
  &::after {
    right: -14px;
    height: calc(100% + 8px);
    width: 10px;
    top: 1.2px;
    transform: skewY(45deg);
    box-shadow: inset 0px 4px 0px #000000, inset -4px 0px 0px #000000;
  }

  &:active {
    margin-left: 10px;
    margin-top: 10px;
    &::before {
      bottom: -5px;
      height: 0px;
      left: 3px;
    }

    &::after {
      right: -5px;
      width: 0px;
      bottom: -3px;
    }
  }
  ${
    /**
     *
     * @param {Object} props
     * @param {boolean} props.isActive
     */
    ({ isActive }) =>
      isActive &&
      `  
    margin-left: 10px;
    margin-top: 10px;
    &::before {
      bottom: -5px;
      height: 0px;
      left: 3px;
    }
    &::after {
      right: -5px;
      width: 0px;
      bottom: -3px;
    }
    `
  }
`

const ToggleText = styled.div`
  font-size: 28px;
  line-height: 1.3;
  color: ${({ theme }) => theme.textColor.white};
`
const ToggleIcon = styled.span`
  flex-shrink: 0;
  width: 24px;
  height: 20px;
  path {
    fill: ${({ theme }) => theme.backgroundColor.black};
  }
`

/**
 *
 * @param {Object} props
 * @param {string} props.color
 * @param {boolean} props.isActive
 * @param {Function} props.setActive
 * @param {string} props.id
 * @returns {React.ReactElement}
 */
export default function SectionToggle({ color, isActive, setActive, id }) {
  function toggle() {
    if (isActive) {
      setActive('')
    } else {
      setActive(id)
    }
  }

  return (
    <ToggleWrapper>
      <ToggleButton isActive={isActive} color={color} onClick={toggle}>
        <ToggleText>個人檔案</ToggleText>
        <ToggleIcon>{isActive ? <ArrowUp /> : <ArrowDown />}</ToggleIcon>
      </ToggleButton>
    </ToggleWrapper>
  )
}

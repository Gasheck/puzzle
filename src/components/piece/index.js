import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import img from './img.jpg';

const Piece = ({ left, top, width, height, id, onClick, sourceCoords, className }) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div
      onClick={handleClick}
      className={className}
    />
  );
};

Piece.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  sourceCoords: PropTypes.objectOf(PropTypes.number).isRequired,
  className: PropTypes.string,
};

Piece.defaultProps = {
  className: '',
};

export default styled(Piece)`
  background-image: url(${img});
  position: absolute;
  background-color: #333;
  box-shadow: inset 0 0 0 1px #666;
  font-size: 20px;
  background-size: 400%;
  font-weight: bold;
  color: #500;
  transform: translate(${props => props.left}px, ${props => props.top}px);
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-position-x: ${props => props.sourceCoords.column * -props.width}px;
  background-position-y: ${props => props.sourceCoords.row * -props.height}px;
  transition: 0.3s;
`;

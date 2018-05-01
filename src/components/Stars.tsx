import * as React from 'react';
import * as _ from 'lodash';
import styled, { keyframes } from 'styled-components';
import * as unquote from 'unquote';
import { BorderBlockStartColorProperty } from 'csstype';

const starFieldWidth = 2560;
const starFieldHeight = 2560;

const animation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const createStar = () => {
  return `${_.random(0, starFieldWidth)}px ${_.random(0, starFieldHeight)}px #FFFFFF`;
};

const createStars = (count: number) => {
  let starsArray = new Set();
  _.range(0, count).map(() => {
    starsArray.add(createStar());
  })
  return unquote(Array.from(starsArray).join(','));
};

type StarProps = {
  starWidth: number,
  starHeight: number,
  count: number,
};

const Stars = styled.div`
  width: ${(props: StarProps) => props.starWidth}px;
  height: ${(props: StarProps) => props.starHeight}px;
  background: transparent;
  border-radius: 50%;
  box-shadow: ${(props: StarProps) => createStars(props.count)};
`;

type StarAnimationProps = {
  animationSpeed: number,
  startSec: number,
};

const StarAnimation = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: transparent;
  animation: ${animation} ${(props: StarAnimationProps) => props.animationSpeed}s linear -${(props: StarAnimationProps) => props.startSec}s infinite;
`;

const Container = (props: StarProps) => {
  return (
    <StarAnimation animationSpeed={_.random(300, 500)} startSec={_.random(0, 2000)}>
      <Stars {...props} />
    </StarAnimation>
  );
};

export default Container;

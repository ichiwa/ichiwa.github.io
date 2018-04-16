import * as React from 'react';
import * as _ from 'lodash';
import styled, { keyframes } from 'styled-components';
import * as unquote from 'unquote';

const starFieldWidth = 2560;
const starFieldHeight = 2560;

const animation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

type Props = {
  starWidth: number,
  starHeight: number,
  count: number,
};

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

const Stars = styled.div`
  width: ${(props: Props) => props.starWidth}px;
  height: ${(props: Props) => props.starHeight}px;
  background: transparent;
  border-radius: 50%;
  box-shadow: ${(props: Props) => createStars(props.count)};
`;

const StarAnimation = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: transparent;
  animation: ${animation} 500s linear infinite;
`;

const Container = (props: Props) => {
  return (
    <StarAnimation>
      <Stars {...props} />
    </StarAnimation>
  );
};

export default Container;

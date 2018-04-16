import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import Stars from './components/Stars';

injectGlobal`
  html, body, #main {
    height: 100%;
    width: 100%;
    background: transparent;
    overflow: hidden;
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #020107 0%, #201b46 100%);
`;

const App = () => {
  return (
    <Background>
      <Stars starWidth={1} starHeight={1} count={1000} />
      <Stars starWidth={2} starHeight={2} count={1000} />
      <Stars starWidth={3} starHeight={3} count={1000} />
    </Background>
  );
}
ReactDOM.render(<App />, document.querySelector('#main'));

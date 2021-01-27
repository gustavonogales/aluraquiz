import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import { Widget } from '../src/components/Widget';
import { Footer } from '../src/components/Footer';
import { GitHubCorner } from '../src/components/GitHubCorner';
import { QuizBackground } from '../src/components/QuizBackground';
import { useCallback, useState } from 'react';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleInputChange = useCallback((event) => {
    setName(event.target.value);
  });

  const onHandleSubmit = useCallback((event) => {
    event.preventDefault();
    router.push(`/quiz?name=${name}`);
  });

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>The legend of Zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={onHandleSubmit}>
              <input onChange={handleInputChange} 
                placeholder='Preencha com seu nome'/>
              <button type="submit" disabled={!!!name}>
                Jogar {name}
              </button>
            </form>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/gustavonogales" />
    </QuizBackground>
  );
}

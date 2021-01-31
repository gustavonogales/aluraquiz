import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import { useCallback, useState } from 'react';

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
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>The legend of Zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={onHandleSubmit}>
              <Input 
                onChange={handleInputChange} 
                placeholder='Preencha com seu nome'
                name="nome"
                value={name}
              />
              <Button type="submit" disabled={!!!name}>
                Jogar {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/gustavonogales" />
    </QuizBackground>
  );
}

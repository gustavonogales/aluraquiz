import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import Link from '../src/components/Link';

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
        <Widget
          as={ motion.section }
          transition={{
            delay: 0,
            duration: 0.5 
          }}
          variants={{
            hidden: { opacity: 0, y: '100%' },
            show: { opacity: 1, y: '0' },
          }}
          initial="hidden"
          animate="show"
        >
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
        <Widget
          as={ motion.section }
          transition={{
            delay: 0,
            duration: 0.5 
          }}
          variants={{
            hidden: { opacity: 0, y: '100%' },
            show: { opacity: 1, y: '0' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
                
                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer 
          as={ motion.section }
          transition={{
            delay: 0,
            duration: 0.5 
          }}
          variants={{
            hidden: { opacity: 0, y: '100%' },
            show: { opacity: 1, y: '0' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/gustavonogales" />
    </QuizBackground>
  );
}

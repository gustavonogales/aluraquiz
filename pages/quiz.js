import React, { useState, useEffect } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import AlternativesForm from '../src/components/AlternativesForm';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({results}) {
  const totalCorrect = results.reduce((isCorrect, total) => { 
    isCorrect ? total++ : total;
    return total;
  }, 0);
  
  return (
    <Widget>
      <Widget.Header>
        {totalCorrect === results.length ? 'Parabéns!' : 'Poxa...'}
      </Widget.Header>

      <Widget.Content>
        <p>Você acertou {totalCorrect} de {results.length} perguntas</p>
        <ul>
          {results.map((result,index) => (
            <li key={index}>
              #{('0' + (index + 1)).slice(-2)} Resultado: { result ? 'Acertou' : 'Errou'} 
            </li>
          ))}
          
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({question, totalQuestions, questionIndex, onSubmit, addResult}) {
  const questionId = `question__${questionIndex}`;
  const [IsQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const isCorrect = selectedAlternative === question.answer;

  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img 
        src={question.image} 
        alt="Desc"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm onSubmit={(event) => {
          event.preventDefault();
          setIsQuestionSubmitted(true);
          setTimeout(() => {
            addResult(isCorrect);
            setIsQuestionSubmitted(false);
            setSelectedAlternative(undefined);
            onSubmit();
          }, 2 * 1000);
        }}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = alternativeIndex; 
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeId;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                onChange={() => setSelectedAlternative(alternativeId)}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={IsQuestionSubmitted && alternativeStatus}
              >
                <input
                  style={{display: 'none'}}
                  type="radio"
                  name={questionId}
                  id={alternativeId} 
                />
                
                {alternative}
              </Widget.Topic>
            );
          })}
          { 
            IsQuestionSubmitted && (isCorrect 
              ? <p>Você acertou!</p> 
              : <p>Você errou!</p>)
          }
          
          <Button type="submit" disabled={selectedAlternative === undefined}>Confirmar</Button>
        </AlternativesForm>

        
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalQuestions = db.questions.length;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ])
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;

    if(nextQuestion < totalQuestions) {
      setQuestionIndex(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
          {screenState === screenStates.QUIZ && 
            <QuestionWidget 
              questionIndex={questionIndex}
              question={question}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmit}
              addResult={addResult}
            />
          }
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
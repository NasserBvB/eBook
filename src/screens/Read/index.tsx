import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Pressable, ScrollableScreen, Text, View } from 'ui';
import { getDimensions } from 'utils';
import { default as wordService } from 'utils/wordService';
// import dilmensions

const { generateOptions, generateAnswerArea } = wordService;

export const Read = () => {
  const [correctAnswer] = React.useState('FISSAA');

  const [letters, setLetters] = React.useState(generateOptions(correctAnswer));
  const [answerArea, setAnswerArea] = React.useState(
    generateAnswerArea(correctAnswer),
  );

  const onPress = (letter: string, _index: number) => {
    const newAnswerArea = [...answerArea];
    const firstEmpty = newAnswerArea.findIndex(cur => !cur.filled);

    if (firstEmpty !== -1) {
      const newState = [...newAnswerArea];

      newState[firstEmpty] = {
        ...newState[firstEmpty],
        currentLetter: letter,
        filled: true,
        currentIndex: _index,
      };

      const newLetters = [...letters];
      newLetters[_index].choosen = true;
      setLetters(newLetters);
      setAnswerArea(newState);
    }
  };

  const reset = () => {
    setAnswerArea(generateAnswerArea(correctAnswer));
    setLetters(generateOptions(correctAnswer));
  };

  useEffect(() => {
    if (answerArea.every(cur => cur.filled)) {
      if (
        answerArea.every((cur, idx) => cur.currentLetter === correctAnswer[idx])
      ) {
        console.log('correct');
      } else {
        reset();
        console.log('wrong');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerArea, correctAnswer]);

  const help = () => {
    const newAnswerArea = [...answerArea];

    const firstEmpty = newAnswerArea.findIndex(cur => !cur.filled);
    newAnswerArea[firstEmpty] = {
      ...newAnswerArea[firstEmpty],
      currentLetter: newAnswerArea[firstEmpty].letter,
      filled: true,
    };

    setAnswerArea(newAnswerArea);
  };
  const clearCase = (index: number) => {
    const newAnswerArea = [...answerArea];
    newAnswerArea[index].currentLetter = '';
    newAnswerArea[index].filled = false;

    const newLetters = [...letters];
    newLetters[newAnswerArea[index].currentIndex].choosen = false;

    setLetters(newLetters);
    setAnswerArea(newAnswerArea);
  };

  return (
    <ScrollableScreen>
      <View style={styles.container}>
        <View style={styles.question}>
          <Text>Answer the questions ?</Text>
        </View>
        <View style={styles.image}>
          <Image
            source={{
              uri: 'https://picsum.photos/id/1/200/300',
              width: getDimensions().width,
              height: getDimensions().height / 2,
            }}
          />
        </View>
        <View style={styles.answers}>
          {answerArea.map(({ currentLetter }, index) => (
            <Pressable key={index} onPress={() => clearCase(index)}>
              <Text style={styles.answer}>{currentLetter}</Text>
            </Pressable>
          ))}
          <Button onPress={help} label="Hint" />
        </View>
        <View style={styles.letters}>
          {letters.map((letter, index) => {
            return (
              <Pressable
                style={[
                  styles.letter,
                  letter.choosen ? styles.chosen : styles.notChosen,
                ]}
                disabled={letter.choosen}
                key={index}
                onPress={() => {
                  onPress(letter.letter, index);
                }}>
                <Text>{letter.letter}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollableScreen>
  );
};

const { width } = getDimensions();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  answers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  reset: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width / 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  answer: {
    fontSize: 30,
    margin: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    width: 25,
  },
  image: {
    flex: 1,
  },
  letters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  letter: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    width: width / 6,
    margin: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chosen: {
    backgroundColor: 'green',
  },
  notChosen: {
    backgroundColor: '#fff',
  },
  question: {
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

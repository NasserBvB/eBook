import { useAuth } from 'core';
import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Pressable, ScrollableScreen, Text, View } from 'ui';
import { getDimensions } from 'utils';
import { default as wordService } from 'utils/wordService';
// import dilmensions

const { generateOptions, generateAnswerArea } = wordService;

export const Read = () => {
  const { currentQuestion, nextQuestion, addCoins, removeCoins } = useAuth();
  console.log('currentQuestion', currentQuestion);

  const correctAnswer = useMemo(
    () => currentQuestion?.answer || 'TEST',
    [currentQuestion],
  );

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
        nextQuestion();
        addCoins(10);
      } else {
        reset();
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

    removeCoins(1);

    setAnswerArea(newAnswerArea);
  };
  const clearCase = (index: number) => {
    if (answerArea[index].filled) {
      const newAnswerArea = [...answerArea];
      newAnswerArea[index].currentLetter = '';
      newAnswerArea[index].filled = false;

      const newLetters = [...letters];
      newLetters[newAnswerArea[index].currentIndex].choosen = false;

      setLetters(newLetters);
      setAnswerArea(newAnswerArea);
    }
  };

  const { imageHeight, imageWidth } = useMemo(() => {
    if (currentQuestion) {
      return {
        imageWidth:
          getDimensions().width /
            (currentQuestion?.assets?.length > 1 ? 2 : 1) -
          20,
        imageHeight:
          (getDimensions().height * 0.8) /
          Math.max(currentQuestion?.assets?.length, 2),
      };
    }

    return {
      imageWidth: getDimensions().width * 0.8,
      imageHeight: (getDimensions().height * 0.8) / 2,
    };
  }, [currentQuestion]);

  return (
    <ScrollableScreen>
      <View style={styles.container}>
        <View style={styles.question}>
          <Text fontStyle="italic" textTransform="capitalize" fontWeight="700">
            {currentQuestion?.question}
          </Text>
        </View>
        <View style={styles.images}>
          {currentQuestion?.assets.map((cur, idx) => (
            <Image
              style={styles.image}
              key={idx}
              source={{
                uri: cur,
                width: imageWidth,
                height: imageHeight,
              }}
            />
          ))}
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
                <Text fontWeight="700">{letter.letter}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollableScreen>
  );
};

const { width, height } = getDimensions();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: height * 0.8,
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
  images: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  image: {
    margin: 2,
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

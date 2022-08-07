import { useAd } from 'api/useAd';
import { useAuth } from 'core';
import React, { useEffect, useMemo } from 'react';
import { Image, StyleSheet } from 'react-native';
import Dialog from 'react-native-dialog';
import { Button, Pressable, ScrollableScreen, Text, View } from 'ui';
import { getDimensions } from 'utils';
import { coinsRequiredPerHint } from 'utils/hint';
import { default as wordService } from 'utils/wordService';

const { generateOptions, generateAnswerArea } = wordService;

export const Read = () => {
  const {
    currentQuestion,
    nextQuestion,
    addCoins,
    removeCoins,
    showAdModal,
    showAd,
    coins,
  } = useAuth();

  const [hintCount, setHintCount] = React.useState(0);
  const [showFinishModal, setShowFinishModal] = React.useState({
    show: false,
    wrong: true,
  });
  const { rewarded, loaded } = useAd();
  const [letters, setLetters] = React.useState(
    generateOptions(currentQuestion?.answer || 'TEST'),
  );
  const [answerArea, setAnswerArea] = React.useState(
    generateAnswerArea(currentQuestion?.answer || 'TEST'),
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
    setAnswerArea(generateAnswerArea(currentQuestion?.answer || ''));
    setLetters(generateOptions(currentQuestion?.answer || ''));
  };

  useEffect(() => {
    if (
      answerArea.every(cur => !!cur.filled) &&
      currentQuestion?.answer &&
      currentQuestion?.answer.length > 0
    ) {
      if (
        answerArea.every(
          (cur, idx) => cur.currentLetter === currentQuestion.answer[idx],
        )
      ) {
        setShowFinishModal({ show: true, wrong: false });
      } else {
        setShowFinishModal({ show: true, wrong: true });
      }
    }
  }, [answerArea, currentQuestion]);

  const help = () => {
    if (coinsPerHint > coins) {
      showAd(true);
    } else {
      const newAnswerArea = [...answerArea];

      const firstEmpty = newAnswerArea.findIndex(cur => !cur.filled);
      newAnswerArea[firstEmpty] = {
        ...newAnswerArea[firstEmpty],
        currentLetter: newAnswerArea[firstEmpty].letter,
        filled: true,
      };

      setHintCount(hintCount + 1);
      removeCoins(coinsPerHint);

      setAnswerArea(newAnswerArea);
    }
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
          40,
        imageHeight:
          (getDimensions().height * 0.6) /
          Math.max(currentQuestion?.assets?.length, 2),
      };
    }

    return {
      imageWidth: getDimensions().width * 0.8,
      imageHeight: (getDimensions().height * 0.8) / 2,
    };
  }, [currentQuestion]);

  const coinsPerHint = useMemo(() => {
    if (currentQuestion) {
      return coinsRequiredPerHint(currentQuestion.ordre) * (hintCount + 1);
    }
    return 10;
  }, [currentQuestion, hintCount]);

  const getCoins = () => {
    if (rewarded && loaded) {
      rewarded?.show();
    }
  };
  const closeModal = () => {
    showAd(false);
  };

  useEffect(() => {
    const answer = currentQuestion?.answer || '';
    if (answer.length) {
      setLetters(generateOptions(answer));
      setAnswerArea(generateAnswerArea(answer));
    }
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
        </View>
        <Button margin="s" onPress={help} label={`Hint ${coinsPerHint}`} />
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
                <Text fontWeight="700" color="white">
                  {letter.letter}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <Dialog.Container
        footerStyle={styles.footer}
        headerStyle={styles.header}
        onBackdropPress={closeModal}
        visible={showAdModal}>
        <Dialog.Title>Get More coins</Dialog.Title>
        <Dialog.Description>
          Want more coins for your next question?
        </Dialog.Description>
        <Dialog.Button
          style={styles.cancelButton}
          label="Cancel"
          onPress={closeModal}
        />
        <Dialog.Button
          style={styles.watchButton}
          label="Watch"
          onPress={getCoins}
        />
      </Dialog.Container>
      <Dialog.Container
        footerStyle={styles.footer}
        headerStyle={styles.header}
        onBackdropPress={() =>
          setShowFinishModal(cur => ({ ...cur, show: false }))
        }
        visible={showFinishModal.show}>
        <Dialog.Title>
          {showFinishModal.wrong ? 'Wrong' : 'Correct'} answer
        </Dialog.Title>
        {showFinishModal.wrong && (
          <Dialog.Description>
            You can watch the video to learn how to get more coins for you to
            solve the question
          </Dialog.Description>
        )}
        <Dialog.Button
          style={styles.cancelButton}
          label="Watch"
          onPress={getCoins}
        />
        <Dialog.Button
          style={styles.watchButton}
          label={showFinishModal.wrong ? 'Try again' : 'Next'}
          onPress={() => {
            if (!showFinishModal.wrong) {
              addCoins(10);
              nextQuestion();
            }
            reset();
            setShowFinishModal({ wrong: true, show: false });
          }}
        />
      </Dialog.Container>
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
  coinIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: '#EB5757',
    borderRadius: 10,
    color: '#fff',
  },
  answer: {
    fontSize: 30,
    margin: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    width: 25,
  },
  header: {
    alignItems: 'center',
  },
  images: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  hint: {
    flexDirection: 'row',
    backgroundColor: '#fcbd41',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    margin: 2,
    borderRadius: 10,
  },
  letters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  letter: {
    padding: 10,
    borderRadius: 10,
    width: width / 6,
    margin: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  modalContent: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
    marginVertical: 'auto',
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  chosen: {
    backgroundColor: '#7caab9',
  },
  notChosen: {
    backgroundColor: '#219F94',
  },
  question: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  watchButton: {
    backgroundColor: '#7caab9',
    borderRadius: 10,
    color: '#fff',
  },
});

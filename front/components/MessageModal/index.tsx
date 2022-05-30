import React, { CSSProperties, FC, useCallback, useMemo, useState } from "react";

import styled from "@emotion/styled";
import Modal from "@components/Modal";
import { useTheme } from "@emotion/react";

interface IProps {
  children: React.ReactNode;
  onCloseModal: () => void;
  show: boolean;
  style: CSSProperties;
  question: string;
  questionDetail?: string;
  answers: { [key: string]: string };
}
export const Base = styled.div``;
export const MessageWrapper = styled.div``;
export const QuestionWrapper = styled.div``;
export const MainQuestion = styled.h2<{ textColor: string }>``;
export const MainQuestionDetail = styled.p``;
export const Answers = styled.div``;
export const Answer = styled.div<{ hoverBgColor: string }>``;

const MessageModal: FC<IProps> = ({ children, onCloseModal, show, style, question, questionDetail, answers }) => {
  const theme = useTheme();
  const [showCloseMessage, setShowCloseMessage] = useState(false);
  const messageStyle = useMemo(() => ({}), []);
  const onClickBase = useCallback(() => {
    setShowCloseMessage((prev) => !prev);
  }, []);

  const onCloseMessage = useCallback(() => {
    setShowCloseMessage(false);
  }, []);

  const onCloseAll = useCallback(() => {
    onCloseMessage();
    onCloseModal();
  }, []);
  return (
    <Base>
      <Modal onClick={onClickBase} show={show} style={style} baseBgColor={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        {children}
      </Modal>
      <Modal show={showCloseMessage} style={messageStyle} onCloseModal={onCloseMessage}>
        <MessageWrapper>
          <QuestionWrapper>
            <MainQuestion textColor={theme.colors.red}>{question}</MainQuestion>
            <MainQuestionDetail>{questionDetail}</MainQuestionDetail>
          </QuestionWrapper>
          <Answers>
            {Object.keys(answers).map((v, idx) => (
              <Answer key={idx} onClick={idx === 0 ? onCloseAll : onCloseMessage} hoverBgColor={theme.colors.gray[50]}>
                {answers[v]}
              </Answer>
            ))}
          </Answers>
        </MessageWrapper>
      </Modal>
    </Base>
  );
};

export default MessageModal;

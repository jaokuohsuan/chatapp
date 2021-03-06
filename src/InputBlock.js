/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import socket from "./socket";
import { gotoSetupPage } from "./store/pageSlice";
import SummitButton from "./SummitButton";

const wrapperStyle = css`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;

const MessageInput = styled.input`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: none;
  appearance: none;
  border-radius: 0.25rem 0 0 0.25rem;
  flex-grow: 1;
  outline: none;
`;

const SettingButton = styled.button`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
`;

const InputBlock = () => {
  const [message, setMessage] = useState("");
  const userId = useSelector((state) => state.userSetting.userId);
  const displayName = useSelector((state) => state.userSetting.displayName);
  const dispatch = useDispatch();

  const onChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSummit = () => {
    if (!message) {
      return;
    }
    socket.emit("summitMessage", {
      userId: userId,
      message: message,
      displayName: displayName,
      timestamp: Date.now(),
    });
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSummit();
    }
  };

  const handleSettingClick = (event) => {
    event.preventDefault();
    dispatch(gotoSetupPage());
  };

  const isActive = typeof message !== "undefined" && message !== "";

  return (
    <div css={wrapperStyle}>
      <SettingButton onClick={handleSettingClick}>=</SettingButton>
      <MessageInput
        value={message}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      <SummitButton isActive={isActive} onSummit={handleSummit}>
        >
      </SummitButton>
    </div>
  );
};

export default InputBlock;

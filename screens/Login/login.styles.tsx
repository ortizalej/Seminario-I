import styled from "styled-components/native";
import { Text } from "react-native";

export const CustomContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
  align-items: center;
  justify-content: flex-start;
`;

export const ButtonContainer = styled.View`
  margin-bottom: 40px;
  background-color: ${(props) => props.theme.backgroundColor};
  width: 80%;
  align-items: center;
  justify-content: flex-start;
`;

export const Title = styled.Text`
  font-size: 20;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 12px
  marginTop: 0
`;

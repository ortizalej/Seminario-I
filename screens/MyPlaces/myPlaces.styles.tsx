import styled from "styled-components/native";
import { Text } from "react-native";

export const CustomContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
  align-items: center;
  width: 100%;
`;

export const ButtonContainer = styled.View`
  margin-top: 40px;
  background-color: ${(props) => props.theme.backgroundColor};
  width: 90%;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.theme.greyTextColor};
  margin-top: 0;
  text-align: center;
  margin-top: 20px;
`;

export const Header = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

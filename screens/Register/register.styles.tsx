import styled from "styled-components/native";
import { Item } from "native-base";

export const Content = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const CustomContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
  align-items: center;
  justify-content: flex-start;
  margin: 0;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

export const ButtonContainer = styled.View`
  margin-bottom: 40px;
  background-color: ${(props) => props.theme.backgroundColor};
  width: 80%;
  align-items: center;
  justify-content: flex-start;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.greyTextColor};
  margin-bottom: 32px;
  margin-top: -14px;
  text-align: center;
  width: 100%;
`;

export const QuestionText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.greyTextColor};
  margin-bottom: 12px;
  margin-top: 0px;
`;

export const LoginText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.darkBlue};
  margin-bottom: 12px;
  margin-top: 0px;
  margin-left: 3px;
`;

export const ContainerInput = styled(Item)`
  color: ${(props) => props.theme.lightGreyTextColor};
  margin-bottom: 20px;
  border-width: 1px;
  margin-left: 5px;
  margin-right: 5px;
`;

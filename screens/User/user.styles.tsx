import styled from "styled-components/native";
import { Item } from "native-base";

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
  width: 90%;
`;

export const ContainerInput = styled(Item)`
  color: ${(props) => props.theme.lightGreyTextColor};
  margin-bottom: 20px;
  border-width: 1px;
  margin-left: 5px;
  margin-right: 5px;
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

import styled from "styled-components/native";
import { Badge, CardItem, Button } from "native-base";

export const CustomContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
  align-items: center;
  justify-content: flex-start;
  margin: 0;
`;

export const ButtonContainer = styled.View`
  margin: 0;
  padding: 0;
  background-color: ${(props) => props.theme.backgroundColor};
  width: 90%;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const AvailabilityText = styled.Text`
  font-size: 18px;
  margin-top: 18px;
  margin-left: 10px;
`;
export const AvailabilitySubText = styled.Text`
  color: ${(props) => (props.lowAvailability ? "red" : "green")};
  font-weight: bold;
`;

export const DistanceText = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

export const DistanceSubText = styled.Text`
  font-weight: bold;
`;

export const CustomBadge = styled(Badge)`
  background-color: #ededed;
  width: 100%;
  height: 160px;
  border-radius: 30px;
`;

export const InfoContainer = styled.View`
  flex: 3;
`;

export const FirstInfoContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 70%;
  margin-left: 10px;
`;

export const SecondInfoContent = styled.View`
  margin-left: 10px;
`;

export const FirstInfoLeftContent = styled.View`
  flex: 3;
`;

export const FirstInfoRightContent = styled.View`
  flex: 2;
  margin-right: 15px;
`;

export const TotalPriceText = styled.Text`
  background-color: #f6f6f6;
  border-radius: 10px;
  margin: 6px;
  padding: 6px;
  text-align: center;
`;

export const CabifyTypeText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const ArriveCarContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
`;

export const ArriveCarText = styled.Text`
  margin-left: 6px;
  font-size: 16px;
`;

export const TimeArriveCarContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
`;

export const TimeArriveCarText = styled.Text`
  margin-left: 6px;
  font-size: 16px;
`;

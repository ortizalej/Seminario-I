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
  margin-bottom: 50px;
`;

export const AvailabilityText = styled.Text`
  font-size: 18px;
  margin-top: 18px;
  margin-left: 10px;
  font-weight: bold;
  margin-bottom: 10px;
`;
export const AvailabilitySubText = styled.Text`
  color: ${(props) => (props.lowAvailability ? "red" : "green")};
  font-weight: bold;
  font-size: 20px;
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
  &:active {
    border: 2px solid blue;
  }
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

export const TextContainer = styled.View`
  height: 280px;
  justify-content: space-between;
  padding: 15px;
`;

export const TextContent = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
`;

export const CustomText = styled.Text`
  margin-left: 6px;
  font-size: 17px;
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

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  margin-top: 20px;
`;

export const DirectionTextContainer = styled.View``;

export const DirectionLabel = styled.Text`
  color: ${(props) => props.theme.greyTextColor};
  font-size: 14px;
  max-width: 180px;
`;

export const DirectionText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  max-width: 250px;
`;

export const AmountContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const PriceBadge = styled(Badge)`
  width: 90%;
  height: 40px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #f6f6f6;
`;

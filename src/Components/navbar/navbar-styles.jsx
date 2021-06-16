import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as ShoppingIconSVG } from "../../icons/cart-icon/shopping-bag.svg";
import { ReactComponent as JiraffesIconSVG } from "../../logo.svg";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #128aa8 30%, #6dd5ed 90%);
  overflow: hidden;
  font-size: 12px;
  color: #ffffff;
  border-radius: 25px;
  border-style: outset;
`;

export const LogoContainer = styled(Link)``;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  float: left;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  font-weight: bold;
`;

export const CartContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ShoppingIcon = styled(ShoppingIconSVG)`
  width: 24px;
  height: 24px;
`;

export const JiraffesIcon = styled(JiraffesIconSVG)`
  transform: scale(0.75);
`;

export const ItemCountContainer = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;

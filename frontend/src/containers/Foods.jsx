// src/containers/Foods.jsx

import React, { Fragment, useReducer, useEffect, useState } from 'react';
// keyframes を styled-components から import します
import styled, { keyframes } from 'styled-components';
import { Link } from "react-router-dom";

// components
import { LocalMallIcon } from '../components/Icons';
import { FoodWrapper } from '../components/FoodWrapper';
// import Skeleton from '@material-ui/lab/Skeleton'; // Skeletonライブラリは削除

// reducers
import {
  initialState as foodsInitialState,
  foodsActionTypes,
  foodsReducer,
} from '../reducers/foods';

// apis
import { fetchFoods } from '../apis/foods';

// images
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';

// constants
import { COLORS } from '../style_constants';
import { REQUEST_STATE } from '../constants';

// --- Styled Components (スタイル定義) ---

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

// --- CSS Skeleton (ここから追加) ---

// ローディングアニメーション（パルス）を定義
const pulse = keyframes`
  0% {
    background-color: ${COLORS.BORDER};
  }
  50% {
    background-color: #f5f5f5; /* BORDERより少し明るい色 */
  }
  100% {
    background-color: ${COLORS.BORDER};
  }
`;

// Skeletonライブラリの代わりとなるコンポーネント
const SkeletonWrapper = styled.div`
  width: 450px;
  height: 180px;
  background-color: ${COLORS.BORDER};
  /* アニメーションを適用: 1.5秒かけて無限に繰り返す */
  animation: ${pulse} 1.5s ease-in-out infinite;
`;



// --- Foods Component (コンポーネント本体) ---

export const Foods = ({ match }) => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(match.params.restaurantsId)
      .then((data) => {
        dispatch({
          type: foodsActionTypes.FETCH_SUCCESS,
          payload: {
            foods: data.foods
          }
        });
      })
      .catch((e) => console.error(e));
  }, [match.params.restaurantsId]);

  return (
    <Fragment>
      {/* 1. ヘッダー部分 */}
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>

      {/* 2. フード一覧・ローディング部分 */}
      <FoodsList>
        {
          // (A) ロード中（FETCHING）の場合
          foodsState.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              {/* 12個のSkeletonを表示 */}
              {
                [...Array(12).keys()].map(i =>
                  <ItemWrapper key={i}>
                    {/* ライブラリの代わりにCSSで作ったSkeletonWrapperを使用 */}
                    <SkeletonWrapper />
                  </ItemWrapper>
                )
              }
            </Fragment>

          // (B) 通信成功（OK）の場合
          : foodsState.foodsList.map(food =>
              <ItemWrapper key={food.id}>
                <FoodWrapper
                  food={food}
                  onClickFoodWrapper={(food) => console.log(food)}
                  imageUrl={FoodImage}
                />
              </ItemWrapper>
            )
        }
      </FoodsList>
    </Fragment>
  );
};

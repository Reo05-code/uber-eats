import React, { Fragment, useReducer, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from "react-router-dom";

// apis
import { fetchRestaurants } from '../apis/restaurants';

// reducers
import {
  initialState,
  restaurantsActionTypes,
  restaurantsReducer,
} from '../reducers/restaurants';

// constants
import { REQUEST_STATE } from '../constants';

// images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';
import RestaurantImage from '../images/restaurant-image.jpg';

// =====================
// styled-components
// =====================

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;

const RestaurantsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`;

const RestaurantsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
  border-radius: 12px;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;

// =====================
// Skeleton Animation
// =====================
const shimmer = keyframes`
  0% { background-position: -450px 0; }
  100% { background-position: 450px 0; }
`;

const SkeletonBox = styled.div`
  width: 450px;
  height: 300px;
  border-radius: 16px;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 800px 300px;
  animation: ${shimmer} 1.6s infinite linear;
`;

// =====================
// Component
// =====================

export const Restaurants = () => {
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  useEffect(() => {
    dispatch({ type: restaurantsActionTypes.FETCHING });
    fetchRestaurants()
      .then((data) =>
        dispatch({
          type: restaurantsActionTypes.FETCH_SUCCESS,
          payload: {
            restaurants: data.restaurants,
          },
        })
      );
  }, []);

  return (
    <Fragment>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>

      <RestaurantsContentsList>
        {state.fetchState === REQUEST_STATE.LOADING ? (
          <Fragment>
            <SkeletonBox />
            <SkeletonBox />
            <SkeletonBox />
          </Fragment>
        ) : (
          state.restaurantsList.map((item, index) => (
            <Link
              to={`/restaurants/${item.id}/foods`}
              key={index}
              style={{ textDecoration: 'none' }}
            >
              <RestaurantsContentWrapper>
                <RestaurantsImageNode src={RestaurantImage} alt={item.name} />
                <MainText>{item.name}</MainText>
                <SubText>{`配送料：${item.fee}円 ${item.time_required}分`}</SubText>
              </RestaurantsContentWrapper>
            </Link>
          ))
        )}
      </RestaurantsContentsList>
    </Fragment>
  );
};

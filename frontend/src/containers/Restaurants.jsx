import React, { Fragment, useEffect } from 'react';

// apis
import { fetchRestaurants } from '../apis/restaurants'; //←この行を追加する

export const Restaurants = () => {

//=====ここから追加する=====
  useEffect(() => {
    fetchRestaurants()
    .then((data) =>
      console.log(data)
    )
  }, [])
//=====ここまで追加する=====
  return (
    <Fragment>
      レストラン一覧
    </Fragment>
  )
}

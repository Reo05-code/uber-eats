import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom'; // ← これを追加

export const Foods = () => {
  const { restaurantsId } = useParams(); // ← URLパラメータを取得

  return (
    <Fragment>
      フード一覧
      <p>
        restaurantsIdは {restaurantsId} です。
      </p>
    </Fragment>
  );
};

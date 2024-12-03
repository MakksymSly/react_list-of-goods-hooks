import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  length = 'length',
  alph = 'alph',
  default = '',
}

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.default);

  const reverseList = () => {
    if (isReversed) {
      setIsReversed(false);
    } else {
      setIsReversed(true);
    }
  };

  const resetList = () => {
    setIsReversed(false);
    setSortType(SortType.default);
  };

  const prepearedListOfGoods = [...goodsFromServer];

  if (sortType) {
    prepearedListOfGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.length:
          return good1.length - good2.length;
        case SortType.alph:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepearedListOfGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortType !== 'alph' })}`}
          onClick={() => setSortType(SortType.alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortType !== 'length' })}`}
          onClick={() => setSortType(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': !isReversed })}`}
          onClick={() => reverseList()}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetList()}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {prepearedListOfGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

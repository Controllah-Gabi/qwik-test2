/** @jsxImportSource react */

import a from 'next/link';
import styles from '../styles/navbar.module.scss';
import cx from 'classnames';
import Dropdown from './Dropdown';
import { FC } from 'react';

interface HeaderItemProps {
  item: {
    title: string;
  };
  dropdownState?: boolean;
  setDropdownState?: (state: boolean) => void;
  dropdownItems?: any; // You should replace 'any' with the correct type for your dropdown items
  gender?: string;
}

const HeaderItem: FC<HeaderItemProps> = ({
  item,
  dropdownState = false,
  setDropdownState,
  dropdownItems,
  gender,
}) => {
  return (
    <li
      className={styles['navbar__container__categories__container__item']}
      {...(setDropdownState
        ? {
            onMouseEnter: () => setDropdownState(true),
            onMouseLeave: () => setDropdownState(false),
          }
        : {})}
    >
      <a
        href={`/${item.title.toLowerCase()}?gender=${gender}`}
        aria-label={
          item.title[0].toUpperCase() + item.title.slice(1).toLowerCase()
        }
        className={cx(
          styles['navbar__container__categories__container__item__link'],
        )}
        data-cy={`home-desktop__${item.title.toLowerCase().replace(' ', '-')}`}
      >
        {item.title}
      </a>
      {dropdownState && dropdownItems && (
        <Dropdown currentItem={dropdownItems} />
      )}
    </li>
  );
};

export default HeaderItem;

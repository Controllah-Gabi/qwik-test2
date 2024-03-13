/** @jsxImportSource react */

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/navbar.module.scss';
import cx from 'classnames';

interface DropdownItem {
  id: string;
  path: string;
  title: string;
}

interface DropdownProps {
  currentItem: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ currentItem }) => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  return (
    <>
      <div
        className={
          dropdown
            ? styles[
                'navbar__container__categories__container__item__dropdown__none'
              ]
            : styles['navbar__container__categories__container__item__dropdown']
        }
      >
        {currentItem.map((item, index) => (
          <ul
            className={
              styles[
                'navbar__container__categories__container__item__dropdown__item--mauto'
              ]
            }
            key={index}
            onClick={() => setDropdown(!dropdown)}
          >
            <li
              className={
                styles[
                  'navbar__container__categories__container__item__dropdown__item'
                ]
              }
            >
              <Link href={`/${item.path}`}>
                <div
                  className={
                    styles[
                      'navbar__container__categories__container__item__dropdown__item__link'
                    ]
                  }
                  onClick={() => setDropdown(false)}
                >
                  {
                    // @ts-ignore
                    item.brand
                  }
                </div>
              </Link>
            </li>
            {
              // @ts-ignore
              item.items.map((item, index) => (
                <li
                  key={index}
                  data-cy={`home-desktop__dropdown--${item.path}`}
                  className={
                    styles[
                      'navbar__container__categories__container__item__dropdown__item'
                    ]
                  }
                >
                  <Link href={`/${item.path}`}>
                    <div
                      className={cx(
                        styles[
                          'navbar__container__categories__container__item__dropdown__item__link'
                        ],
                        {
                          [styles[
                            'navbar__container__categories__container__item__dropdown__item__link--bred'
                          ]]: 'Sale' === item.title,
                        },
                      )}
                      onClick={() => setDropdown(false)}
                    >
                      {item.title}
                    </div>
                  </Link>
                </li>
              ))
            }
          </ul>
        ))}
      </div>
    </>
  );
};

export default Dropdown;

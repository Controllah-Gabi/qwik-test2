/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { useState } from 'react';
import cx from 'classnames';

import Search from './Search';

import bennettsLogo from '/public/assets/bennettsLogo.svg';
import userIcon from '/public/assets/userIcon.svg';
import searchIcon from '/public/assets/searchIcon.svg';
import burgerMenuIcon from '/public/assets/burgerMenuIcon.svg';

import styles from '../styles/navbar.module.scss';
import {
  navigationItems,
  groupedSportswearItems,
  groupedFootwearItems,
  accessoriesItems,
} from './data/Navbar.data';
import HeaderItem from './HeaderItem';

function Navbar() {
  const user = null; // useSession().data;
  const [sportswearDropdown, setSportswearDropdown] = useState(false);
  const [footwearDropdown, setFootwearDropdown] = useState(false);
  const [accessoriesDropdown, setAccessoriesDropdown] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'men' | 'women'>('men');

  const [initials, setInitials] = useState('');
  const [scroll, setScroll] = useState('');

  return (
    <header
      className={cx(styles['navbar'], {
        [styles['navbar--is-hidden']]: scroll === 'is-fixed is-hidden',
        [styles['navbar--is-fixed']]:
          scroll === 'is-fixed' || scroll === 'is-fixed is-hidden',
      })}
      role="banner"
      //   ref={ref}
    >
      <div
        className={cx(
          styles['navbar__container'],
          styles['navbar__container--center'],
        )}
      >
        <section
          className={cx(
            styles['navbar__container'],
            styles['navbar__container--center2'],
            styles['mobile'],
          )}
          aria-label="burger nav"
        >
          <button
            className={styles['navbar__container__burger-menu']}
            data-cy="home-mobile__hamburger"
            onClick={(e) => {
              //   lockScreen();
              //   dispatch(mobileMenuClicked);
            }}
          >
            <div
              className={
                styles['navbar__container__burger-menu__burger-container']
              }
            >
              <img
                width={40}
                height={44}
                src={burgerMenuIcon}
                alt="burger menu icon"
              />
            </div>
          </button>
        </section>
        <section
          className={cx(
            styles['navbar__container'],
            styles['navbar__container--center2'],
            styles['desktop'],
          )}
          aria-label="Gender navigation"
        >
          <ul className={styles['navbar__container__gender']}>
            <li className={styles['navbar__container__gender__item']}>
              <a
                href="/"
                aria-label="Home"
                data-cy="home-desktop"
                className={styles['navbar__container__gender__item__link']}
              >
                <img
                  width={40}
                  height={44}
                  src={bennettsLogo}
                  className={styles['navbar__container__gender__item__logo']}
                  aria-labelledby="Bennetts--logo"
                  alt="Bennetts logo"
                />
              </a>
            </li>
            <li className={styles['navbar__container__gender__item']}>
              <a
                href="/"
                aria-label="Men"
                key="men"
                data-cy="home-desktop__men"
                className={cx(styles['navbar__container__gender__item__link'], {
                  [styles['isActive']]: selectedGender === 'men',
                })}
              >
                MEN
              </a>
            </li>
            <li className={styles['navbar__container__gender__item']}>
              <a
                href="/"
                data-cy="home-desktop__women"
                aria-label="Women"
                key="women"
                className={cx(styles['navbar__container__gender__item__link'], {
                  [styles['isActive']]: selectedGender === 'women',
                })}
              >
                WOMEN
              </a>
            </li>
          </ul>
        </section>

        <section
          className={cx(
            styles['navbar__container'],
            styles['navbar__container--center2'],
            styles['mobile'],
          )}
          aria-label="Bennetts logo"
        >
          <a
            href="/"
            id="home-mobile"
            className={styles['navbar__container__gender__item__link']}
          >
            <img
              width={40}
              height={40}
              src={bennettsLogo}
              className={styles['navbar__container__gender__item__logo']}
              aria-labelledby="Bennetts--logo"
              alt="search icon"
              data-cy="home-mobile__logo"
            />
          </a>
        </section>

        <section
          className={cx(
            styles['navbar__container__categories'],
            styles['desktop'],
          )}
        >
          <nav
            className={cx(
              styles['navbar__container'],
              styles['navbar__container--center2'],
            )}
            aria-label="main navigation"
          >
            <ul className={styles['navbar__container__categories__container']}>
              <HeaderItem
                item={navigationItems[0]}
                dropdownState={sportswearDropdown}
                setDropdownState={setSportswearDropdown}
                dropdownItems={groupedSportswearItems[selectedGender]}
                gender={selectedGender}
              />
              <HeaderItem
                item={navigationItems[1]}
                dropdownState={footwearDropdown}
                setDropdownState={setFootwearDropdown}
                dropdownItems={groupedFootwearItems[selectedGender]}
                gender={selectedGender}
              />
              {selectedGender === 'women' && (
                <HeaderItem
                  item={navigationItems[5]}
                  dropdownItems={accessoriesItems[selectedGender]}
                  setDropdownState={setAccessoriesDropdown}
                  dropdownState={accessoriesDropdown}
                  gender={selectedGender}
                />
              )}
              <HeaderItem item={navigationItems[2]} gender={selectedGender} />
              <HeaderItem item={navigationItems[3]} gender={selectedGender} />
            </ul>
          </nav>
        </section>
        <section
          className={cx(
            styles['navbar__container'],
            styles['navbar__container--flex-end'],
          )}
        >
          <>
            <a
              aria-label="User"
              data-cy="home-mobile__profile"
              href="/user-home/my-bennetts"
              className={styles['mobile']}
            >
              <span>{initials}</span>
            </a>

            <section
              className={cx(
                styles['navbar__container__search'],
                styles['mobile'],
              )}
            >
              <button
                onClick={(e) => {
                  // lockScreen();
                  // dispatchSearch(mobileSearchClicked);
                }}
                type="submit"
                title="Submit your query."
                className={styles['navbar__container__search__button']}
              >
                <img
                  src={searchIcon}
                  aria-labelledby="search--icon"
                  alt="search icon"
                  width={50}
                  height={50}
                />
              </button>
            </section>
          </>
          <>
            <section
              className={cx(
                styles['navbar__container__search'],
                styles['desktop'],
              )}
            >
              <Search />
            </section>
            <section
              className={cx(
                styles['navbar__container__login'],
                styles['desktop'],
              )}
            >
              <div className={cx(styles['desktop'])}>
                <a
                  data-cy="home-desktop__user"
                  aria-label="Login"
                  href="/login"
                >
                  <img
                    width={50}
                    height={50}
                    src={userIcon}
                    id="login"
                    aria-labelledby="Login--icon"
                    alt="user icon"
                  />
                </a>
              </div>
            </section>
          </>
        </section>
      </div>
    </header>
  );
}

export const QNavbar = qwikify$(Navbar, { eagerness: 'hover' });

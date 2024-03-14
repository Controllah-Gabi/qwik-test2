/** @jsxImportSource react */
// import { useSearchMenuClicked } from '@/hooks/useModalClicked';
import searchIcon from '/public/assets/searchIcon.svg';
import styles from '../styles/navbar.module.scss';

const Search: React.FC = () => {
  // const { dispatch, isDesktopSearchOpen, desktopSearchClicked } =
  //   useSearchMenuClicked();

  return (
    <div className={styles['navbar__container__search__container']}>
      <form
        onSubmit={(e) => e.preventDefault()}
        role="search"
        className={styles['navbar__container__search__container__form']}
        autoComplete="off"
      >
        <input
          data-cy="home-desktop__search"
          type="search"
          name="search"
          placeholder="Search"
          // onClick={() => dispatch(desktopSearchClicked)}
          className={
            styles['navbar__container__search__container__form__input']
          }
        />
        <button
          data-cy="home-desktop__search__button"
          onClick={(e) => {
            e.preventDefault();
            // dispatch(desktopSearchClicked);
          }}
          type="submit"
          title="Submit your query."
          className={
            styles['navbar__container__search__container__form__submit']
          }
        >
          <img
            width={50}
            height={50}
            src={searchIcon}
            alt="search icon"
            className={
              styles[
                'navbar__container__search__container__form__submit__button'
              ]
            }
          />
        </button>
      </form>
    </div>
  );
};

export default Search;

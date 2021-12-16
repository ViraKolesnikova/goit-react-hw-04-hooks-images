import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';

export default function Searchbar({onSubmit}) {
  const [inputValue, setInputValue] = useState('');

  const searchImages = event => {
    event.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
      resetInput();
    } else {
      toast.warn('Enter word into search line!');
    }
  };

  const resetInput = () => {
    setInputValue('');
  };

  return (
      <header className={styles.Header}>
        <form className={styles.SearchForm} onSubmit={searchImages}>
          <button type="submit" className={styles.SearchFormBtn}>
            <AiOutlineSearch size="2em" color="darkgrey" />
            <span className={styles.SearchFormBtnLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            value={inputValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={(e)=>setInputValue(e.target.value)}
          />
        </form>
      </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
  
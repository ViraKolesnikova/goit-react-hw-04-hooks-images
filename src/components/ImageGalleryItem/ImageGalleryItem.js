import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ item, onImageClick }) {
  return (
    <li className={styles.ImageGalleryItem} onClick={onImageClick}>
      <img
        className={styles.ImageGalleryItemImage}
        src={item.webformatURL}
        alt={item.tags}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onImageClick: PropTypes.func.isRequired,
};

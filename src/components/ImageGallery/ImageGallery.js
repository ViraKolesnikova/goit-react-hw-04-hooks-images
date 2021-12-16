import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';

export default function ImageGallery({ data, onOpenModal }) {
  return (
    <ul className={styles.ImageGallery}>
      {data.map(item => (
        <ImageGalleryItem
          item={item}
          onImageClick={onOpenModal}
          key={item.id}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

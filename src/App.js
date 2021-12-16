import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import APIService from './services/APIService';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Button from './components/Button';
import LoaderContainer from './components/LoaderContainer';
import Placeholder from './components/Placeholder/';


export default function App () {
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (searchValue) {
      setLoading(true);
  
      APIService(searchValue, page)
        .then(data => {
          if (data.hits.length === 0) {
            toast.error('Error! Nothing was found.');
            return;
          }
          if (page === 1) {
            setImages(data.hits);
            setTotal(data.total);
          } else {
            setImages(prevImages=>[...prevImages, ...data.hits])
          }          
        })
        .catch(console.error())
        .finally(() => setLoading(false));       
    }
  }, [searchValue, page]);

  
  const updateState = keyWord => {
    if (searchValue !== keyWord) {
      setSearchValue(keyWord);
      setPage(1);
    }
  };
  
  const openModal = e => {
    e.preventDefault();
    setShowModal(true);
    const imageObj = images.find(image => e.target.src === image.webformatURL);
    setModalImage(imageObj);
  };

  return (
    <>
      <Searchbar onSubmit={updateState} />
      <ToastContainer autoClose={4000} />
      {!images && <Placeholder />}
      {loading && <LoaderContainer />}
      {images && (
        <>
          <ImageGallery data={images} onOpenModal={openModal} />
          {images.length < total && <Button onLoadMoreBtn={() => setPage(page + 1)}/>}
        </>
      )}
      {showModal && <Modal image={modalImage} onClose={()=>setShowModal(false)} />}
    </>
  );
}


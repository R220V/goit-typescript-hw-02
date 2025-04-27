import { useState, useEffect } from 'react'
import {fetchImages} from '../../image.API'
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css'
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import Loader from '../Loader/Loader'
import ImageModal from '../ImageModal/ImageModal.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx'
import { Photo } from './App.types';

export default function App (){

const [image , setImage] = useState<Photo[]>([])
const [search, setSearch]= useState('')
const [isLoad, setIsLoad]= useState(false)
const [page, setPage]=useState(1)
const [morePages, setMorePages]=useState(true)
const [error, setError]=useState(false)
const [selectImage, setSelectImage] =useState<Photo | null>(null)
const[isModalOpen, setIsModalOpen]=useState(false)

const handleSearch =(topic: string)=>{
  setSearch(topic)
  setPage(1)
  setImage([])
  setMorePages(true)
}

  useEffect(() => {
    if (search === '') {return}  async function getPhoto() {
try  {
  setIsLoad(true)
  setError(false)


  const data = await fetchImages(search,page)

  if (data.length === 0 || data.length < 12){
    setMorePages(false)
  }

  setImage(prevImages=>{
    return [...prevImages, ...data]
  })
}  catch (e) {
  setError(true)
  toast.error("Please reload your page",{
  position: 'top-right',
  className: `${css['text-error']} ${css['error']}`,
});

    }finally{
      setIsLoad(false)
}}
getPhoto()
  }, [search, page]);

  const openModal = (imageUrl: Photo) => {
    setSelectImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectImage(null);
  };

  return(

    <div className={css.container}>
<SearchBar onSubmit={handleSearch}/>
{error && <ErrorMessage/>}
{image.length > 0 && (
        <ImageGallery items={image} onImageClick={openModal} />
      )}
{isLoad && <Loader loading={isLoad} />}
{image.length > 0 && !isLoad && morePages && (
        <LoadMoreBtn page={page} onPage={setPage} />
      )}
       <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={selectImage}
        alt="Selected"
      />
      <Toaster position="top-right" />

    </div>
  )
}

 
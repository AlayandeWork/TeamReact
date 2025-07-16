import { useEffect, useState } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import ImageGallery from './components/ImageGallery';

function App() {
  const [BreedsList, setBreedsList] = useState([]);
  const [imageData, setImageData] = useState([]);

  const defaultUrl = 'https://dog.ceo/api/breeds/image/random/12';
  const breedsListURL = 'https://dog.ceo/api/breeds/list/all';

  const handleBreedChange = async (breed) => {
    const url = breed
      ? `https://dog.ceo/api/breed/${breed}/images`
      : defaultUrl;
    // fetch retrieve random dog's pictures
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const limit = 18;
        let images = data.message;
        if (images.length > limit) {
          images.splice(limit, images.length - 1);
        }
        setImageData(images);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };

  useEffect(() => {
    // set initial dog images
    fetch(defaultUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setImageData(data.message);
      });
    // retrieve and set breeds list
    fetch(breedsListURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBreedsList(Object.keys(data.message));
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div>
      <TopBar BreedsList={BreedsList} sendBreedToParent={handleBreedChange} />
      <div className='APP-container'>
        <ImageGallery itemData={imageData} />
      </div>
    </div>
  );
}

export default App;

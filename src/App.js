import { useEffect, useState } from 'react';
import './App.css';
import ImageGallery from './components/ImageGallery';

function App() {
  const [imageData, setImageData] = useState([]);

  const url = 'https://dog.ceo/api/breeds/image/random/12';

  useEffect(() => {
    // set initial dog images
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setImageData(data.message);
      });
  }, []);

  return (
    <div>
      <h2>Dog Gallery</h2>
      <div className='APP-container'>
        <ImageGallery itemData={imageData} />
      </div>
    </div>
  );
}

export default App;

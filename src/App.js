import React, { useState} from 'react'
// import { getImages } from './api';
import images from "./api_mock.json"
import './App.css'

const App = () => {
  const [imageList, setImageList] = useState(images.resources);
  // const [imageList2, setImageList2] = useState([]);
  // const handleGetImages = async() => {
  //   const images = await getImages()
  //   console.log(images)
  // }
  // useEffect(() => {
  //  handleGetImages()
  
    
  // }, [])
  
  return <div className="image-grid">
      {imageList.map((image) => <img key={image.asset_id} src={image.url} alt={image.public_id}></img>)}
    </div>

  
};

export default App
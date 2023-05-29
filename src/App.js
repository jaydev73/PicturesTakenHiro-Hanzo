import React, { useEffect, useState} from 'react'
import { getImages } from './api';


// import images from "./api_mock.json"
import './App.css'
import Navbar from './Navbar';

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null)
  // const [imageList2, setImageList2] = useState([]);
  // const [imageList2, setImageList2] = useState([]);
  // const handleGetImages = async() => {
  //   const images = await getImages()
  //   console.log(images)
  // }
  // useEffect(() => {
  //  handleGetImages()
  useEffect(() => {
    const fetchData = async() => {
      const responseJson = await getImages();
      setImageList(responseJson.resources)
      setNextCursor(responseJson.next_cursor)
    }
    fetchData()
  }, [])

  const handleLoadMoreButtonClick = async() => {
      const responseJson = await getImages(nextCursor);
      setImageList((currentImageList) => [
        ...currentImageList,
        ...responseJson.resources
      ]);
      setNextCursor(responseJson.next_cursor);
  }
    
  // }, [])
  
  return <>
  <Navbar/>
  
  <div className="image-grid"> 
  
  {imageList.map((image) => <img  key={image.asset_id} src={image.secure_url} alt={image.public_id}></img>)}
  
      
    </div>
  <div className='load-btn'>
    {nextCursor && (
        <button onClick={handleLoadMoreButtonClick}>Load More</button>
    )}
  </div>
    </>
  
  
};

export default App
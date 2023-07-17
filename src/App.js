import React, { useEffect, useState } from "react";
import { getImages } from "./api";
import Image from "./image";

// import images from "./api_mock.json";
import "./App.css";
import Navbar from "./Navbar";

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  // const [imageList2, setImageList2] = useState([]);
  // const [imageList2, setImageList2] = useState([]);
  // const handleGetImages = async() => {
  //   const images = await getImages()
  //   console.log(images)
  // }
  // useEffect(() => {
  //  handleGetImages()
  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getImages();
      setImageList(responseJson.resources);

      setNextCursor(responseJson.next_cursor);
    };
    fetchData();
  }, []);

  const handleLoadMoreButtonClick = async () => {
    const responseJson = await getImages(nextCursor);
    setImageList((currentImageList) => [
      ...currentImageList,
      ...responseJson.resources,
    ]);
    setNextCursor(responseJson.next_cursor);
  };

  // }, [])

  return (
    <>
      {/* <Navbar /> */}
      {!imageList ? (
        <h2 className="flex items-center justify-center hscreen font-bold text-4xl text-center text-slate-800">
          ...Loading Your Event Photos
        </h2>
      ) : (
        <div>
          <section className="px-5 container mx-auto">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl my-10 lg:mt-20 lg:mb-16">
              Your Event Photos
            </h1>

            <div className="grid columns-3 gap-10">
              {imageList.map((image, index) => (
                <Image key={image.asset_id} {...image} />
              ))}
            </div>
          </section>
        </div>
      )}
      <div className="flex items-center justify-center hscreen font-bold text-4xl text-center text-slate-200">
        {nextCursor && (
          <button onClick={handleLoadMoreButtonClick}>Load More</button>
        )}
      </div>
    </>
  );
};

export default App;

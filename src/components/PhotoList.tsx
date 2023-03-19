
import { useState, useContext, useEffect } from "react";
import { PhotosContext } from '../contexts/PhotosProvider'
import Button from "./Button";
import Slider, { Settings } from 'react-slick';
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

const Photolist = () => {
  const { photos, loading, error } = useContext(PhotosContext);

  const [view, setView] = useState('grid');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  function handleViewChange(newView: string) {
    setView(newView);
  }

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    centerMode: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="container">
      <div className='button-container'>
        <Button
          onClick={() => handleViewChange("grid")}
          view={view}
          text="grid"
        />
        <Button
          onClick={() => handleViewChange("list")}
          view={view}
          text="list"
        />
        <Button
          onClick={() => handleViewChange("slider")}
          view={view}
          text="slider"
        />
        <Button
          onClick={() => handleViewChange("card")}
          view={view}
          text="card"
        />
      </div>
      <div data-testid={`${view}-view`} className={`${view}-view`}>
        {view === 'slider' ? (
          <Slider {...settings}>
            {photos.map((photo) => (
              <div key={photo.id} className='slider-item'>
                <img className='image' src={photo.download_url} alt={photo.author} />
                <p>{photo.author}</p>
              </div>
            ))}

          </Slider>
        ) : photos.map((photo) => (
          <div key={photo.id} className={`${view}-item`}>
            <img className='image' src={photo.download_url} alt={photo.author} />
            <p>{photo.author}</p>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Photolist;
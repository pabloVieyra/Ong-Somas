import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectCube,
} from 'swiper';
import 'swiper/swiper-bundle.css';
import '../../Styles/SlideHome.css';
import { getAllSlides } from '../../Services/slidesService';
import ActivityContent from '../Activities/ActivityContent';

SwiperCore.use([Navigation, Pagination, Autoplay, EffectCube]);

const SlideHome = () => {
  const [slides, setSlides] = useState(null);

  useEffect(() => {
    getAllSlides().then((response) => setSlides(response.data));
  }, []);

  const showSlides = () =>
    slides?.map((slide) => (
      <SwiperSlide key={slide.id} tag="li">
        <div className="slideContainer">
          <div className="img-container__slide">
            <img className="slideImege" src={slide.image} />
          </div>
          <div className="info-container__slide">
            <h4 className="slideTitle">{slide.name}</h4>
            <span className="slideDescription">
              <ActivityContent content={slide.description} />
            </span>
          </div>
        </div>
      </SwiperSlide>
    ));

  return (
    <>
      <Swiper
        navigation
        pagination
        autoplay={{ delay: 5000 }}
        effect={'cube'}
        id="main"
        slidesPerView={1}
        spaceBetween={0}
        tag="section"
        wrapperTag="ul">
        {showSlides()}
      </Swiper>
    </>
  );
};

export default SlideHome;

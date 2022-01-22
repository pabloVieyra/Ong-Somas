import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectCube,
} from 'swiper';
import 'swiper/swiper-bundle.css';
import s from '../../Styles/ToysCampaign/Slider.module.css';
import image1 from '../../assets/foto9.jpg';
import image2 from '../../assets/foto8.jpg';
import image3 from '../../assets/foto3.jpg';

SwiperCore.use([Navigation, Pagination, Autoplay, EffectCube]);

const toysCampaignSlidesInfo = [
  { slideImage: image1, slideText: 'Regala alegría a nuestros niños' },
  {
    slideImage: image2,
    slideText: 'Tendremos juegos y actividades para ellos',
  },
  {
    slideImage: image3,
    slideText: 'También puedes donar para el viaje de sus sueños',
  },
];

const Slider = () => {
  return (
    <>
      <Swiper
        navigation
        autoplay={{ delay: 5000 }}
        centeredSlides={true}
        className={s.swiperContainer}
        effect="cube"
        loop={true}
        slidesPerView={1}
        tag="section"
        wrapperTag="div">
        {toysCampaignSlidesInfo.map((slide, i) => (
          <SwiperSlide key={i} tag="div">
            <div className={s.slideContainer}>
              <div className={s.slideImageContainer}>
                <img className={s.slideImage} src={slide.slideImage} />
              </div>
              <div className={s.slideTextContainer}>
                <p className={s.slideText}>{slide.slideText}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;

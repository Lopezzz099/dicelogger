import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Carousel.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export type items = {
  img: string;
  description: string;
};

type CarouselProps = {
  itemsImg: items[];
};

const Carousel = ({ itemsImg }: CarouselProps) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {itemsImg.map((item: items, index: number) => (
          <SwiperSlide key={index}>
            <div className="imgCarousel">
              <Image
                src={item.img}
                alt={`img` + index}
                fill
              />
            </div>
            {/* <div className="containerPCarousel">
              <p className="pCarousel">{item.description}</p>
            </div> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;

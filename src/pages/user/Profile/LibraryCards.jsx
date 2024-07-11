import React from 'react';
import Card from 'react-bootstrap/Card';
import Slider from 'react-slick';
import { LibraryCard } from '../../../components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, padding: '1px', display: "flex", background: "#4F0C24", width: '25px', height: '28px', alignItems: 'center' }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, padding: '1px', display: "flex", background: "#4F0C24", width: '25px', height: '28px', alignItems: 'center' }}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
};

const LibraryCards = ({ libraryCardDetails }) => (
  <Card className='library-card-section__card border-none'>
    <Card.Title className='library-card-section__title text-4xl'>Library Cards</Card.Title>
    <Card.Text className='library-card-section__overview-text'>Cards Overview</Card.Text>
    <Slider {...settings} className='library-card-section__slider'>
      {libraryCardDetails.map((libCard) => (
        <LibraryCard key={`m_01010/${libCard.library_card_no}`} cardNo={`m_01010/${libCard.library_card_no}`} cardStatus={libCard.status} />
      ))}
    </Slider>
  </Card>
);

export default LibraryCards;

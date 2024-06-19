import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import JULOGO from '../../assets/Jadavpur_University_Logo.webp';
import LibraryCard from '../../components/LibraryCard';
import Slider from "react-slick";

import '../../assets/style/style.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Profile() {

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, padding: '1px', display: "flex", background: "blue", width: '25px', height: '30px', alignItems: 'center' }}
        onClick={onClick}
      />
    );
  }
  
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, padding: '1px', display: "flex", background: "blue", width: '40px', height: '30px', alignItems: 'center' }}
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

  return (
    <div>
      <div>
        <div>
          <Card className='w-[75%] mr-2 ml-auto'>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <Card.Img
                    variant='top'
                    src={JULOGO}
                    alt='profile image'
                    style={{ borderRadius: '50%', height: '150px', width: '150px', marginBottom: '25px' }}
                  />
                  <Card.Text className='mb-2'>
                    Student ID: 223143
                  </Card.Text>
                  <Card.Text className='mb-2'>
                    Joining Date: 21/11/2022
                  </Card.Text>
                  <Card.Text className='mb-2'>
                    Roll No.: 05011001087
                  </Card.Text>
                  <Button variant='info' className='mt-2'>
                    Change Password
                  </Button>
                </Col>
                <Col md={9}>
                  <Card.Title>
                    Name: John Doe
                  </Card.Title>
                  <Card.Text>
                    Department: ETCE
                  </Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Email: johndoe@example.com</ListGroup.Item>
                    <ListGroup.Item>Phone: +91 12345 67890</ListGroup.Item>
                    <ListGroup.Item>Address: 188, Raja Subodh Chandra Mallick Rd, Jadavpur, Kolkata, West Bengal 700032</ListGroup.Item>
                    <ListGroup.Item>
                        <span>
                          Subjects of Interest: 
                        </span>
                        <Stack direction='horizontal' gap={2} className='w-[80%] flex-wrap'>
                          <Badge bg='secondary'>
                            Data Structures and Algorithms
                            <Button variant='secondary' className='pl-2 pt-0 pr-0 pb-0'>
                              ❌
                            </Button>
                          </Badge>
                          <Badge bg='success' className='p-2'>
                            Computer Organization and Architecture
                            <Button variant='success' className='pl-2 pt-0 pr-0 pb-0'>
                              ❌
                            </Button>
                          </Badge>
                          <Badge bg='danger' className='p-2'>
                            Database Management System
                            <Button variant='danger' className='pl-2 pt-0 pr-0 pb-0'>
                              ❌
                            </Button>
                          </Badge>
                          <Badge bg='warning' className='p-2'>
                            Software Engineering
                            <Button variant='warning' className='pl-2 pt-0 pr-0 pb-0'>
                              ❌
                            </Button>
                          </Badge>
                          <Button variant='light'>
                            ➕
                          </Button>
                        </Stack>
                    </ListGroup.Item>
                  </ListGroup>
                  <Button className='w-full justify-center' variant='primary'>
                    Edit Profile
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className='w-[75%] mr-2 ml-auto mt-6 overflow-hidden'>
            <Card.Title className='text-3xl ml-6 mt-4'>
              Library Cards
            </Card.Title>
            <Card.Text className='text-xl ml-6 mt-4 text-stone-700 font-medium'>
              Cards Overview
            </Card.Text>
                <Slider {...settings} className='mx-4 mt-3 mb-5'>
                  <LibraryCard cardNo={'JU-3452/01'} cardStatus={'inactive'}/>
                    <LibraryCard cardNo={'JU-3452/02'} cardStatus={'active'} bookName={'Data Structures and Algorithms with C/C++'} dueDate={'30/06/24'}/>
                    <LibraryCard cardNo={'JU-3452/03'} cardStatus={'overdue'} bookName={'HeadFirst System Design'} dueDate={'03/06/24'}/>
                </Slider>
          </Card>
        </div>
      </div>
    </div>
  )
}

export { Profile };
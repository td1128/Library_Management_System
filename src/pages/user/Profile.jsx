import React, { useEffect, useState, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import JULOGO from '../../assets/Jadavpur_University_Logo.webp';
import { LibraryCard, EditSubjects } from '../../components';
import Slider from "react-slick";
import { fetchUserData } from '../../features/userSlice';
import { useSelector, useDispatch } from 'react-redux';

import '../../assets/style/style.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Profile() {

  const user = useSelector( state => state.user );

  const { name, department, studentID, joiningDate, rollNo, email, phoneNumber, address, subjectsOfInterest } = user.details;

  const dispatch = useDispatch();

  const [ isEditing, setIsEditing ] = useState( false );
  const [ isAddingSubjects, setIsAddingSubjects ] = useState( false);

  const [ userCopy, setUserCopy ] = useState( {
    email,
    phoneNumber,
    address
  } )

  const handleAddingSubjects = () => setIsAddingSubjects( true );

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

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  
  const debouncedHandleChange = useCallback(debounce((name, value) => {
    setUserCopy(prevUserCopy => ({
      ...prevUserCopy,
      [name]: value
    }));
  }, 200), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    debouncedHandleChange(name, value);
  };

  useEffect( () => {
    dispatch( fetchUserData('m_11135') )
  }, [] );

  return (
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
                    Student ID: &thinsp;
                    { 
                      `${ studentID }` 
                    }
                  </Card.Text>
                  <Card.Text className='mb-2'>
                    Joining Date: &thinsp;
                    {
                      `${ joiningDate }`
                    }
                  </Card.Text>
                  <Card.Text className='mb-2'>
                    Roll Number: &thinsp;
                    {
                      `${ rollNo }`
                    }
                  </Card.Text>
                  <Button variant='info' className='mt-2'>
                    Change Password
                  </Button>
                </Col>
                <Col md={9}>
                  <Card.Title>
                    Name: &thinsp;
                    {
                      `${ name }`
                    }
                  </Card.Title>
                  <Card.Text>
                    Department: &thinsp;
                    {
                      `${ department }`
                    }
                  </Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      Email:
                      <input 
                        type="text" 
                        name="email"
                        value={ `${ userCopy.email }` } 
                        className='pl-2 ml-0.5' 
                        readOnly={ !isEditing }
                        onChange={ handleChange }
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Phone: 
                      <input 
                        type="text" 
                        name="phoneNumber"
                        value={ `${ userCopy.phoneNumber }` } 
                        className='pl-2 ml-0.5' 
                        readOnly={ !isEditing }
                        onChange={ handleChange }
                      />
                      </ListGroup.Item>
                    <ListGroup.Item className='flex align-items-start'>
                      Address: 
                      <input 
                        type="text" 
                        name="address"
                        value={ `${ userCopy.address }` } 
                        className='pl-2 ml-0.5 flex-grow-1' 
                        readOnly={ !isEditing }
                        onChange={ handleChange }
                      />
                      </ListGroup.Item>
                    <ListGroup.Item>
                        <span>
                          Subjects of Interest: 
                        </span>
                        <Stack direction='horizontal' gap={2} className='w-[80%] flex-wrap'>
                          {
                            subjectsOfInterest.map( (subject, index) => (
                              <Badge bg='success' key={ index }>
                                {
                                  `${ subject }`
                                }
                                <Button variant='success' className='pl-2 pt-0 pr-0 pb-0'>
                                  ❌
                                </Button>
                              </Badge>
                            ) )
                          }
                          <Button variant='light' onClick={ handleAddingSubjects }>
                            ➕
                          </Button>
                        </Stack>
                    </ListGroup.Item>
                  </ListGroup>
                  <Button className='w-full justify-center' variant='primary' onClick={ () => setIsEditing(currentEditingState => !currentEditingState )}>
                    {
                      isEditing ? 'Save Profile' : 'Edit Profile'
                    }
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
        <div>
          <EditSubjects show={ isAddingSubjects } onHide={ () => setIsAddingSubjects(false) } />
        </div>
      </div>
  )
}

export { Profile };
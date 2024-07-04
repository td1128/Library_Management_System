import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import JULOGO from '../../../assets/Jadavpur_University_Logo.webp';
import { LibraryCard, EditSubjects } from '../../../components';
import Slider from "react-slick";
import { fetchUserData, updateUserData } from '../../../features/userThunks';
import { useSelector, useDispatch } from 'react-redux';
import ChangeConfirmationModal from '../../../common_components/modals/ChangeConfirmationModal';
import { setEmail, setPhoneNumber, setAddress } from '../../../features/userSlice';
import infinityLoader from '../../../assets/icons/infinity-loader.svg';
import toast from 'react-hot-toast';

import './Profile.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Profile() {
  const dispatch = useDispatch();

  const user = useSelector( state => state.user );
  const { name, department, studentID, joiningDate, rollNo, email, phoneNumber, address, subjectsOfInterest } = user.details;
  const loading = user.loading;
  
  const [ userCopy, setUserCopy ] = useState( {
    email,
    phoneNumber,
    address
  } );

  useEffect( () => {
    dispatch( fetchUserData('m_01010') );
  }, [ dispatch ] );

  useEffect( () => {
    setUserCopy( {
      email,
      phoneNumber,
      address
    } )
  }, [ user.details ] );

  const [ isEditing, setIsEditing ] = useState( false );
  const [ isAddingSubjects, setIsAddingSubjects ] = useState( false);
  const [ isMakeChangesConfirmationOpen, setIsMakeChangesConfirmationOpen ] = useState( false );

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCopy(prevUserCopy => ({
      ...prevUserCopy,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (isEditing) {
      if (userCopy.email !== user.details.email || userCopy.phoneNumber !== user.details.phoneNumber || userCopy.address !== user.details.address) {
        setIsMakeChangesConfirmationOpen(true);
      } else {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleConfirm = async () => {
    try {
      await dispatch(updateUserData({
        roll: rollNo,
        dept: department,
        address: userCopy.address,
        join_date: joiningDate,
        library_card_no: 'm_01010',
        first_name: name,
        last_name: '',
        sex: 'M',
        phone_number: userCopy.phoneNumber,
        email: userCopy.email
      })).unwrap();

      dispatch(setEmail(userCopy.email));
      dispatch(setAddress(userCopy.address));
      dispatch(setPhoneNumber(userCopy.phoneNumber));
      toast.success('Successfully Updated the Profile');
    } catch (updateError) {
      console.error('Update failed:', updateError);
      toast.error('Could not Update the Profile');

      setUserCopy({
        email,
        phoneNumber,
        address
      });
    } finally {
      setIsEditing(false);
    }
  };
  

  return (
    <div className='h-full overflowY-scroll'>
      <div>
        <Card className='profile__card'>
          <Card.Body className='flex flex-row'>
            {
              loading ? (
                <div className='.profile__loader '>
                  <img src={infinityLoader} alt="Loading..." />
                </div>
            ) : (
              <Row>
                <div className='profile__image-container'>
                  <img className='profile__image' height='150px' width='250px' src="https://img.icons8.com/ios-filled/100/user-male-circle.png" alt="user-male-circle"/>
                  <Card.Text className='profile__text'>
                    Student ID: &thinsp;{`${studentID}`}
                  </Card.Text>
                  <Card.Text className='profile__text'>
                    Joining Date: &thinsp;{`${joiningDate}`}
                  </Card.Text>
                  <Card.Text className='profile__text'>
                    Roll Number: &thinsp;{`${rollNo}`}
                  </Card.Text>
                  <Button variant='info' className='profile__button'>
                    Change Password
                  </Button>
                </div>
                <div className='profile__info-container'>
                  <ListGroup className='profile__list-group custom-list-group'>
                    <ListGroup.Item className='profile__list-group-item profile__name-label'>
                      <span>
                        Name:
                      </span>
                      <input
                        type="text"
                        name="email"
                        value={`${name}`}
                        className='profile__input'
                        readOnly={!isEditing}
                        onChange={handleChange}
                        style={{ width: '80%' }}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item className='custom-list-group-item'>
                      <span>
                        Department:
                      </span>
                      <input
                        type="text"
                        name="email"
                        value={`${department}`}
                        className='profile__input'
                        readOnly={!isEditing}
                        onChange={handleChange}
                        style={{ width: '80%' }}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item className='custom-list-group-item'>
                      Email:
                      <input
                        type="text"
                        name="email"
                        value={`${userCopy.email}`}
                        className='profile__input'
                        readOnly={!isEditing}
                        onChange={handleChange}
                        style={{ width: '80%' }}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item className='custom-list-group-item'>
                      Phone:
                      <input
                        type="text"
                        name="phoneNumber"
                        value={`${userCopy.phoneNumber}`}
                        className='profile__input'
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item className='flex align-items-start custom-list-group-item'>
                      Address:
                      <input
                        type="text"
                        name="address"
                        value={`${userCopy.address}`}
                        className='profile__input flex-grow-1'
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                    </ListGroup.Item>
                  </ListGroup>
                  <Button className='profile__button-edit' variant='primary' onClick={handleSubmit}>
                    {isEditing ? 'Save Profile' : 'Edit Profile'}
                  </Button>
                  <ListGroup className='custom-list-group'>
                    <ListGroup.Item className='custom-list-group-item'>
                      <span className='p-2'>Subjects of Interest:</span>
                        <Stack direction='horizontal' gap={2} className='profile__subjects-stack'>
                          {subjectsOfInterest.map((subject, index) => (
                            <Badge bg='success' key={index} className='p-3 m-1'>
                              {`${subject}`}
                            </Badge>
                          ))}
                          <Button variant='light' onClick={handleAddingSubjects}>
                            ✏️ Edit
                          </Button>
                        </Stack>
                      </ListGroup.Item>
                  </ListGroup>
                </div>
              </Row>
            )}
          </Card.Body>
        </Card>
        <Card className='library-card-section__card' >
          <Card.Title className='library-card-section__title'>
            Library Cards
          </Card.Title>
          <Card.Text className='library-card-section__overview-text'>
            Cards Overview
          </Card.Text>
          <Slider {...settings} className='library-card-section__slider '>
            <LibraryCard cardNo={'JU-3452/01'} cardStatus={'inactive'}/>
            <LibraryCard cardNo={'JU-3452/02'} cardStatus={'active'} bookName={'Data Structures and Algorithms with C/C++'} dueDate={'30/06/24'}/>
            <LibraryCard cardNo={'JU-3452/03'} cardStatus={'overdue'} bookName={'HeadFirst System Design'} dueDate={'03/06/24'}/>
          </Slider>
        </Card>
        </div>
        <div>
          <EditSubjects show={ isAddingSubjects } onHide={ () => setIsAddingSubjects(false) } />
        </div>
        <div>
          <ChangeConfirmationModal show={ isMakeChangesConfirmationOpen } handleClose={ () => setIsMakeChangesConfirmationOpen(false) } onConfirm={ handleConfirm } />
        </div>
      </div>
  )
}

export { Profile };
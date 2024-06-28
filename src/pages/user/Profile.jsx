import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import JULOGO from '../../assets/Jadavpur_University_Logo.webp';
import { LibraryCard, EditSubjects } from '../../components';
import Slider from "react-slick";
import { fetchUserData, updateUserData } from '../../features/userThunks';
import { useSelector, useDispatch } from 'react-redux';
import ChangeConfirmationModal from '../../common_components/modals/ChangeConfirmationModal';
import { setEmail, setPhoneNumber, setAddress } from '../../features/userSlice';
import infinityLoader from '../../assets/icons/infinity-loader.svg';
import toast from 'react-hot-toast';

import '../../assets/style/style.css';

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
  const [ toChange, setToChange ] = useState( false );

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
    <div>
        <div>
        <Card style={{ width: '1200px', height: '400px', marginRight: '2px', marginLeft: '8px' }}>
          <Card.Body>
            {loading ? (
              <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: 'auto' } }>
                <img src={infinityLoader} alt="Loading..." />
              </div>
            ) : (
              <Row>
                <div style={{ width: '280px' }}>
                  <Card.Img
                    variant='top'
                    src={JULOGO}
                    alt='profile image'
                    style={{ borderRadius: '50%', height: '150px', width: '150px', marginBottom: '25px' }}
                  />
                  <Card.Text className='mb-2'>
                    Student ID: &thinsp;{`${studentID}`}
                  </Card.Text>
                  <Card.Text className='mb-2'>
                    Joining Date: &thinsp;{`${joiningDate}`}
                  </Card.Text>
                  <Card.Text className='mb-2'>
                    Roll Number: &thinsp;{`${rollNo}`}
                  </Card.Text>
                  <Button variant='info' className='mt-2'>
                    Change Password
                  </Button>
                </div>
                <div style={{ width: '800px' }}>
                  <Card.Title>Name: &thinsp;{`${name}`}</Card.Title>
                  <Card.Text>Department: &thinsp;{`${department}`}</Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      Email:
                      <input
                        type="text"
                        name="email"
                        value={`${userCopy.email}`}
                        className='pl-2 ml-0.5'
                        readOnly={!isEditing}
                        onChange={handleChange}
                        style={{ width: '80%' }}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Phone:
                      <input
                        type="text"
                        name="phoneNumber"
                        value={`${userCopy.phoneNumber}`}
                        className='pl-2 ml-0.5'
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item className='flex align-items-start'>
                      Address:
                      <input
                        type="text"
                        name="address"
                        value={`${userCopy.address}`}
                        className='pl-2 ml-0.5 flex-grow-1'
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span>Subjects of Interest:</span>
                      <Stack direction='horizontal' gap={2} className='w-[80%] flex-wrap'>
                        {subjectsOfInterest.map((subject, index) => (
                          <Badge bg='success' key={index}>
                            {`${subject}`}
                            <Button variant='success' className='pl-2 pt-0 pr-0 pb-0'>
                              ❌
                            </Button>
                          </Badge>
                        ))}
                        <Button variant='light' onClick={handleAddingSubjects}>
                          ➕
                        </Button>
                      </Stack>
                    </ListGroup.Item>
                  </ListGroup>
                  <Button className='w-full justify-center' variant='primary' onClick={handleSubmit}>
                    {isEditing ? 'Save Profile' : 'Edit Profile'}
                  </Button>
                </div>
              </Row>
            )}
          </Card.Body>
        </Card>
          <Card style={ { width: '1200px', height: '400px', marginTop: '9px', marginRight: '2px', marginLeft: '8px' } } >
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
        <div>
          <ChangeConfirmationModal show={ isMakeChangesConfirmationOpen } handleClose={ () => setIsMakeChangesConfirmationOpen(false) } onConfirm={ handleConfirm } />
        </div>
      </div>
  )
}

export { Profile };
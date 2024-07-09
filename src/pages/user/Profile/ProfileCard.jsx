import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

const ProfileCard = ({
  name,
  department,
  studentID,
  joiningDate,
  rollNo,
  subjectsOfInterest,
  isEditing,
  userCopy,
  handleChange,
  handleSubmit,
  handleAddingSubjects
}) => (
  <Card className='profile__card border-none'>
    <Card.Body className='flex-row'>
      <Row>
        <div className='profile__image-container'>
          <img className='profile__image' height='150px' width='250px' src="https://img.icons8.com/ios-filled/100/user-male-circle.png" alt="user-male-circle" />
          <Card.Text className='profile__text'>Student ID: &thinsp;{`${studentID}`}</Card.Text>
          <Card.Text className='profile__text'>Joining Date: &thinsp;{`${joiningDate}`}</Card.Text>
          <Card.Text className='profile__text'>Roll Number: &thinsp;{`${rollNo}`}</Card.Text>
          <Button variant='info' className='profile__button'>Change Password</Button>
        </div>
        <div className='profile__info-container'>
          <ListGroup className='profile__list-group custom-list-group'>
            <ListGroup.Item className='profile__list-group-item profile__name-label'>
              <span>Name:</span>
              <input type="text" name="name" value={`${name}`} className='profile__input' readOnly={!isEditing} onChange={handleChange} style={{ width: '80%' }} />
            </ListGroup.Item>
            <ListGroup.Item className='custom-list-group-item'>
              <span>Department:</span>
              <input type="text" name="department" value={`${department}`} className='profile__input' readOnly={!isEditing} onChange={handleChange} style={{ width: '80%' }} />
            </ListGroup.Item>
            <ListGroup.Item className='custom-list-group-item'>
              Email:
              <input type="text" name="email" value={`${userCopy.email}`} className='profile__input' readOnly={!isEditing} onChange={handleChange} style={{ width: '80%' }} />
            </ListGroup.Item>
            <ListGroup.Item className='custom-list-group-item'>
              Phone:
              <input type="text" name="phoneNumber" value={`${userCopy.phoneNumber}`} className='profile__input' readOnly={!isEditing} onChange={handleChange} />
            </ListGroup.Item>
            <ListGroup.Item className='flex align-items-start custom-list-group-item'>
              Address:
              <input type="text" name="address" value={`${userCopy.address}`} className='profile__input flex-grow-1' readOnly={!isEditing} onChange={handleChange} />
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
                  <Badge bg='success' key={index} className='p-3 m-1'>{`${subject}`}</Badge>
                ))}
                <Button variant='light' onClick={handleAddingSubjects}>✏️ Edit</Button>
              </Stack>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Row>
    </Card.Body>
  </Card>
);

export default ProfileCard;

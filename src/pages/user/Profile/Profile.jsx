import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCard from './ProfileCard';
import LibraryCards from './LibraryCards';
import Loading from './Loading';
import { fetchUserData, updateUserData, fetchWishList } from '../../../features/userThunks';
import { setEmail, setPhoneNumber, setAddress } from '../../../features/userSlice';
import ChangeConfirmationModal from '../../../common_components/modals/ChangeConfirmationModal';
import { EditSubjects } from '../../../components';
import toast from 'react-hot-toast';

import './Profile.css';

const Profile = () => {
  console.log("profile rendered");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { name, department, studentID, joiningDate, rollNo, email, phoneNumber, address, subjectsOfInterest, libraryCardDetails } = user.details;
  const loading = user.loading;
  
  const [userCopy, setUserCopy] = useState({ email, phoneNumber, address });
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSubjects, setIsAddingSubjects] = useState(false);
  const [isMakeChangesConfirmationOpen, setIsMakeChangesConfirmationOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserData('m_01010'));
  }, [dispatch]);

  useEffect(() => {
    setUserCopy({ email, phoneNumber, address });
  }, [user.details]);

  useEffect(()=>{
    dispatch(fetchWishList('m_11201'));// TODO member id.
  }, [dispatch])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCopy((prevUserCopy) => ({
      ...prevUserCopy,
      [name]: value,
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

      setUserCopy({ email, phoneNumber, address });
    } finally {
      setIsEditing(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='h-full overflowY-scroll'>
      <div className='flex flex-col'>
        <ProfileCard
          name={name}
          department={department}
          studentID={studentID}
          joiningDate={joiningDate}
          rollNo={rollNo}
          email={email}
          phoneNumber={phoneNumber}
          address={address}
          subjectsOfInterest={subjectsOfInterest}
          isEditing={isEditing}
          userCopy={userCopy}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleAddingSubjects={() => setIsAddingSubjects(true)}
        />
        <LibraryCards libraryCardDetails={libraryCardDetails} />
      </div>
      <div>
        <EditSubjects show={isAddingSubjects} onHide={() => setIsAddingSubjects(false)} />
      </div>
      <div>
        <ChangeConfirmationModal show={isMakeChangesConfirmationOpen} handleClose={() => setIsMakeChangesConfirmationOpen(false)} onConfirm={handleConfirm} />
      </div>
    </div>
  );
};

export default Profile;
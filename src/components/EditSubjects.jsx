import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Subjects from '../constants/Subjects';
import { updateFavSubjectData } from '../features/userThunks';
import { updateSubjectOfInterest } from '../features/userSlice';
import toast from 'react-hot-toast';

function EditSubjects({ show, onHide }) {

    const dispatch = useDispatch();

    const insertRef = useRef(null);

    const subjectsOfInterest = useSelector(state => state.user.details.subjectsOfInterest);

    const [ query, setQuery ] = useState('');
    const [ suggestions, setSuggestions ] = useState([]);
    const [ selectedSubjects, setSelectedSubjects ] = useState([...subjectsOfInterest]);
    const [ selectedSubjectsSet, setSelectedSubjectsSet ] = useState(new Set(subjectsOfInterest));
    const [ activeIndex, setActiveIndex ] = useState(0);

    useEffect( () => {
        if( subjectsOfInterest ) setSelectedSubjects( [...subjectsOfInterest] );
    }, [ subjectsOfInterest ] );


    useEffect( () => {
        setActiveIndex(0);
        if( show ) {
            insertRef.current.focus();
        }
    }, [ selectedSubjects, show ] );

    const handleChangeSubjects =  async () => {
        handleClose();
        let changeMade = false;
        for( const subject in subjectsOfInterest ) {
            let f = false;
            for( const selectedSubject in selectedSubjects ) {
                if( subject === selectedSubject ) {
                    f = true;
                    break;
                }
            }

            if( f != true ) {
                changeMade = true;
                break;
            }
        }

        if( changeMade || ( selectedSubjects.length !== subjectsOfInterest ) ) {
            try {
                await dispatch( updateFavSubjectData( { subjects: selectedSubjects, membership_id: 'm_01010' } ) ).unwrap();
                
                dispatch( updateSubjectOfInterest( selectedSubjects ) );
                toast.success('Subjects updated successfully.');

            } catch (updateSubjectsError) {
                console.log( 'Subjects updation failed: ', updateFavSubjectData );
                toast.error('Subjects couldnot be updated');
            }
        }
    }

    const removeSubject = (index = selectedSubjects.length - 1) => {
        const updatedSubjects = [...selectedSubjects];
        updatedSubjects.splice(index, 1);

        setSelectedSubjects(updatedSubjects);
        setSelectedSubjectsSet(new Set(updatedSubjects));
    }

    const handleKeyDown = ( event ) => {
        if( event.key === 'Backspace' && event.target.value === "" && selectedSubjects.length > 0 ) {
            removeSubject();
            setSuggestions([]);
        } else if( event.key === 'ArrowDown' && suggestions?.length > 0 ) {
            event.preventDefault();
            setActiveIndex( (prevIndex) => ( prevIndex + 1 ) % suggestions.length )
        } else if( event.key === 'ArrowUp' && suggestions?.length > 0 ) {
            event.preventDefault();
            const temp = ( activeIndex-1 ) % suggestions.length;
            temp >= 0 ? setActiveIndex( temp ) : setActiveIndex( temp + suggestions.length );
        } else if ( event.key === 'Enter' && suggestions?.length > 0 ) {
            handleAddingSubject( suggestions[ activeIndex ] );
        }
    }  
    const handleClose = () => {
        setQuery('');
        setSuggestions([]);
        setSelectedSubjectsSet(new Set());
        setSelectedSubjects([]);
        onHide();
    }

    const handleAddingSubject = ( subject ) => {
        if ( selectedSubjects.length === 5 ) {
            toast.error('You cannot add more than 5 subjects.');
        } else {
        setSelectedSubjects([ ...selectedSubjects, subject ]);
            setSelectedSubjectsSet(new Set([...selectedSubjectsSet, subject]));
            setQuery('');
            setSuggestions([]);
            insertRef.current.focus();
        }
    }

    const handleSearch = ( event ) => {
        const val = event.target.value;
        setQuery( val );

        if( val.length === 0 ) {
            setSuggestions( [] );
            return ;
        } else {
            const filteredSubjects = Subjects.filter( ( subject ) => subject.includes( query.toLowerCase() ) );

            setSuggestions( filteredSubjects );
            return ;
        }
    }

  return (
    <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>
                Add More Subjects
                <span style={ { fontSize: '15px', marginLeft: '500px' } }>
                    {
                        `${ selectedSubjects.length }/5`
                    }
                </span>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className='flex flex-col'>
            <div className='flex-wrap'>
                <span className='flex-wrap'>
                    {
                        selectedSubjects?.map( ( subject, index ) => (
                            <span key={ subject } className='bg-black text-white w-10 mr-2 p-2 rounded-md inline'>
                                {
                                    `${ subject }` 
                                } 
                                <Button className='bg-black border-none w-10 h-8 mb-1' onClick={ () => removeSubject(index) }>
                                    ❌
                                </Button>
                            </span>
                        ) )
                    }
                </span>
                <span>
                    <input 
                        type="text" 
                        className='h-6 p-1.25 outline-none' 
                        placeholder='Subject Name'
                        value={ query }
                        onChange={ handleSearch }
                        onKeyDown={ handleKeyDown }
                        ref={ insertRef }
                    />
                </span>
            </div>
            <div style={ {  maxHeight: '300px', overflowY: 'auto', cursor: 'pointer', paddingTop: '8px' } } >
                {
                    suggestions.map( ( subject, index ) => (
                        !selectedSubjectsSet.has(subject) &&
                        <div key={ subject } style={ { padding: '4px', backgroundColor: index === activeIndex ? 'rgb(211, 211, 211)' : '' } } onClick={ () => handleAddingSubject( subject ) }>
                            {
                                `${ subject }`
                            }
                        </div>
                    ) )
                }
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={ handleChangeSubjects }>
                Make Changes
            </Button>
            <Button onClick={ handleClose }>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default EditSubjects
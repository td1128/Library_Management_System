import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

const Subjects = [
    "algorithms",
    "data structures",
    "computer architecture",
    "operating systems",
    "computer networks",
    "database systems",
    "software engineering",
    "theory of computation",
    "artificial intelligence",
    "machine learning",
    "computer graphics",
    "human-computer interaction",
    "cryptography",
    "cybersecurity",
    "programming languages",
    "compiler design",
    "distributed systems",
    "cloud computing",
    "mobile computing",
    "parallel computing",
    "web development",
    "data science",
    "big data",
    "data mining",
    "natural language processing",
    "robotics",
    "digital signal processing",
    "bioinformatics",
    "computer vision",
    "information retrieval",
    "game development",
    "software testing",
    "software project management",
    "formal methods",
    "quantum computing",
    "information theory",
    "computational complexity",
    "computer-aided design",
    "embedded systems",
    "internet of things",
    "network security",
    "wireless networks",
    "protocol design",
    "network protocols",
    "network administration",
    "cloud security",
    "web security",
    "mobile security",
    "ethical hacking",
    "digital forensics",
    "reverse engineering",
    "social network analysis",
    "visualization",
    "multimedia systems",
    "augmented reality",
    "virtual reality",
    "computer simulations",
    "real-time systems",
    "fault-tolerant systems",
    "performance analysis",
    "distributed algorithms",
    "sensor networks",
    "ad-hoc networks",
    "high-performance computing",
    "edge computing",
    "fog computing",
    "data warehousing",
    "data analytics",
    "business intelligence",
    "knowledge representation",
    "expert systems",
    "fuzzy logic",
    "neural networks",
    "genetic algorithms",
    "evolutionary computing",
    "swarm intelligence",
    "reinforcement learning",
    "deep learning",
    "pattern recognition",
    "speech recognition",
    "image processing",
    "computer animation",
    "graphics programming",
    "virtual machines",
    "operating system design",
    "memory management",
    "file systems",
    "process synchronization",
    "distributed databases",
    "database management",
    "sql programming",
    "nosql databases",
    "transaction processing",
    "concurrency control",
    "database design",
    "information systems",
    "web applications",
    "web services",
    "software architecture",
    "software maintenance",
    "requirements engineering",
    "human factors in computing"
];



function EditSubjects({ show, onHide }) {

    const insertRef = useRef(null);

    const subjectsOfInterest = useSelector(state => state.user.details.subjectsOfInterest);

    const [ query, setQuery ] = useState('');
    const [ suggestions, setSuggestions ] = useState([]);
    const [ selectedSubjects, setSelectedSubjects ] = useState([...subjectsOfInterest]);
    const [ selectedSubjectsSet, setSelectedSubjectsSet ] = useState(new Set());
    const [ activeIndex, setActiveIndex ] = useState(0);

    useEffect( () => {
        setActiveIndex(0);
        if( show ) {
            insertRef.current.focus();
        }
    }, [ selectedSubjects, show ] );

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
        setSelectedSubjects([ ...selectedSubjects, subject ]);
        setSelectedSubjectsSet(new Set([...selectedSubjectsSet, subject]));
        setQuery('');
        setSuggestions([]);
        insertRef.current.focus();
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
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className='flex flex-col'>
            <div className='flex'>
                <div className='flex-wrap'>
                    {
                        selectedSubjects.map( ( subject, index ) => (
                            <span key={ subject } className='bg-black text-white w-10 mr-2 p-2 rounded-md'>
                                {
                                    `${ subject }` 
                                } 
                                <Button className='bg-black border-none w-10 h-8 mb-1' onClick={ () => removeSubject(index) }>
                                    ❌
                                </Button>
                            </span>
                        ) )
                    }
                </div>
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
                        <div key={ index } style={ { padding: '4px', backgroundColor: index === activeIndex ? 'rgb(211, 211, 211)' : '' } } onClick={ () => handleAddingSubject( subject ) }>
                            {
                                `${ subject }`
                            }
                        </div>
                    ) )
                }
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={ handleClose }>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default EditSubjects
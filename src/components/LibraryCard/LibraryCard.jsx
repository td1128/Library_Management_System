import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import capitalizeFirstLetter from '../../utils';

function LibraryCard({ cardNo, cardStatus, bookName, authorName, issueDate, dueDate }) {
  return (
    <Card className='library-card__body centered-container'>
      <Card.Title className='text-center text-2xl'>
        {`${cardNo}`}
      </Card.Title>
      <Card.Body>
        <Col>
          <Row className='align-items-center mb-3'>
            <Col>
              <Card.Text className='text-xl'>
                Status: {capitalizeFirstLetter(cardStatus)}
              </Card.Text>
            </Col>
          </Row>
          {bookName && (
            <Row className='align-items-center mb-3'>
              <Col>
                <Card.Text className='text-xl'>
                  Book Name: {bookName}
                </Card.Text>
              </Col>
            </Row>
          )}
          {authorName && (
            <Row className='align-items-center mb-3'>
              <Col>
                <Card.Text className='text-xl'>
                  Author Name: {authorName}
                </Card.Text>
              </Col>
            </Row>
          )}
          {issueDate && (
            <Row className='align-items-center mb-3'>
              <Col>
                <Card.Text className='text-xl'>
                  Issue Date: {issueDate}
                </Card.Text>
              </Col>
            </Row>
          )}
          {dueDate && (
            <Row className='align-items-center mb-1'>
              <Col>
                <Card.Text className='text-xl'>
                  Due Date: {dueDate}
                </Card.Text>
              </Col>
            </Row>
          )}
        </Col>
      </Card.Body>
    </Card>
  );
}

export default LibraryCard;
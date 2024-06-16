import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function LibraryCard({ cardNo, cardStatus, bookName, dueDate }) {
  const allCardStatus = {
    active: {
      status: 'https://img.icons8.com/3d-fluency/94/ok.png',
      book: 'https://img.icons8.com/3d-fluency/94/book.png',
      date: 'https://img.icons8.com/3d-fluency/94/alarm-clock--v2.png'
    },
    inactive: {
      status: 'https://t4.ftcdn.net/jpg/04/54/76/13/240_F_454761318_TreFOyA3nefOXE0xlEdlPpNHkr2j2U3h.jpg'
    },
    overdue: {
      status: 'https://img.icons8.com/3d-fluency/94/cancel.png',
      book: 'https://img.icons8.com/3d-fluency/94/book.png',
      date: 'https://img.icons8.com/3d-fluency/94/alarm-clock--v2.png'
    },
    suspended: {
      status: 'https://img.icons8.com/fluency/48/overhead-load.png'
    }
  };

  return (
    <Card style={{ width: '400px', height: 'auto', overflow: 'hidden', marginBottom: '5px', marginRight: '20px' }}>
      <Card.Title className='text-center text-2xl'>
        Card Number: {`${cardNo}`}
      </Card.Title>
      <Card.Body>
        {cardStatus === 'inactive' ? (
          <Row className='align-items-center'>
            <Col style={{ paddingLeft: '5px', display: 'flex', justifyContent: 'center' }}>
              <Card.Img
                className='h-[70%] w-auto'
                src={allCardStatus[cardStatus].status}
                alt='inactive'
              />
            </Col>
            <Col className='d-flex align-items-center justify-content-center'>
              <Card.Text className='text-2xl'>
                Status: Inactive
              </Card.Text>
            </Col>
          </Row>
        ) : (
          <Col>
            <Row className='align-items-center mb-3'>
              <Col xs='auto'>
                <Card.Img
                  src={allCardStatus[cardStatus].status}
                  alt={cardStatus}
                  style={{ width: '40px' }}
                />
              </Col>
              <Col>
                <Card.Text className='text-xl'>
                  Status: {cardStatus}
                </Card.Text>
              </Col>
            </Row>
            <Row className='align-items-center mb-3'>
              <Col xs='auto'>
                <Card.Img
                  src={allCardStatus[cardStatus].book}
                  alt={cardStatus}
                  style={{ width: '40px' }}
                />
              </Col>
              <Col>
                <Card.Text className='text-xl'>
                  Book Name: {bookName}
                </Card.Text>
              </Col>
            </Row>
            <Row className='align-items-center mb-1'>
              <Col xs='auto'>
                <Card.Img
                  src={allCardStatus[cardStatus].date}
                  alt={cardStatus}
                  style={{ width: '40px' }}
                />
              </Col>
              <Col>
                <Card.Text className='text-xl'>
                  Date: {dueDate}
                </Card.Text>
              </Col>
            </Row>
          </Col>
        )}
      </Card.Body>
    </Card>
  );
}

export default LibraryCard;
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Help() {
  const faqs = [
    {
      question: "What is the purpose of the library management system?",
      answer: "The library management system is designed to streamline the management of departmental libraries in the engineering college. It helps in cataloging books, managing user accounts, tracking borrowed books, and automating various library processes."
    },
    {
      question: "How do I log in to the system?",
      answer: "You can log in to the system using your provided student ID and password. If you are a new user, please register by providing the necessary details. Faculty and staff can log in using their employee credentials."
    },
    {
      question: "How can I search for a book?",
      answer: "You can search for books using the search bar on the homepage. You can search by title, author, ISBN, or subject. Advanced search options allow you to filter results by department, publication year, and availability."
    },
    {
      question: "How do I borrow a book?",
      answer: "To borrow a book, locate the book in the catalog and check its availability. If available, click on the 'Borrow' button. You will receive a confirmation message with the due date. Ensure to pick up the book from the library within the stipulated time."
    },
    {
      question: "How many books can I borrow at a time?",
      answer: "Students can borrow up to 3 books at a time, while faculty members can borrow up to 5 books. The borrowing limit may vary depending on the department's policies."
    },
    {
      question: "How can I renew a borrowed book?",
      answer: "You can renew a book online by logging into your account, navigating to the 'My Borrowed Books' section, and selecting the book you wish to renew. Click on the 'Renew' button if the book is eligible for renewal."
    },
    {
      question: "What happens if I return a book late?",
      answer: "Late returns are subject to a fine of ₹5 per day per book. Please ensure timely returns to avoid penalties. Fines must be cleared before borrowing any new books."
    },
    {
      question: "How do I reserve a book that is currently borrowed by someone else?",
      answer: "If a book is currently unavailable, you can place a reservation by clicking on the 'Reserve' button. You will be notified via email when the book is returned and available for you to borrow."
    },
    {
      question: "How can I view my borrowing history?",
      answer: "Log in to your account and navigate to the 'Borrowing History' section. Here, you can view details of all the books you have borrowed, along with their return status and any fines incurred."
    },
    {
      question: "How do I report a lost or damaged book?",
      answer: "To report a lost or damaged book, contact the library staff immediately. You may be required to pay the cost of the book or provide a replacement. Specific policies on lost or damaged books are outlined in the library’s terms of service."
    },
    {
      question: "Can I suggest new books to be added to the library?",
      answer: "Yes, you can suggest new books by filling out the 'Book Suggestion' form available on the library's website. The library committee will review your suggestion and decide on the procurement based on the department’s needs and budget."
    },
    {
      question: "How do I change my account password?",
      answer: "To change your password, log in to your account and go to the 'Profile Settings' section. Select 'Change Password,' enter your current password, and then enter your new password. Save the changes to update your password."
    },
    {
      question: "What should I do if I forget my password?",
      answer: "If you forget your password, click on the 'Forgot Password' link on the login page. Follow the instructions to reset your password, which may involve answering security questions or receiving a reset link via email."
    },
    {
      question: "How can I contact the library staff?",
      answer: "You can contact the library staff through the 'Contact Us' section on the library’s website. Alternatively, you can visit the library during working hours or email the staff at library@example.com."
    },
    {
      question: "Are there any library rules I should be aware of?",
      answer: "Yes, all users must adhere to the library rules, including maintaining silence, handling books with care, and not eating or drinking in the library. Detailed rules and regulations are available on the library's website and posted within the library premises."
    }
  ];
  
  return (
      <div className='w-[75%] mr-2 ml-auto'>
        <Accordion defaultActiveKey='1'>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>Frequently Asked Questions (FAQs)</Accordion.Header>
            <Accordion.Body>
              <Accordion>
                {
                  faqs.map( ( q, index ) => {
                    return (
                        <Accordion.Item key={ index } eventKey={ index }>
                          <Accordion.Header>
                            {
                              `${ q.question }`
                            }
                          </Accordion.Header>
                          <Accordion.Body>
                            {
                              `${ q.answer }`
                            }
                          </Accordion.Body>
                        </Accordion.Item>
                    )
                  } )
                }
              </Accordion>
            </Accordion.Body>
          </Accordion.Item> 
          <Accordion.Item eventKey='1'>
            <Accordion.Header>
                Contact Support
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="name" placeholder="Enter full name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Department</Form.Label>
                  <Form.Control type="department" placeholder="Enter department" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Library Card Number</Form.Label>
                  <Form.Control type="department" placeholder="Enter library card number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Issue</Form.Label>
                  <Form.Control type="issue" placeholder="Issue" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className='bg-gray-400 rounded-md mt-3 h-10'>
          <h1 className='py-2 pl-3'>
            If you have any questions or need further assistance, please feel free to contact us at julib@jadavpuruniversity.com or +91 12345 67890.
          </h1>
        </div>
    </div>
  )
}

export { Help }
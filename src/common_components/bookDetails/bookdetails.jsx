import styles from "./BookDetailsFinal.module.css";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    XIcon,
    WhatsappIcon,
} from "react-share";
import {useState, useRef }from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BookDetailsFinal = () => {
    const currentPage = window.location.href;
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const shareMoodalRef = useRef();

    const handleAddToWishlist = () => {
        console.log("called addto wishlist");
    }

    const handleShare = () => {
        console.log("called share function");
        shareMoodalRef.current.click();
    }

    const availabilityCheck = true;
    return (
        <>
            <Button ref={shareMoodalRef} onClick={handleOpen} className="hidden">Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Share one item
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <EmailShareButton url={currentPage}>
            <EmailIcon size={40} round={true}/>
        </EmailShareButton>

        <WhatsappShareButton url={currentPage} className="ml-5px">
            <WhatsappIcon size={40} round={true}/>
        </WhatsappShareButton>

        <FacebookShareButton url={currentPage} className="ml-5px">
            <FacebookIcon size={40} round={true}/>
        </FacebookShareButton>

        <LinkedinShareButton url={currentPage}>
            <LinkedinIcon size={40} round={true}/>
        </LinkedinShareButton>

        <TelegramShareButton url={currentPage}>
            <TelegramIcon size={40} round={true}/>
        </TelegramShareButton>

        <TwitterShareButton url={currentPage}>
            <XIcon size={40} round={true}/>
        </TwitterShareButton>
                    </Typography>
                </Box>
            </Modal>
            <div className={styles.bookDetailsFinal}>
                <div className={styles.bookDetailsFinalChild} />
                <div className={styles.frameParent1}>
                    <div className={styles.frameParent2}>
                        <div className={styles.frameParent3}>
                            <div className={styles.bookImageWrapper}>
                                {/* <div className={styles.bookImage}>Book Image</div> */}
                                <img
                                    className={styles.bookImage}
                                    loading="lazy"
                                    alt=""
                                    src="/Book_img.jpeg"
                                />
                            </div>
                        </div>
                        <div className={styles.frameParent4}>
                            <div className={styles.frameParent5}>
                                <div className={styles.bookTitleContainerWrapper}>
                                    <div className={styles.bookTitleContainer}>
                                        Book Title
                                    </div>
                                </div>
                                <div className={styles.frameWrapper2}>
                                    <div className={styles.authorWrapper}>
                                        <div className={styles.author}>Author name</div>
                                    </div>
                                </div>
                                <div className={styles.descriptionWrapper}>
                                    <div className={styles.description}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam commodi voluptatum ratione odit blanditiis tenetur ea doloremque nulla assumenda quam.</div>
                                </div>
                                <div className={styles.publisherMcgrawHillParent}>
                                    <div className={styles.publisherMcgrawHill}>
                                        Publisher : McGraw-Hill
                                    </div>
                                    <div className={styles.genre}>{`Genre : `}</div>
                                    <div className={styles.isbn}>{`ISBN : `}</div>
                                    <div className={styles.availabilityParent}>
                                        <div
                                            className={styles.availability}
                                        >{`Availability `}
                                        </div>

                                        {/* Availability Set */}

                                        {availabilityCheck ? <img
                                            className={styles.frameChild}
                                            loading="lazy"
                                            alt=""
                                            src="/availabilityYes.svg"
                                        /> : <img
                                            className={styles.frameChild}
                                            loading="lazy"
                                            alt=""
                                            src="/availabilityNo.svg"
                                        />}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.buttonsParent}>
                                <img
                                    onClick={handleAddToWishlist}
                                    className={styles.addToWishlistIcon}
                                    loading="lazy"
                                    alt=""
                                    src="/AddtoWishlist.png"
                                />

                                <div className={styles.shareButtonWrapper}>
                                    <img
                                        onClick={handleShare}
                                        className={styles.shareButtonIcon}
                                        loading="lazy"
                                        alt=""
                                        src="/share_icon.svg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookDetailsFinal;

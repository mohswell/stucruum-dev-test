import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ModalHeader from "./ModalHeader";
import ContactInput from "./ContactInput";
import { contactFields } from "..";

const ContactATM = forwardRef(function ContactATM({ }, ref) {
  const modalRef = useRef();
  const backdropRef = useRef();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (modalRef.current) {
      setIsClosing(true); // Trigger the slideout animation

      // Wait for the animation to complete before hiding the modal
      setTimeout(() => {
        modalRef.current.style.display = "none";
        setIsClosing(false); // Reset the closing state
      }, 800); // Duration matches the slideout animation
    }

    if (backdropRef.current) {
      backdropRef.current.style.display = "none";
    }
  };

  useImperativeHandle(ref, () => ({
    open() {
      if (modalRef.current && backdropRef.current) {
        modalRef.current.style.display = "block";
        backdropRef.current.style.display = "block";
        modalRef.current.classList.remove('slideout');
        modalRef.current.classList.add('slidein');
      }
    },
  }));

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    detail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({
      ...contactData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", contactData);
    handleClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        style={{ display: "none" }}
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div >
        <div
          ref={modalRef}
          className={`absolute right-0 top-0 md:w-[656px] w-full h-screen  bg-white shadow-lg overflow-y-auto border-none transition-transform duration-300 ease-in-out z-50 ${isClosing ? 'animate-slideout' : 'animate-slidein'}`}
          style={{ display: "none", scrollbarWidth: "none" }}
        >
          <ModalHeader text="Contact ATM Creativity" handleClose={handleClose} className="pt-8 pb-[29px]" marginLeft=" ml-[20px] md:pl-5" marginRight="mr-[20px] md:pr-5" fontSize="text-xl md:text-2xl" fontWeight="font-thin" />

          <form onSubmit={handleSubmit} className="mt-[80px]  pb-4  px-5 md:px-10">
            <div className="space-y-10">
              {contactFields.map((field) => (
                <ContactInput
                  key={field.name}
                  label={field.label}
                  htmlFor={field.htmlFor}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={contactData[field.name]}
                  onChange={handleChange}
                />
              ))}
              <div className="w-full">
                <label htmlFor="shoot-detail" className="font-normal text-[1.2em] leading-[20px] text-btnBg">Shoot detail</label>
                <textarea
                  id="shoot-detail"
                  name="detail"
                  placeholder="e.g. Pre-wedding shoot, Birthday shoot, Single portrait"
                  value={contactData.detail}
                  onChange={handleChange}
                  className="w-full outline-none h-[88px] mt-4 border-gray-400 border-b placeholder:text-lg placeholder:font-thin placeholder:text-textGrey"
                />
              </div>
            </div>


            <div className="w-full flex py-6">
              <button
                type='submit'
                className='bg-btnBg  text-white rounded-[100px] py-3 px-8 text-nowrap mx-auto transition-opacity duration-300 hover:opacity-80'
              >
                Submit request
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
});

export default ContactATM;

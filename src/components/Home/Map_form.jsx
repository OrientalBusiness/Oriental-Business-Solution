import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { APP_CONFIG } from '../../config/app.config'

const Map_form = () => {

  const formRef = useRef();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = (formValues) => {
    const errors = {};
    for (const [key, value] of Object.entries(formValues)) {
      if (value?.trim() === '') {
        errors[key] = `${key} is required`;
      }
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());
    let formValid = true;
    const errors = validateForm(formValues);
    if (Object.keys(errors).length > 0) {
      formValid = false;
    }

    if (formValid) {
      setFormSubmitted(true);
      const emailConfig = APP_CONFIG.emailJs;
      const { service, contact_template, publicKey } = emailConfig;
      emailjs
        .sendForm(
          service,
          contact_template,
          formRef.current,
          publicKey
        )
        .then(
          (result) => {
            console.log(result.text);
            toast.success("Message sent successfully!");
            formRef.current.reset();
            setFormSubmitted(false);
          },
          (error) => {
            console.log(error.text);
            toast.error("Failed to send the message, please try again.");
          }
        );
    } else {
      toast.warn("Please fill in all fields.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row m-0 py-4">
          <div className="col-12 col-md-6 mt-3 ">
            <iframe
              className="home_map"
              src={APP_CONFIG.gmapLink}
              style={{
                border: "0",
                width: "100%",
              }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div
            className="col-12 col-md-6 mt-3 p-4 home_contact_form"
            style={{
              background: "#fff",
              color: "black",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Send A Message</h2>
            <p>
              Use our contact form below to get started on optimizing your
              financial strategy with confidence.
            </p>
            <form ref={formRef} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <select
              className="form-select"
              style={{border: '1px solid #767676'}}
              name="service"
              required
            >
              <option value="" disabled>
                Select a service
              </option>
              <option value="Tax Consulting">Tax Consulting</option>
              <option value="Bookkeeping Services">Bookkeeping Services</option>
              <option value="Taxes">Taxes</option>
              <option value="Business Registration">Business Registration</option>
              <option value="Loans & Mortgages">Loans & Mortgages</option>
              <option value="Rental Property HST Rebates">Rental Property HST Rebates</option>
              <option value="Auditing">Auditing</option>
              <option value="Payroll Management">Payroll Management</option>
              <option value="Tax Planning and Reporting">Tax Planning and Reporting</option>
              <option value="Legally Required">Legally Required</option>
            </select>
            <textarea
              name="message"
              placeholder="Message"
              required
            ></textarea>
            <button disabled={formSubmitted} type="submit">Send Message</button>
          </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map_form;

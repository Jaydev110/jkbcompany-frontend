import React, { useState } from "react";
import { createContact } from "../../api/contactapi";
import "./ContactUs.css";

const ContactUs = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // =========================================
  // HANDLE INPUT CHANGE
  // =========================================
  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================
  // SUBMIT CONTACT FORM
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createContact(contact);

      alert("Your message has been sent successfully!");

      setContact({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jkb-contact-page">

      {/* =========================================
          CONTACT HERO
      ========================================= */}

      <section className="contact-hero">

        <div className="contact-hero-container">

          <div className="contact-hero-content">

            <span className="contact-label">
              GET IN TOUCH
            </span>

            <h1>
              Let's talk about
              <span> JKB Employee Management</span>
            </h1>

            <p>
              Have a question about the JKB Employee Management
              Portal? Need support or want to learn more about
              the platform? We're here to help.
            </p>

          </div>


          <div className="contact-hero-visual">

            <div className="contact-logo-box">
              JKB
            </div>

            <div className="contact-floating-card">

              <span className="contact-online-dot"></span>

              <div>
                <strong>
                  We're here to help
                </strong>

                <small>
                  JKB Support Team
                </small>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CONTACT INFORMATION + FORM
      ========================================= */}

      <section className="contact-main-section">

        <div className="contact-main-container">

          {/* =====================================
              CONTACT INFORMATION
          ===================================== */}

          <div className="contact-information">

            <span className="contact-section-label">
              CONTACT INFORMATION
            </span>

            <h2>
              We'd love to
              <span> hear from you</span>
            </h2>

            <p className="contact-info-description">
              Reach out to us for questions, feedback,
              technical support or information about the
              JKB Employee Management Portal.
            </p>


            {/* EMAIL */}

            <div className="contact-info-card">

              <div className="contact-info-icon">
                @
              </div>

              <div>
                <span>
                  Email
                </span>

                <a href="mailto:jkbcompany@gmail.com">
                  jkbcompany@gmail.com
                </a>
              </div>

            </div>


            {/* PHONE */}

            <div className="contact-info-card">

              <div className="contact-info-icon">
                ☎
              </div>

              <div>
                <span>
                  Phone
                </span>

                <a href="tel:+918260912154">
                  +91 8260912154
                </a>
              </div>

            </div>


            {/* LOCATION */}

            <div className="contact-info-card">

              <div className="contact-info-icon">
                📍
              </div>

              <div>
                <span>
                  Location
                </span>

                <p>
                  Puri, Odisha, India
                </p>
              </div>

            </div>

          </div>


          {/* =====================================
              CONTACT FORM
          ===================================== */}

          <div className="contact-form-card">

            <div className="contact-form-heading">

              <h2>
                Send us a message
              </h2>

              <p>
                Fill in the form below and we'll get back
                to you as soon as possible.
              </p>

            </div>


            <form onSubmit={handleSubmit}>

              {/* NAME + EMAIL */}

              <div className="contact-input-row">

                <div className="contact-input-group">

                  <label htmlFor="name">
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={contact.name}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="contact-input-group">

                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={contact.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* SUBJECT */}

              <div className="contact-input-group">

                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="What can we help you with?"
                  value={contact.subject}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* MESSAGE */}

              <div className="contact-input-group">

                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  rows="5"
                  value={contact.message}
                  onChange={handleChange}
                  required
                ></textarea>

              </div>


              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                className="contact-submit-button"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}

                {!loading && (
                  <span>
                    →
                  </span>
                )}

              </button>

            </form>

          </div>

        </div>

      </section>


      {/* =========================================
          BOTTOM CTA
      ========================================= */}

      <section className="contact-bottom-section">

        <div className="contact-bottom-container">

          <div>

            <span>
              JKB EMPLOYEE MANAGEMENT PORTAL
            </span>

            <h2>
              Need help with the portal?
            </h2>

            <p>
              Our contact team can help with questions,
              account issues and general portal support.
            </p>

          </div>

          <a
            href="mailto:jkbcompany@gmail.com"
            className="contact-email-button"
          >
            Email JKB Support →
          </a>

        </div>

      </section>

    </div>
  );
};

export default ContactUs;
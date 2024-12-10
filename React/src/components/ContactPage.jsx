import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/API/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setFormData({ name: '', email: '', message: '' }); // Reset the form
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting the contact form:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Contact Us</h1>
            <div className="row">
                {/* Contact Details */}
                <div className="col-md-6 mb-4">
                    <h3>Contact Details</h3>
                    <p><strong>Email:</strong> roomiesofficial@roomies.in</p>
                    <p><strong>Phone:</strong> +1-234-567-890</p>
                    <p><strong>Address:</strong> 123 Roomies Lane, New York, NY 10001</p>
                    <h4>Follow Us</h4>
                    <ul className="list-unstyled d-flex">
                        <li className="me-3">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook fa-2x"></i>
                            </a>
                        </li>
                        <li className="me-3">
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter fa-2x"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram fa-2x"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                {/* Contact Form */}
                <div className="col-md-6">
                    <h3>Contact Form</h3>
                    {isSubmitted ? (
                        <div className="alert alert-success">
                            Thank you for your message! We will get back to you soon.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-control"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

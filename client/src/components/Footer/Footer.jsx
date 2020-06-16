import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';
import $ from 'jquery';
import axios from 'axios';

const Footer = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);

    const handleName = e => {
        setName(e.target.value);
    }

    const handleEmail = e => {
        setEmail(e.target.value);
    }

    const handleMessage = e => {
        setMessage(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const data = { name, email, message };
        
        axios.post('/send', data)

//         axios({
//             method: "POST", 
//             url:"http://localhost:5000/send", 
//             data
//         })
        // .then((response) => {
        //     if (response.data.status === 'success') {
        //         setSuccessful(true);
        //         successModal();
        //         resetForm();
        //         alert("Message Sent."); 
        //         console.log('success');
        //     } else if (response.data.status === 'fail') {
        //         setSuccessful(false);
        //         errorModal();
        //         alert("Message failed to send.");
        //         console.log('error');
        //     }
        //     console.log(response);
        // });

        // axios.post('API_URI', data)
        .then( res => {
            setSuccessful(true);
            successModal();
            resetForm();
        })
        .catch( () => {
            setSuccessful(false);
            errorModal();
        })
    
        const resetForm = () => {
            setName('');
            setEmail('');
            setMessage('');
        }

        const successModal = () => {
            $('#successModal').modal('show');
        }

        const errorModal = () => {
            $('#errorModal').modal('show');
        }
    }

    useEffect(() => {

        // jQuery again🤦‍♂️
        // Initialize Tooltip
        $('[data-toggle="tooltip2"]').tooltip();

        // Add smooth scrolling to all links in navbar + footer link
        $("a[href='#footerForm'], footer a[href='#top']").on('click', function(event) {

            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            const hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        });
    });

  return (
    <footer className="text-white">
        <div className="row">
            <div className="col-md-3 infoAbout text-center">
                <h3>About Us</h3>
                <hr/>
                <p>COVID-19 TRAQA is an open source software which was developed by a young developer by name <a href="https://www.linkedin.com/in/fabrice-ngoran-153a81198" target="_blank" rel="noopener noreferrer"><b>Fabrice Ngoran</b></a> as part of the <a href="https://www.stemsel.com" target="_blank" rel="noopener noreferrer"><b>STEMSEL's</b></a> covid-19-online-babysitting-iot-stem-ai <a href="https://events.theiet.org/events/covid19-online-babysitting-iot-stem-ai/" target="_blank" rel="noopener noreferrer"><b>project</b></a>. So you can best support us by spreading the word to others about this awesome app.</p>
            </div>

            <div className="col-md-3 infoContact">
                <h3>Contact Us</h3>
                <hr />
                <small>Because <span className="text-white"><FontAwesomeIcon icon="virus" /> COVID-TRACKER <FontAwesomeIcon icon="viruses" /></span> doesn't yet have any social media platform. We've provided the developer's info instead.</small>
                <hr/>
                <p><FontAwesomeIcon icon="map-marker" color="#fff" /><span> Location:</span> Douala, Cameroon</p>
                <p><FontAwesomeIcon icon="phone" color="#fff" /><span> Phone:</span> +237 677-790-980</p>
                <p><FontAwesomeIcon icon="envelope" color="#fff" /><span> Email:</span> fabricengoran9@gmail.com</p>
                <p><FontAwesomeIcon icon={["fab", "twitter"]} color="#fff" /><span> Twitter:</span> fabrice ngoran</p>
                <p><FontAwesomeIcon icon={["fab", "linkedin-in"]} color="#fff" /><span> LinkedIn:</span> fabrice ngoran</p>
                <p><FontAwesomeIcon icon={["fab", "facebook-f"]} color="#fff" /><span> Facebook:</span> Fabrice Ngoran</p><br />
            </div>

            <div className="col-md-6" id="request">
                <h3 className="page-header text-center"><span className="fa fa-send"></span> We'll like to hear from you!</h3>
                <hr />

                
                {/* <!-- Modal --> */}
                {
                    successful ?
                        (
                        <div className="modal fade feedBackModal" id="successModal" role="dialog">
                            <div className="modal-dialog">

                                {/* <!-- Modal content--> */}
                                <div className="modal-content modal-success">
                                    <div className="modal-header">
                                        <h4>Success!</h4>
                                        <button type="button" className="close" data-dismiss="modal">×</button>
                                    </div>
                                    <div className="modal-body">
                                        <p className="feedBack-msg">Thank you for your feedback.</p>
                                        <hr/>
                                        <p className="feedBack-msg">If don't receive an email from <em>US</em>, then the email you entered was incorrect.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    :
                        (
                        <div className="modal fade feedBackModal" id="errorModal" role="dialog">
                            <div className="modal-dialog">

                                {/* <!-- Modal content--> */}
                                <div className="modal-content modal-error">
                                    <div className="modal-header">
                                        <h4>Error!</h4>
                                        <button type="button" className="close" data-dismiss="modal">×</button>
                                    </div>
                                    <div className="modal-body">
                                        <p className="feedBack-msg">Sorry! Message was not sent. Please make sure...</p>
                                        <hr/>
                                        <ul>
                                            <li>You have entered in all required fields.</li>
                                            <li>The <b>email</b> address you've provided is valid.</li>
                                            <li>You have an active or a stable internet connection.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                }

                <form 
                className="form-group" 
                id="footerForm"  
                onSubmit={e => handleSubmit(e)} 
                method="POST"
                action="send"
                >
                    <label htmlFor="name">Name <span><small className="text-danger">*optional.</small></span></label>
                    <input value={name} onChange={e => handleName(e)} type="text" name="name" className="form-control" placeholder="Enter your name" />
                    <br/>

                    <label htmlFor="name">Email <span> <small className="text-danger">*required.</small></span></label>
                    <input value={email} onChange={e => handleEmail(e)} type="email" name="email" className="form-control" placeholder="Enter your email" reqiured />
                    <br/>
                    
                    <label htmlFor="message">Message <span><small className="text-danger">*required.</small></span></label>
                    <textarea value={message} onChange={e => handleMessage(e)} name="message" className="form-control" placeholder="Write your message here" required></textarea><br/>
                    <button type="submit" className="btn pull-right">Send</button>
                </form>
            </div>
        </div><br /><br />

        <div className="text-center trackcorona">
            <p><i>We want to acknowledge <b className="text-dark">TrackCorona</b> for their awesome API. Visit <a href="http://www.trackcorona.live" target="_blank" rel="noopener noreferrer">www.trackcorona.live</a> for more info.</i></p>
        </div>

        <hr/>

        <div className="container">
            <div className="row" id="social">
                <ul className="list-inline mx-auto">
                    <li>
                        <a href="https://web.facebook.com/fabrice.ngoran.524" target="_blank" rel="noopener noreferrer">
                            <div className="col-md-3" data-toggle1="tooltip" title="Facebook"><FontAwesomeIcon icon={["fab", "facebook-f"]} /></div>
                        </a>
                    </li>
                    <li>
                        <a href="tel:+237 677790980">
                            <div className="col-md-3" data-toggle1="tooltip" title="phone"><FontAwesomeIcon icon={["fab", "whatsapp"]} /></div>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/fabrice-ngoran-153a81198" target="_blank" rel="noopener noreferrer">
                            <div className="col-md-3" data-toggle1="tooltip" title="LinkedIn"><FontAwesomeIcon icon={["fab", "linkedin-in"]} /></div>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/fabricengoran1" target="_blank" rel="noopener noreferrer">
                            <div className="col-md-3" data-toggle1="tooltip" title="Twitter"><FontAwesomeIcon icon={["fab", "twitter"]} /></div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div className="text-center">
            <a className="up-arrow" href="#top" data-toggle="tooltip2" title="TO TOP">
            <FontAwesomeIcon icon="chevron-up" />
            </a><br /><br />
            <p className="copyright">COPYRIGHT <FontAwesomeIcon icon="copyright" /> 2020, <FontAwesomeIcon icon="virus" /> COVID-19 TRAQA <FontAwesomeIcon icon="viruses" /></p>
        </div>
    </footer>
  )
}

export default Footer;

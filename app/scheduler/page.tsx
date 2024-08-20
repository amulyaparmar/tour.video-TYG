"use client";
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import { BackIcon, CloseIcon, ShareIcon } from '@/lib/Icons';
import moment from 'moment/moment';
import { bookAppointment, getAvailablePropertyHours, getProperty } from '@/utils/util';
import './Calendar.css'

const Scheduler = ({ propertyInfo, setTitle, setSubtitle, setStep, onTimeSelect }) => {
  const [selectedScheduleDate, setSelectedScheduleDate] = useState(new Date());
  let defaulthours = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
  ];
  const [availablePropertyHours, setAvailablePropertyHours] = useState(defaulthours);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      // if current hour is greater than 9pm
      if (now.getHours() >= 21) {
        // Add one day to the current date
        const nextDay = new Date(now);
        nextDay.setDate(now.getDate() + 1);
        setSelectedScheduleDate(nextDay);
      }
    };
    updateDate();
  }, []);

  useEffect(() => {
    if (propertyInfo && selectedScheduleDate) {
      let propertyHours = getAvailablePropertyHours(selectedScheduleDate, propertyInfo);
      setAvailablePropertyHours(
        propertyHours.length > 0 ? propertyHours : defaulthours
      );
    }
  }, [selectedScheduleDate, propertyInfo]);

  const timezone = 'EST';
  return (
    <div>
      <div className="calendar">
        <Calendar
          minDate={new Date(new Date().getTime() + 60 * 60 * 24 * 1000)}
          onChange={(value) => {
            if (!(value < new Date())) {
              setSelectedScheduleDate(value);
            }
          }}
          value={selectedScheduleDate}
          tileDisabled={({ date }) =>
            date.getDay() === 0 || date.getDay() === 6 // Disable weekends (example)
          }
        />
      </div>
      <div className="time-table">
        <div className="time-list">
          {availablePropertyHours?.map((item, idx) => (
            <div
              onClick={() => {
                onTimeSelect(selectedScheduleDate, item);
                setStep(3);
                setTitle("Confirm Your In-Person Tour");
              }}
              key={idx}
              style={{ border: '1px solid #3898ec' }}
              className={`flex items-center cursor-pointer justify-center text-sm py-2 rounded-md hover:bg-blue-50`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Confirmation = ({ setStep, onSubmit }) => {
  const [userinfo, setUserInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!userinfo.firstname) newErrors.firstname = 'First name is required';
    if (!userinfo.lastname) newErrors.lastname = 'Last name is required';
    if (!userinfo.email) newErrors.email = 'Email is required';
    if (!userinfo.phone) newErrors.phone = 'Phone number is required';

    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userinfo.email && !emailRegex.test(userinfo.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const success = await onSubmit(userinfo);
      setLoading(false);
      if (success) {
        setStep(4);
      }
    }
  };

  return (
    <div className="p-6 text-center bg-white rounded-lg max-w-md mx-auto">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <label className="flex flex-col items-start flex-grow">
            <span className="mb-2 font-medium">First name*</span>
            <input
              type="text"
              name="firstName"
              placeholder="Your first name"
              value={userinfo.firstname}
              onChange={(e) =>
                setUserInfo({ ...userinfo, firstname: e.target.value })
              }
              className={`border-solid ml-0 w-full px-3 py-2 p-3 border ${errors.firstname ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.firstname && (
              <span className="text-red-500 text-sm">{errors.firstname}</span>
            )}
          </label>
          <label className="flex flex-col items-start flex-grow">
            <span className="mb-2 font-medium">Last name*</span>
            <input
              type="text"
              name="lastName"
              placeholder="Your last name"
              value={userinfo.lastname}
              onChange={(e) =>
                setUserInfo({ ...userinfo, lastname: e.target.value })
              }
              className={`border-solid ml-0 w-full px-3 py-2 p-3 border ${errors.lastname ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.lastname && (
              <span className="text-red-500 text-sm">{errors.lastname}</span>
            )}
          </label>
        </div>
        <label className="flex flex-col items-start">
          <span className="mb-2 font-medium">Email*</span>
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            value={userinfo.email}
            onChange={(e) =>
              setUserInfo({ ...userinfo, email: e.target.value })
            }
            className={`border-solid ml-0 w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </label>
        <label className="flex flex-col items-start">
          <span className="mb-2 font-medium">Phone*</span>
          <input
            type="tel"
            name="phone"
            placeholder="Your phone number"
            value={userinfo.phone}
            onChange={(e) =>
              setUserInfo({ ...userinfo, phone: e.target.value })
            }
            className={`border-solid ml-0 w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          )}
        </label>
        <p className="text-gray-600 text-sm mb-4">
          By submitting this form, you agree to the{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Use
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>{' '}
          and consent to being contacted at this phone number by text message or
          phone call for marketing, by the property, and anyone acting on their
          behalf. I understand consent is not required to purchase or rent.
        </p>
        <button
          type="submit"
          className="border-none justify-center	w-full py-3 bg-orange-400 text-white font-semibold rounded hover:bg-orange-500 transition-colors duration-300"
        >
          {loading ? 'Loading...' : 'Confirm Your Tour'}
        </button>
      </form>
    </div>
  );
};

const ThankYouScreen = () => (
  <div className="p-6 text-center bg-white rounded-lg max-w-md mx-auto">
    <div className="text-6xl mb-4">🎉</div>
    <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
    <p className="text-lg text-gray-600 mb-6">
      Your tour has been successfully scheduled. We look forward to seeing you!
    </p>
  </div>
);

const TourScheduler = ({ propertyInfo, uuid, integrationDetails }) => {
  const [scheduleDetails, setScheduleDetails] = useState(null);
  const [title, setTitle] = useState('Schedule A Tour');
  const [subtitle, setSubtitle] = useState('Select your tour type');
  const [step, setStep] = useState(1);
  const [selectedTourType, setSelectedTourType] = useState('');

  const handleTimeSelect = (date, time) => {
    setScheduleDetails({ date, time });
    setSubtitle(`${moment(date).format('ll')} at ${time} CST`);
    setStep(3);
  };

  const onSubmit = async (userinfo) => {
    const success = await bookAppointment(uuid, {
      metadata: [
        {
          lead_type: 'Tour',
          tour_timezone: 'CST',
          tour_time_start: moment(
            `${moment(scheduleDetails?.date).format('L')} ${scheduleDetails?.time}`,
            'MM/DD/YYYY hh:mm A'
          ).toISOString(),
          tour_time_start_originating_timezone: `${moment(
            scheduleDetails?.date
          ).format('L')} ${scheduleDetails?.time}`,
          tour_date: moment(scheduleDetails?.date).format('MMM DD'),
          tour_time_from: scheduleDetails?.time,
          tour_time_to: moment(scheduleDetails?.time, 'hh:mm A')
            .add(30, 'm')
            .format('hh:mm A'),
          tour_type:
            selectedTourType === 'in-person' ? 'In-Person' : 'Virtual',
          tour_length: '30 Minutes',
          tour_summary: `Tour Type: ${
            selectedTourType === 'in-person' ? 'In-Person' : 'Virtual'
          } Tour. Tour Scheduled from Leasemagnets. Scheduled 30 Minute Appointment on ${moment(
            scheduleDetails?.date
          ).format('L')} at ${scheduleDetails?.time}`,
        },
      ],
    }, userinfo, integrationDetails["api-entrata"]);
    return success;
  };

  return (
    <div 
    
    className="border border-grey-500 w-full h-screen flex flex-col items-center justify-center  bg-white">
      <div className="border border-grey-500 border-ll-text/10 w-full sm:w-[465px] mx-auto relative flex flex-col overflow-hidden rounded-[36px] bg-white">
        <div className="justify-start w-full h-20 flex flex-row bg-white px-5 sm:px-6 border-b border-ll-borders/10">
          <button
            onClick={() => {
              if (step > 1) {
                if (step === 3) {
                  setTitle("Schedule Your In-Person Tour");
                  setSubtitle("Choose an available date and time.");
                } else if (step === 2) {
                  setTitle("Schedule A Tour");
                  setSubtitle("Select your tour type.");
                }
                setStep(step - 1);
              }
            }}
            className={`${step > 1 ? 'visible' : 'invisible'} flex self-center w-7 h-7 mr-2 sm:mr-2 sm:w-9 sm:h-9 relative items-center justify-center border border-slate-500 rounded-md transition hover:border-ll-borders/20`} aria-label="Go back to previous screen">
            <BackIcon fillColor="#000000" />
          </button>
          <div className="w-full text-center self-center pr-10">
            <p className="w-full text-lg sm:text-xl leading-5 sm:leading-7 truncate">{title}</p>
            <p className="w-full text-sm sm:text-md font-light leading-5 sm:leading-6">{subtitle}</p>
          </div>
          <button
            className="bg-[#f09f54] absolute right-6 self-center bg-ll-buttons border-2 border-white/40 rounded-lg h-10 w-10 ml-auto hover:opacity-80 transition-opacity"
            aria-label="Copy the current URL"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
            }}
          >
            <ShareIcon />
          </button>

        </div>
        <div className="h-view-height overflow-auto w-full flex-grow flex flex-col content-start">
          {step === 1 && (
            <ul className="px-8">
              <li className="mt-2 border-ll-borders/10 mb-1 border-b py-4 text-center last:border-b-0 first:pt-0">
               <div
               className='cursor-pointer	'
                onClick={() => {
                  setStep(2);
                  setTitle("Schedule Your In-Person Tour");
                  setSubtitle("Choose an available date and time.");
                  setSelectedTourType("in-person");
                }}
               >
                <div className="flex-columns mb-1 flex flex-wrap justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    className="mb-1 h-6 w-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    ></path>
                  </svg>
                  <h3 className="text-md w-full">In-Person Tour</h3>
                </div>
                <p className="px-0 text-base font-light sm:px-5">
                  Meet in-person with one of our experienced leasing agents to learn more
                  about our community and apartment homes.
                </p>
                <button
                  className="border-none text-[#f09f54] text-ll-buttons mt-2 block w-full py-1 font-medium transition hover:underline hover:opacity-80"
                  onClick={() => {
                    setStep(2);
                    setTitle("Schedule Your In-Person Tour");
                    setSubtitle("Choose an available date and time.");
                    setSelectedTourType("in-person");
                  }}
                >
                  Schedule an In-Person Tour
                </button>
                </div>
              </li>
              <li className="border-ll-borders/10 mb-1 border-b py-4 text-center last:border-b-0 first:pt-0">
                <div
                className='cursor-pointer	'
                 onClick={() => {
                  setStep(2);
                  setTitle("Schedule Your Virtual Tour");
                  setSubtitle("Choose an available date and time for your virtual visit.");
                  setSelectedTourType("virtual");
                }}
                >
                <div className="flex-columns mb-1 flex flex-wrap justify-center">
                  <svg width="32px" height="32px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M759.3 352h84.3c15.5 0 28.1 9.2 28.1 20.5v277.3c0 11.3-12.6 20.5-28.1 20.5h-70.3" fill="#8CAAFF" />
                    <path d="M843.5 695h-70.2v-49.5h70.2c1.4 0 2.5-0.2 3.3-0.4v-268c-0.9-0.2-2-0.4-3.3-0.4h-84.2v-49.5h84.3c29.6 0 52.8 19.9 52.8 45.3v277.3c0 25.4-23.3 45.2-52.9 45.2z" fill="#333333" />
                    <path d="M203.5 258h531c13.7 0 24.7 11.1 24.7 24.7v457.8c0 13.7-11.1 24.7-24.7 24.7h-531c-13.7 0-24.7-11.1-24.7-24.7V282.7c-0.1-13.6 11-24.7 24.7-24.7z" fill="#FFFFFF" />
                    <path d="M734.5 790h-531c-27.3 0-49.5-22.2-49.5-49.5V282.7c0-27.3 22.2-49.5 49.5-49.5h531c27.3 0 49.5 22.2 49.5 49.5v457.8c0 27.3-22.2 49.5-49.5 49.5z m-531-507.3v457.8h531V282.7h-531z" fill="#333333" />
                    <path d="M595.8 521.2L407 656c-5.6 4-13.3 2.7-17.3-2.9-1.5-2.1-2.3-4.6-2.3-7.2V376.3c0-6.8 5.5-12.4 12.4-12.4 2.6 0 5.1 0.8 7.2 2.3L595.8 501c5.6 4 6.9 11.7 2.9 17.3-0.8 1.1-1.8 2.1-2.9 2.9z" fill="#8CAAFF" />
                    <path d="M399.9 683c-2.1 0-4.1-0.2-6.2-0.5-9.8-1.6-18.4-7-24.1-15.1-4.5-6.3-6.9-13.8-6.9-21.6V376.3c0-20.5 16.6-37.1 37.1-37.1 7.8 0 15.2 2.4 21.6 6.9l188.8 134.8c8.1 5.8 13.4 14.3 15 24.1 1.6 9.8-0.6 19.6-6.4 27.7-2.4 3.4-5.3 6.3-8.7 8.7L421.3 676.2c-6.3 4.5-13.8 6.8-21.4 6.8z m12.2-282.6v221.5l155.1-110.7-155.1-110.8zM581.4 501s0 0.1 0 0z" fill="#333333" />
                  </svg>
                  <h3 className="text-md w-full">Virtual Tour</h3>
                </div>
                <p className="px-0 text-base font-light sm:px-5">
                  Join a virtual session with one of our leasing agents to explore our
                  community and apartment homes from the comfort of your home.
                </p>
                <button
                  className="border-none text-[#f09f54] text-ll-buttons mt-2 block w-full py-1 font-medium transition hover:underline hover:opacity-80"
                  onClick={() => {
                    setStep(2);
                    setTitle("Schedule Your Virtual Tour");
                    setSubtitle("Choose an available date and time for your virtual visit.");
                    setSelectedTourType("virtual");
                  }}
                >
                  Schedule a Virtual Tour
                </button>
                </div>
              </li>
            </ul>
          )}
          {step === 2 && (
            <Scheduler
              propertyInfo={propertyInfo}
              setTitle={setTitle}
              setSubtitle={setSubtitle}
              setStep={setStep}
              onTimeSelect={handleTimeSelect}
            />
          )}
          {step === 3 && (
            <Confirmation
              setStep={setStep}
              setTitle={setTitle}
              setSubtitle={setSubtitle}
              scheduleDate={scheduleDetails.date}
              scheduleTime={scheduleDetails.time}
              onSubmit={onSubmit}
            />
          )}
          {step === 4 && <ThankYouScreen />}
        </div>
      </div>
    </div>
  );
};

const App = ({ integrationDetails, uuid }) => {
  const [propertyInfo, setPropertyInfo] = useState();

  useEffect(() => {
    (async () => {
      const propertyData = await getProperty(integrationDetails["api-entrata"]);
      setPropertyInfo(propertyData);
    })();
  }, [integrationDetails]);

  return (
    <div style={{backgroundColor : 'white',height : '100vh'}}>
      <TourScheduler propertyInfo={propertyInfo} uuid={uuid} integrationDetails={integrationDetails} />
    </div>
  );
};

export default App;

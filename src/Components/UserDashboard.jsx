import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const UserDashboard = () => {
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState('');
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        userId: '', // Set the userId according to your authentication
        locationId: '',
        dateTime: new Date(),
        status: 'Pending',
        adminComment: ''
        // Other appointment details
    });

    useEffect(() => {
        fetchLocations();
        fetchAppointments();
    }, []);

    const fetchLocations = () => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            setError('User not logged in');
            return;
        }

        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.get('http://localhost:5000/locations')
            .then(res => {
                setLocations(res.data);
                setError('');
            })
            .catch(() => {
                setError('Error fetching locations from server');
                setLocations([]);
            });
    };

    const fetchAppointments = () => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            setError('User not logged in');
            return;
        }

        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.get('http://localhost:5000/appointments')
            .then(res => {
                const appointmentsWithNames = res.data.map(appointment => ({
                    ...appointment,
                    userId: appointment.userId.name,
                    locationId: appointment.locationId.name
                }));
                setAppointments(appointmentsWithNames);
                setError('');
            })
            .catch(() => {
                setError('Error fetching appointments from server');
                setAppointments([]);
            });
    };

    const handleSubmitAppointment = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            setError('User not logged in');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId; // Assuming the userId is included in the JWT payload

            axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

            const appointmentData = {
                ...newAppointment,
                userId: userId
            };

            axios.post('http://localhost:5000/appointments', appointmentData)
                .then(res => {
                    console.log('Appointment created successfully:', res.data);
                    setNewAppointment({
                        userId: '',
                        locationId: '',
                        dateTime: new Date(),
                        status: 'Pending',
                        adminComment: ''
                    });
                    setShowAppointmentForm(false);
                    fetchAppointments();
                })
                .catch(error => {
                    console.error('Error creating appointment:', error);
                });
        } catch (error) {
            console.error('Error decoding JWT token:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>User Dashboard</h1>
            <h2>Locations</h2>

            {locations.map((location, index) => (
                <div key={index} className="mb-4">
                    <p><strong>Name:</strong> {location.name}</p>
                    <p><strong>Price:</strong> {location.price}</p>
                    <p><strong>City:</strong> {location.city}</p>

                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setShowAppointmentForm(true);
                            setNewAppointment({
                                ...newAppointment,
                                locationId: location._id
                            });
                        }}
                    >
                        Make Appointment
                    </button>
                </div>
            ))}

            {showAppointmentForm && (
                <div className="mb-4">
                    <h3>Appointment Form</h3>
                    <form onSubmit={handleSubmitAppointment}>
                        <div className="mb-3">
                            <label htmlFor="locationSelect" className="form-label">Location:</label>
                            <select
                                className="form-select"
                                id="locationSelect"
                                value={newAppointment.locationId}
                                onChange={(e) => setNewAppointment({ ...newAppointment, locationId: e.target.value })}
                            >
                                <option value="">Select a location</option>
                                {locations.map((location) => (
                                    <option key={location._id} value={location._id}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dateTimeInput" className="form-label">Date & Time:</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="dateTimeInput"
                                value={newAppointment.dateTime}
                                onChange={(e) => setNewAppointment({ ...newAppointment, dateTime: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Appointment</button>
                    </form>
                </div>
            )}

            <h2 className='mt-5'>Appointments</h2>
            {appointments.map((appointment, index) => (
                <div key={index} className="mb-4">
                    <p className="card-text">User: {appointment.userId}</p>
                    <p className="card-text">Location: {appointment.locationId}</p>
                    <p className="card-text">Date & Time: {appointment.dateTime}</p>
                    <p className="card-text">Status:
                        <span className={`fw-bold ${appointment.status === 'Pending' ? 'text-primary' :
                            appointment.status === 'Confirmed' ? 'text-success' :
                                appointment.status === 'Cancelled' ? 'text-danger' :
                                    ''
                            }`}>
                            {appointment.status}
                        </span>
                    </p>
                    <p className="card-text">Admin Comment: {appointment.adminComment}</p>
                </div>
            ))}

            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default UserDashboard;

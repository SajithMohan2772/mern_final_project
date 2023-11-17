import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AdminDashboard = () => {
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        city: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [editLocationId, setEditLocationId] = useState(null);

    const [appointments, setAppointments] = useState([]);
    const [editAppointmentId, setEditAppointmentId] = useState(null);
    const [editedStatus, setEditedStatus] = useState('');
    const [editedAdminComment, setEditedAdminComment] = useState('');

    useEffect(() => {
        fetchLocations();
        fetchAppointments();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError('User not logged in');
            return;
        }

        console.log('Token:', token);
        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;
        fetchLocations();
    }, []);

    const fetchLocations = () => {
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

    const handleSubmit = () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError('User not logged in');
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId; // Assuming the userId is included in the JWT payload

        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        // Set the userId in the formData object
        const locationData = {
            ...formData,
            userId: userId
        };

        if (editMode && editLocationId) {
            // Edit mode: Update location
            axios.put(`http://localhost:5000/locations/${editLocationId}`, locationData)
                .then(res => {
                    console.log('Location updated successfully:', res.data);
                    const updatedLocations = locations.map(loc => {
                        if (loc._id === editLocationId) {
                        return { ...loc, ...locationData };
                    }
                    return loc;
                });
                setLocations(updatedLocations);
                setEditMode(false);
                setEditLocationId(null);
                setFormData({ name: '', price: '', city: '' });
            })
                .catch(error => {
                    console.error('Error updating on server:', error);
                });
        } else {
            // Add mode: Create new location
            if (locationData.name && locationData.price && locationData.city) {
                axios.post('http://localhost:5000/locations', locationData)
                    .then(res => {
                        console.log('Location added successfully:', res.data);
                        setFormData({ name: '', price: '', city: '' });
                        fetchLocations();
                    })
                    .catch(error => {
                        console.error('Error adding location:', error);
                    });
            } else {
                console.warn('Please provide all location details to add.');
            }
        }
    };


    const handleEdit = (locationId, locationData) => {
        setEditMode(true);
        setEditLocationId(locationId);
        setFormData(locationData);
    };

    const handleDelete = (locationId) => {
        axios.delete(`http://localhost:5000/locations/${locationId}`)
            .then(() => {
                console.log('Location deleted successfully');
                const updatedLocations = locations.filter(loc => loc._id !== locationId);
                fetchAppointments(); // Fetch updated appointments after deleting location
                setLocations(updatedLocations);
            })
            .catch(error => {
                console.error('Error deleting on server:', error);
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

    const handleEditAppointment = (appointmentId, currentStatus, currentAdminComment) => {
        setEditAppointmentId(appointmentId);
        setEditedStatus(currentStatus);
        setEditedAdminComment(currentAdminComment);
    };

    const handleUpdateAppointment = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            setError('User not logged in');
            return;
        }

        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        const updatedAppointment = {
            status: editedStatus,
            adminComment: editedAdminComment
        };

        axios.put(`http://localhost:5000/appointments/${editAppointmentId}`, updatedAppointment)
            .then(res => {
                console.log('Appointment updated successfully:', res.data);
                setEditAppointmentId(null);
                fetchAppointments(); // Fetch updated appointments after editing
            })
            .catch(error => {
                console.error('Error updating appointment:', error);
            });
    };


    return (
        <div className="container mt-5">
            <h1 className="mb-4">Admin Dashboard</h1>

            <h2>Locations</h2>

            <div className="form-group mb-3">
                <input
                    className="form-control mb-2"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter property name"
                />
                <input
                    className="form-control mb-2"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Enter price"
                />
                <input
                    className="form-control mb-2"
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Enter city"
                />
                <button className="btn btn-primary me-2" onClick={handleSubmit}>{editMode ? 'Update' : 'Add'}</button>
                {editMode && <button className="btn btn-secondary" onClick={() => {
                    setEditMode(false);
                    setFormData({ name: '', price: '', city: '' });
                }}>Cancel</button>}
            </div>

            <div className="row row-cols-1 row-cols-md-2 g-4">
                {locations.map((location, index) => (
                    <div key={index} className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{location.name}</h5>
                                <p className="card-text">Price: {location.price}</p>
                                <p className="card-text">City: {location.city}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button className="btn btn-primary me-2" onClick={() => handleEdit(location._id, location)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(location._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* New section for managing appointments */}
            <div className='mt-5'>
                <h2>Appointments</h2>
                {appointments.map((appointment, index) => (
                    <div key={index} className="card mb-3">
                        <div className="card-body">
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

                            {/* Edit button for each appointment */}
                            <button
                                className="btn btn-warning me-2"
                                onClick={() => handleEditAppointment(appointment._id, appointment.status, appointment.adminComment)}
                            >
                                Approve/Reject
                            </button>

                            {/* Show editable form when the appointment is in edit mode */}
                            {editAppointmentId === appointment._id && (
                                <div className="mt-3">
                                    <form onSubmit={handleUpdateAppointment}>
                                        <div className="mb-3">
                                            <label htmlFor="editedStatus" className="form-label">Status:</label>
                                            <select
                                                className="form-select"
                                                id="editedStatus"
                                                value={editedStatus}
                                                onChange={(e) => setEditedStatus(e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="editedAdminComment" className="form-label">Admin Comment:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="editedAdminComment"
                                                value={editedAdminComment}
                                                onChange={(e) => setEditedAdminComment(e.target.value)}
                                                placeholder="Admin comment"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-success me-2">Update</button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setEditAppointmentId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {error && <p className="text-danger mt-3">{error}</p>}
        </div>
    );
};

export default AdminDashboard;

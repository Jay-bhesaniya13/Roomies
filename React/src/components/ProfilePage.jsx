import React, { useState } from 'react';

const ProfilePage = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newName, setNewName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [activeForm, setActiveForm] = useState('password'); // Default to the password form

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (activeForm === 'password' && (!oldPassword || !newPassword)) {
            setError('Please fill in all required fields for password change');
            setTimeout(() => setError(''), 2000);
            return;
        }
        if (activeForm === 'username' && (!oldPassword || !newName)) {
            setError('Please fill in all required fields for username change');
            setTimeout(() => setError(''), 2000);
            return;
        }

        const userId = localStorage.getItem('userId'); // Ensure this value is set correctly
        const requestBody = {
            userId,
            oldPassword,
            newPassword: activeForm === 'password' ? newPassword : null,
            newName: activeForm === 'username' ? newName : null,
        };

        try {
            const response = await fetch(`http://localhost:3000/API/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.msg);
                setError('');
                setTimeout(() => setMessage(''), 2000);
            } else {
                const errorData = await response.json();
                setError(errorData.msg || 'An error occurred');
                setTimeout(() => setError(''), 2000);
            }
        } catch (error) {
            console.error('Error during profile update:', error);
            setError('An error occurred. Please try again.');
            setTimeout(() => setError(''), 2000);
        }
    };

    return (
        <div className="settings-container" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Profile</h2>
            {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px' }}>
                <button
                    onClick={() => setActiveForm('password')}
                    style={{
                        backgroundColor: activeForm === 'password' ? 'black' : 'white',
                        color: activeForm === 'password' ? 'white' : 'black',
                        border: '2px solid black',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    Change Password
                </button>
                <button
                    onClick={() => setActiveForm('username')}
                    style={{
                        backgroundColor: activeForm === 'username' ? 'black' : 'white',
                        color: activeForm === 'username' ? 'white' : 'black',
                        border: '2px solid black',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    Change Username
                </button>
            </div>

            {activeForm === 'password' && (
                <form onSubmit={handleUpdate} style={{ marginTop: '20px' }}>
                    <div>
                        <label>Old Password:</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div>
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Update Password
                    </button>
                </form>
            )}

            {activeForm === 'username' && (
                <form onSubmit={handleUpdate} style={{ marginTop: '20px' }}>
                    <div>
                        <label>Old Password:</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div>
                        <label>New Username:</label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Update Username
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProfilePage;

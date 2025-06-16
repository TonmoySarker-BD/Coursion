import React, { use, useState } from 'react';
import { FaUser, FaImage } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/Auth/AuthContext';

const UpdateProfile = () => {
  const { user, updateUser } = use(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    await updateUser({ displayName: name, photoURL });
    setMessage('Profile updated successfully!');

    Swal.fire({
      icon: 'success',
      title: 'Your profile has been updated!',
      showConfirmButton: false,
      timer: 2000
    });

    setError('');
    setTimeout(() => navigate('/profile'), 2000); // match timer with Swal duration
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="py-20 bg-base-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-base-200 rounded-xl shadow-sm p-6">
        <div className="text-center mb-6">
          <div className="mx-auto w-24 h-24 rounded-full bg-base-100 flex items-center justify-center overflow-hidden mb-4">
            {photoURL ? (
              <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <FaUser className="text-base-800 text-3xl" />
            )}
          </div>
          <h1 className="text-2xl font-semibold text-base-800">Update Profile</h1>
          <p className="text-base-500">Make changes to your profile</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <div className="flex items-center p-2 bg-gray-400 rounded-lg">
              <FaUser className="text-black mr-2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Photo URL</label>
            <div className="flex items-center p-2 bg-gray-400 rounded-lg">
              <FaImage className="text-black mr-2" />
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
                placeholder="Enter photo URL"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Save Changes
          </button>

          <Link
            to="/profile"
            className="block w-full text-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

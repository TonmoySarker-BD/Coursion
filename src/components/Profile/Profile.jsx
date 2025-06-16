import React, { use, useEffect } from 'react';
import { FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/Auth/AuthContext';

const Profile = () => {
  const { user, logout } = use(AuthContext);
  console.log(user)
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  useEffect(() => {
            document.title = `${user?.displayName || 'User'}'s Profile - Coursion`;
        }, [user]);

  return (
    <div className="py-20 bg-base-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-base-200 rounded-xl shadow-sm p-6">

        <div className="text-center mb-6">
          <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mb-4">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-gray-400 text-3xl" />
            )}
          </div>
          <h1 className="text-2xl font-semibold text-base-800">
            {user?.displayName || 'User'}
          </h1>
          <p className="text-gray-500">Your Profile</p>
        </div>
        <div className="space-y-4 mb-8">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <FaEnvelope className="text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-gray-800">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <FaUser className="text-green-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Account Status</p>
              <p className="text-gray-800">
                {user?.emailVerified ? 'Verified' : 'Not Verified'}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to="/update-profile"
            className="block w-full text-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Edit Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center py-2 px-4 text-red-600 border border-red-100 rounded-lg hover:bg-red-50 transition"
          >
            <FaSignOutAlt className="mr-2" />
            Log Out
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Member since {user?.metadata?.creationTime}
        </p>
      </div>
    </div>
  );
};

export default Profile;
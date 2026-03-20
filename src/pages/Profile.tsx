import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { User, Settings, LogOut } from 'lucide-react';
import { useUser } from '../context/userContext';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { updateProfile, logout } = useAuthStore();

  const { user: userContext } = useUser();

  const { user, isAuthenticated} = localStorage.getItem('furniture-auth-storage') ? JSON.parse(localStorage.getItem('furniture-auth-storage') || '{}') : userContext;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    const success = await updateProfile(formData);
    setIsSubmitting(false);
    if (success) {
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
    } else {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Sync formData if user object changes from store (e.g., after successful login/update)
  // and not currently editing to avoid overwriting user input.
  React.useEffect(() => {
    if (user && !isEditing) {
      setFormData({ name: user.name, email: user.email, mobile: user.mobile || '' });
    }
  }, [user, isEditing]);

  
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      // return null;
    }
  }, []);
  return (
    <div className="py-16">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 text-center border-b border-gray-200">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary-100 text-primary mb-4">
                  <User className="h-10 w-10" />
                </div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>

              <div className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => { }}
                      className="w-full text-left px-4 py-2 rounded-md flex items-center text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="h-5 w-5 mr-3 text-gray-500" />
                      <span>My Account</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/orders')}
                      className="w-full text-left px-4 py-2 rounded-md flex items-center text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="h-5 w-5 mr-3 text-gray-500" />
                      <span>Order History</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 rounded-md flex items-center text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-primary hover:text-primary-600"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="p-6">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                    {error}
                  </div>
                )}
                {successMessage && !isEditing && (
                  <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md text-sm">
                    {successMessage}
                  </div>
                )}
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="input w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="input w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="input w-full"
                          placeholder="Enter your mobile number"
                        />
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                      <p>{user?.name}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
                      <p>{user?.email}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Mobile Number</h3>
                      <p>{user?.mobile || 'Not provided'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Account Security</h2>
              </div>

              <div className="p-6">
                <button className="btn btn-outline">
                  Change Password
                </button>

                <p className="mt-4 text-sm text-gray-600">
                  We recommend using a strong password that you don't use for other websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
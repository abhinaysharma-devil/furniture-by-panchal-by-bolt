import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useRegisterUser } from '../apis/apiHooks';
// import { enqueueSnackbar } from 'notistack';
// import { useUser } from '../context/userContext';


interface RegisterProps {
    formData: {
        name: string;
        email: string;
        mobile: string;
        password: string;
        confirmPassword: string;
    };
    handleSubmit: (e: React.FormEvent) => void;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    isLoading?: boolean;
    isAuthenticated?: boolean;
    setFormData: React.Dispatch<React.SetStateAction<typeof formData>>;
}

export const CreateAccountForm: React.FC<RegisterProps> = ({ handleSubmit, formData, setFormData, error, setError, isLoading, isAuthenticated }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    return (
        <div className="py-16">
            <div className="container-custom max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
                    </div>

                    <div className="p-6">
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input w-full"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input w-full"
                                        placeholder="Enter your email"
                                        required
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
                                        className="input w-full"
                                        placeholder="Enter your mobile number (optional)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password *
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="input w-full"
                                        placeholder="Create a password"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Password must be at least 6 characters long
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm Password *
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="input w-full"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                        required
                                    />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                        I agree to the{' '}
                                        <Link to="/t&c" className="text-primary hover:text-primary-600">
                                            Terms and Conditions
                                        </Link>
                                    </label>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="btn btn-primary w-full py-3 flex items-center justify-center"
                                    >
                                        {isLoading ? 'Creating Account...' : 'Register'}
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary hover:text-primary-600 font-medium">
                                    Log In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

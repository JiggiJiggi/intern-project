import React from 'react';

const ForgotPassword = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-blue-600">Forgot Password</h2>
                <form className="mt-8 space-y-6">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;

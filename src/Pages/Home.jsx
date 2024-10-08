import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to JobBoard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find your dream job or post a job opening.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  For Job Seekers
                </h2>
                <p className="text-gray-600 mb-4">
                  Browse through hundreds of job listings and find the perfect
                  opportunity for you.
                </p>
                <a
                  href="/jobs"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Browse Jobs
                </a>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  For Employers
                </h2>
                <p className="text-gray-600 mb-4">
                  Post your job openings and reach thousands of qualified
                  candidates.
                </p>
                <a
                  href="/post-job"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  Post a Job
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

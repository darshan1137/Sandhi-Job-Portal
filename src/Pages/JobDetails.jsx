import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, doc } from "../Firebase/config";
import Navbar from "./Navbar";
import { getDoc } from "firebase/firestore";

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobRef = doc(db, "jobs", id);
        const jobSnap = await getDoc(jobRef);

        if (jobSnap.exists()) {
          setJob({ id: jobSnap.id, ...jobSnap.data() });
        } else {
          console.log("No such job!");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {job.company}
              </h2>
              <p className="text-gray-600 mb-4">{job.location}</p>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Job Description
              </h3>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Requirements
              </h3>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                {job.requirements && Array.isArray(job.requirements) ? (
                  job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))
                ) : (
                  <li>No requirements specified</li>
                )}
              </ul>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;

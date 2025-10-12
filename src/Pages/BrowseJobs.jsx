import React, { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/config.js";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsCollection = collection(db, "jobs");
      const jobSnapshot = await getDocs(jobsCollection);
      const jobList = jobSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobList);
    };

    fetchJobs();
  }, []);

  // Derived filtered jobs based on the search query
  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;

    return jobs.filter((job) => {
      const title = (job.title || "").toString().toLowerCase();
      const company = (job.company || "").toString().toLowerCase();
      const location = (job.location || "").toString().toLowerCase();
      const description = (job.description || "").toString().toLowerCase();
      const skills = Array.isArray(job.skills)
        ? job.skills.join(" ").toLowerCase()
        : "";
      const tags = Array.isArray(job.tags)
        ? job.tags.join(" ").toLowerCase()
        : "";

      return (
        title.includes(q) ||
        company.includes(q) ||
        location.includes(q) ||
        description.includes(q) ||
        skills.includes(q) ||
        tags.includes(q)
      );
    });
  }, [jobs, query]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Jobs</h1>
          {/* Search Bar */}
          <div className="mb-6">
            <label htmlFor="job-search" className="sr-only">
              Search jobs
            </label>
            <div className="relative">
              {/* Search icon */}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="job-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, company, location or keyword…"
                className="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 right-0 mr-2 flex items-center rounded px-2 text-sm text-gray-500 hover:text-gray-700"
                  aria-label="Clear search"
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.length === 0 && (
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6 text-gray-600">
                  No jobs found. Try a different search.
                </div>
              </div>
            )}
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {job.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{job.company}</p>
                  <p className="text-gray-600 mb-4">{job.location}</p>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <a
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowseJobs;

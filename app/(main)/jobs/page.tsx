import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";
import Filters from "./filters";
import Pagination from "./pagination";

export default async function Page(props: {
  searchParams?: Promise<{
    sort_by?: string;
    location?: string;
    remote?: string;
    search?: string;
    role?: string;
    company?: string;
    page?: string;
    keywords?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const sort_by = searchParams?.sort_by || "relevance";
  const location = searchParams?.location || "";
  const remote = searchParams?.remote || "false";
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  const response = await fetch(
    `https://findwork.dev/api/jobs/?sort_by=${sort_by}${location ? `&location=${location}` : ""}${search ? `&search=${search}` : ""}${remote ? `&remote=${remote}` : ""}&page=${currentPage}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.NEXT_PUBLIC_JOBS_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch jobs");
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">All jobs</h1>
        <p className="text-gray-600">
          Failed to load jobs. Please try again later.
        </p>
      </div>
    );
  }
  const jobs = await response.json();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-center">
        Explore Job Opportunities
      </h1>
      <p className="text-lg">Search Results</p>
      <p className="text-sm text-gray-400 mb-3">{jobs.count} results</p>
      {/* search bar */}
      <Filters />
      {/* main content */}
      {jobs.results.length > 0 ? (
        <ul className="space-y-6">
          {jobs.results.map((job: any) => (
            <li
              key={job.id}
              className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold">{job.role}</h2>
              <div className="flex items-center gap-x-4 mt-2">
                <Avatar>
                  <AvatarImage
                    src={job.logo ?? "https://github.com/shadcn.png"}
                    alt={job.company_name}
                  />
                  <AvatarFallback className="border-2 bg-gray-200 text-gray-800 font-bold">
                    {job.company_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-gray-600 font-medium">{job.company_name}</p>
              </div>
              <p
                className="text-gray-700 mt-4"
                dangerouslySetInnerHTML={{ __html: job.text.slice(0, 150) }}
              ></p>{" "}
              <Link
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue underline ml-1"
              >
                Read more
              </Link>
              {job.location && (
                <p className="text-sm text-gray-500 mt-3">
                  <strong>Location:</strong> {job.location}
                </p>
              )}
              <p className="mt-3">
                <strong>Posted on:</strong>{" "}
                {new Date(job.date_posted).toLocaleDateString()}
              </p>
              {job.keywords.length > 0 && (
                <div className="mt-3">
                  <strong>Skills:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.keywords.map((keyword: string) => (
                      <span
                        key={keyword}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        "No jobs found"
      )}
      {/* Pagination */}
      <Pagination totalPagesCount={Math.ceil(jobs.count / 100)} />
    </div>
  );
}

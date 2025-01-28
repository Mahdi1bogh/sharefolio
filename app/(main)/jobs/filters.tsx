"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Map, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters from URL parameters
  const [relevance, setRelevance] = useState(
    searchParams.get("sort_by") || "relevance"
  );
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [remote, setRemote] = useState(searchParams.get("remote") === "true");

  // Helper to update URL parameters
  const updateSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (relevance) params.set("sort_by", relevance);
    else params.delete("sort_by");

    if (search) params.set("search", search);
    else params.delete("search");

    if (location) params.set("location", location);
    else params.delete("location");

    if (remote) params.set("remote", "true");
    else params.delete("remote");

    params.delete("page");

    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      {/* Filters */}

      <div className="mb-6 w-full flex flex-col gap-y-3 gap-4 ">
        <div className="relative w-full">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8"
            placeholder="Search for a job title"
            value={search}
          />
          <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-0 flex items-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Search className="h-4 w-4" />
          </div>
        </div>
        <div className="relative w-full">
          <Input
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-8"
            placeholder="Search by location"
            value={location}
          />
          <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-0 flex items-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Map className="h-4 w-4" />
          </div>
        </div>
        <Button onClick={updateSearchParams}>Search</Button>
      </div>
    </div>
  );
};

export default Filters;

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Pagination = ({ totalPagesCount }: { totalPagesCount: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(
    Number(searchParams.get("page")) || Number("1")
  );
  const updateSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (page) params.set("page", page + "");
    else params.delete("page");

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    updateSearchParams();
  }, [page]);

  return (
    <div className="mt-8 flex justify-center items-center gap-4">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 dark:bg-gray-200/10 dark:hover:bg-gray-200/20 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPagesCount}
      </span>
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1))}
        disabled={page === totalPagesCount}
        className={
          "px-4 py-2 disabled:cursor-not-allowed dark:bg-gray-200/10 dark:hover:bg-gray-200/20 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        }
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

import React, { useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/tableUser"
import { useMemo, useState } from "react"
export default function Submissions() {
  const [tests, setTests] = useState([]);
  const[isLoading,setIsLoading]=useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [testId,setTestId] = useState("");

const filteredTests = useMemo(() => {
  return tests.filter((test) =>
    test.testId.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [tests, searchTerm]);

const sortedTests = useMemo(() => {
  return [...filteredTests].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
}, [filteredTests, sortColumn, sortDirection]);

const handleSort = (column) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  } else {
    setSortColumn(column);
    setSortDirection("asc");
  }
};
const fetchSubmissions = async () => {
  try {
    const response = await axios.get("http://localhost:9000/submissions");
    console.log(response.data);
    setTests(response.data);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
fetchSubmissions();
}, []);

  return (
    <div>
  
  {isLoading ? (<div className="mx-auto my-16 w-full max-w-6xl rounded border">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b p-4 md:py-2">
      <Skeleton className="h-6 w-40" /> 
      <Skeleton className="h-10 w-96" /> 
    </div>

    <div className="w-full">
      {/* Table Header Skeleton */}
      <div className="grid grid-cols-7 gap-2 border-b p-4">
        {Array(7).fill("").map((_, index) => (
          <Skeleton key={index} className="h-6 w-24" />
        ))}
      </div>
      <div className="space-y-4 p-4">
        {Array(5).fill("").map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-7 gap-2">
            {Array(7).fill("").map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-6 w-24" />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>) :
  <div className="mx-auto my-16 w-full max-w-6xl rounded border">
  <div className="flex flex-wrap items-center justify-between gap-4 border-b p-4 md:py-2">
    <h1 className="text-xl font-bold">Submissions</h1>
    <Input
      placeholder="Search tests..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="md:w-96"
    />
  </div>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead
          className="cursor-pointer"
          onClick={() => handleSort("testName")}
        >
          Test Name
          {sortColumn === "testName" && (
            <span className="ml-1">
              {sortDirection === "asc" ? "\u2191" : "\u2193"}
            </span>
          )}
        </TableHead>
        <TableHead
          className="cursor-pointer"
          onClick={() => handleSort("testName")}
        >
          Username
          {sortColumn === "description" && (
            <span className="ml-1">
              {sortDirection === "asc" ? "\u2191" : "\u2193"}
            </span>
          )}
        </TableHead>
        <TableHead
          className="cursor-pointer"
        >
          User Email
        </TableHead>
        <TableHead
          className="cursor-pointer"
        >
          Score
        </TableHead>
        <TableHead
          className="cursor-pointer"
        >
          Max Score
        </TableHead>
        <TableHead
          className="cursor-pointer"
          onClick={() => handleSort("createdAt")}
        >
          Attempted on
          {sortColumn === "createdAt" && (
            <span className="ml-1">
              {sortDirection === "asc" ? "\u2191" : "\u2193"}
            </span>
          )}
        </TableHead>
        <TableHead
          className="cursor-pointer"
        >
          Attempted at
        </TableHead>
        <TableHead
          className="cursor-pointer"
        >
         Result Status
        </TableHead>

      </TableRow>
    </TableHeader>
    <TableBody>
      {sortedTests.map((test) => (
          <TableRow key={test._id}>
                     <TableCell className="font-medium">{test.testId.testName}</TableCell>
           <TableCell className="font-medium">{test.userId.name}</TableCell>
           <TableCell className="font-medium">{test.userId.email}</TableCell>
          <TableCell className="font-medium">{test.score}</TableCell>
          <TableCell>{test.testId.questions.length}</TableCell>
          <TableCell>
            {new Date(test.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
          </TableCell>
          <TableCell>
            {new Date(test.createdAt).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true, // For AM/PM format
            })}
          </TableCell>
          <TableCell className="font-medium">
            <span
              className={`rounded-2xl px-2 py-1
                ${test.status 
                  ? "bg-green-100 text-green-700" 
                  : "bg-blue-100 text-blue-700"}`}
            >
              {test.status ? "Declared" : "Pending"}
            </span>
          </TableCell>
       
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>}
</div>
  )
}
 
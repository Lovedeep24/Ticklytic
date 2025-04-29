import React, { useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios";
import AlertDialogBox from '@/components/alertDialog/AlertDialog';
import AddQuestionsComp from './AddQuestionsComp';
import { Trash2 , SquarePen} from "lucide-react"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/tableUser"
import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';
import { useMemo, useState } from "react"
export default function AdminTestPage() {
  const [tests, setTests] = useState([]);
  const [opneAddQuestion, setOpenAddQuestion] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const[isLoading,setIsLoading]=useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [testId,setTestId] = useState("");
  
const filteredTests = useMemo(() => {
  return tests.filter((test) =>
    test.testName.toLowerCase().includes(searchTerm.toLowerCase())
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
const fetchTests = async () => {
  const token=localStorage.getItem('accessToken');
  try {
    const response = await axios.get("http://localhost:9000/tests",{
      headers: {
        Authorization: `Bearer ${token}`,
    }
    });
    console.log(response.data.data);
    setTests(response.data.data);
    setIsLoading(false);
  } catch (error) {
            if (error.status === 401) {
              console.log(error);
              toast.error("You are not authorized. Please login again!");
            } else if (error.status === 405) {
              toast.error("You don't have permission to access this route.");
            } else if (error.status === 403) {
              console.log(error);
              toast.error("Please Login Again");
            }else {
              toast.error("Something went wrong!");
            }
          }
};

  useEffect(() => {
  fetchTests();
  }, []);

  const handleLogout=()=>{
    localStorage.removeItem("accessToken");
    toast.success("Logged out successfully!");
    window.location.href = "/";
  }
return (
  <div>
       <div className='flex w-full justify-between items-center p-4'>
                   <h1 className='text-[#333] font-bold text-3xl'>Admin Portal</h1>
                   <h1 className="text-xl font-bold">Test Cluster</h1>
                   <DropdownMenu>
                   <DropdownMenuTrigger className='size-13' asChild>
                     <Button variant="outline" aria-label="Open account menu">
                       <CircleUserRound  size={20} strokeWidth={2} aria-hidden="true" />
                     </Button>
                   </DropdownMenuTrigger>
                   <DropdownMenuContent className="max-w-64 mr-10 ">
                     <DropdownMenuLabel className="flex flex-col">
                       <span className="text-xs font-normal text-foreground">Welcome, Admin</span>
                     </DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuGroup className='text-md'>
                     <Link to="/"><DropdownMenuItem>Home</DropdownMenuItem></Link>
                     <Link to="/admin"><DropdownMenuItem>Admin Home</DropdownMenuItem></Link>
                     <Link to="/createTest"><DropdownMenuItem>Create Test</DropdownMenuItem></Link>
                     <Link to="/users"><DropdownMenuItem>Users</DropdownMenuItem></Link>
                     <Link to="/submissions"><DropdownMenuItem>Submissions</DropdownMenuItem></Link>
                     <Link to="/addQuestions"><DropdownMenuItem>Add Questions</DropdownMenuItem></Link>
                     </DropdownMenuGroup>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem className="bg-red-500 text-white " onClick={handleLogout}>Logout</DropdownMenuItem>
                   </DropdownMenuContent>
                 </DropdownMenu>
                   </div>
  {isLoading ? (<div className="mx-auto my-16 w-full max-w-7xl rounded border">
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

      {/* Table Rows Skeleton */}
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
  <div className="mx-auto my-16 w-[90%] max-w-8xl rounded border">
  <div className="flex flex-wrap items-center justify-between gap-4 border-b p-4 md:py-2">
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
          className="cursor-pointer flex items-center justify-center"
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
          className="cursor-pointer "
          onClick={() => handleSort("testName")}
        >
          Description
          {sortColumn === "description" && (
            <span className="ml-1">
              {sortDirection === "asc" ? "\u2191" : "\u2193"}
            </span>
          )}
        </TableHead>
        <TableHead
          className="cursor-pointer"
        >
          No. of Question
        </TableHead>
        <TableHead
          className="cursor-pointer"
        >
          Duration
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
          Published on
          {sortColumn === "createdAt" && (
            <span className="ml-1">
              {sortDirection === "asc" ? "\u2191" : "\u2193"}
            </span>
          )}
        </TableHead>
        <TableHead   className="cursor-pointer">
          Action 
          </TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {sortedTests.map((test) => (
          <TableRow key={test._id}>
          <TableCell className="font-medium">{test.testName}</TableCell>
          <TableCell className="font-medium">{test.description}</TableCell>
          {/* <TableCell>{bookmark.description}</TableCell> */}
          <TableCell>{test.questions.length}</TableCell>
          <TableCell>{test.duration}</TableCell>
          <TableCell>{test.questions.length}</TableCell>
          <TableCell>
            {new Date(test.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
          </TableCell>

          <TableCell className=" cursor-pointer flex gap-2">  
              <Button variant="ghost" size="icon" className="cursor-pointer" 
              onClick={() =>{ setTestId(test._id); setIsAlertOpen(true)} }>
                <Trash2 className="size-4 " />
              </Button>

              <Button variant="ghost" size="icon" className="cursor-pointer"  title="Add Question" 
              onClick={() =>{  setTestId(test._id); setOpenAddQuestion(true)}}>
                <SquarePen className="size-4" />
              </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
       <Toaster richColors position="top-center" />
  </Table>
  {isAlertOpen && <AlertDialogBox  open={isAlertOpen} setOpen={setIsAlertOpen} testId={testId} fetchTests={fetchTests}/>}
  {opneAddQuestion && <AddQuestionsComp open={opneAddQuestion} setOpen={setOpenAddQuestion} testId={testId} fetchTests={fetchTests}/>}
</div>}
</div>
 )
}

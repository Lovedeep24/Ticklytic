import React, { useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/tableUser"
import { useMemo, useState } from "react"
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

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading,setIsLoading]=useState(false);
  const [users, setUsers] = useState([]);

  
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);
  
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortColumn, sortDirection]);
  
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
    const fetchUsers = async() => {
        const token=localStorage.getItem('accessToken');
        setIsLoading(true);
        try {
            const response=await axios.get('http://localhost:9000/fetchUsers',{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
                });
                if(response.status === 200) {
                    setIsLoading(false);
                    console.log(response.data);
                    // const data = await response.json();
                    setUsers(response.data);
                }
        }catch (error) {
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
        fetchUsers();
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
              <h1 className="text-xl font-bold">Users Data</h1>
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
                    onClick={() => handleSort("name")}
                  >
                    User Name
                    {sortColumn === "name" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "\u2191" : "\u2193"}
                      </span>
                    )}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("email")}
                  >
                    Email
                    {sortColumn === "email" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "\u2191" : "\u2193"}
                      </span>
                    )}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    Signedup on
                    {sortColumn === "createdAt" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "\u2191" : "\u2193"}
                      </span>
                    )}
                  </TableHead>
            
                  <TableHead
                    className="cursor-pointer"
                  >
                   Tests Attempted
                  </TableHead>
          
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedUsers.map((user) => (
                    <TableRow key={user._id}>
                     <TableCell className="font-medium text-left">{user.name}</TableCell>
                     <TableCell className="font-medium text-left">{user.email}</TableCell>
                    {/* <TableCell>{test.testId.questions.length}</TableCell> */}
                    <TableCell className="font-medium text-left">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                    </TableCell>
                    <TableCell className="font-medium text-left">{user.testHistory.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>}
             <Toaster richColors position="top-center" />
        </div>
      )
    }


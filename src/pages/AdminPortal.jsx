import React from 'react'
import {
  PlusCircle,
  ListChecks,
  ClipboardList,
  Users,
  FilePlus,
  Home
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
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

const features = [
  {
    Icon: PlusCircle,
    name: "Create Test",
    description: "Design and launch a new test by adding basic information and test parameters.",
    href: "/createTest",
    cta: "Start Creating",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: ListChecks,
    name: "View All Tests",
    description: "Browse and manage all the tests created so far in one place.",
    href: "/testCluster",
    cta: "Browse Tests",

    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: ClipboardList,
    name: "Submissions",
    description: "View test submissions from users, including scores and completion data.",
    href: "/submissions",
    cta: "View Submissions",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Users,
    name: "Users",
    description: "Manage platform users, assign roles, and monitor activity.",
    href: "/Users",
    cta: "Manage Users",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {    
    Icon: Home,
    name: "Home",
    description: "Go back to the Web site Home page",
    href: "/",
    cta: "Logout",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];


export default function AdminPortal() {
  
  return (
    <div className="h-full p-5 flex flex-col gap-5 font-sans bg-gray-100">
      <div className='flex w-full justify-between items-center p-4'>
      <h1 className='text-[#333] font-bold text-3xl'>Admin Portal</h1>
      <DropdownMenu>
      <DropdownMenuTrigger className='size-13' asChild>
        <Button variant="outline" aria-label="Open account menu">
          <CircleUserRound  size={20} strokeWidth={2} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 text-lg mr-10">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-lg font-normal text-foreground">Welcome, Admin</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="bg-red-400">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      </div>
    <div className='w-full object-contain  h-screen'>
    <BentoGrid className="h-[80%] lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
    </div>
    
    </div>
  )
}

import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Trash2 } from "lucide-react";
import axios from 'axios';
import { toast } from 'sonner';
export default function AlertDialogBox({ open, setOpen ,testId, fetchTests}) {

  const handleDeleteTest = async()=>{
    console.log(testId)
    const token=localStorage.getItem('accessToken');
    try {

      const res=await axios.delete('http://localhost:9000/deleteTest',{
        headers: {
          Authorization: `Bearer ${token}`,
      },
        data: {testId}  
      })
      if(res.status === 200)
      {
        toast.success("Test Deleted Successfully");
        fetchTests();
    } 
  }catch (error) {
      if (error.status === 401) {
        console.log(error);
        toast.error("You are not authorized. Please login again!");
      } else if (error.status === 405) {
        console.log(error);
        toast.error("You don't have permission to access this route.");
      } else {
        toast.error("Something went wrong!");
      }
    }
  }
return (
    <AlertDialog open={open} onOpenChange={(open) => setOpen(open)}>
      <AlertDialogContent>
        <AlertDialogHeader className="mb-4 items-center gap-2 md:flex-row md:items-start md:gap-4">
          <div
            aria-hidden="true"
            className="shrink-0 rounded-full bg-red-50 p-3 dark:bg-red-900"
          >
            <Trash2 className="size-5 text-red-600 dark:text-red-200" />
          </div>
          <div className="flex flex-col gap-2">
            <AlertDialogTitle>Delete Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Deleting your Test is irreversible and will erase all your
              data. This action cannot be undone.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteTest}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

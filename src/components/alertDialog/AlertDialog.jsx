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
  import { Button, buttonVariants } from "@/components/ui/button";
  import { Trash2 } from "lucide-react";
import axios from 'axios';
import { toast } from 'sonner';
export default function AlertDialogBox({ open, setOpen ,testId, fetchTests}) {

  const handleDeleteTest = async()=>{
    console.log(testId)
    try {

      const res=await axios.delete('http://localhost:9000/deleteTest',{
        data: {testId}  
      })
      if(res.status === 200)
      {
        toast.success("Test Deleted Successfully");
        fetchTests();
    } 
  }catch (error) {
      console.log(error);
      toast.error("Couldn't Delete Test! try again")
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

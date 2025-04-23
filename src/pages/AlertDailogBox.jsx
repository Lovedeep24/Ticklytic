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
  } from "@/components/ui/alert-dialog"

  import { useNavigate } from 'react-router-dom'

export default function AlertDailogBox({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  return (
   <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Test Submitted Successfully</AlertDialogTitle>
          <AlertDialogDescription>
          Your test results will be sent to your email address shortly. 
          Please check your inbox (and spam folder) for the results
          </AlertDialogDescription>
        </AlertDialogHeader>
        <>
        <AlertDialogAction onClick={() => navigate("/")}>
          Home Page
        </AlertDialogAction>
        </>
        
      </AlertDialogContent>
    </AlertDialog>
  )
}

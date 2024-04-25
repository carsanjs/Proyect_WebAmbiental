
import Link from 'next/link';
import { MdOutlineCreateNewFolder, MdDeleteForever  } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {DeleteUserId} from '@/services/axios';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <MdOutlineCreateNewFolder 
      width={50}
      height={50}
      className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href="/dashboard/invoices"
      className="crudbtn rounded-md border p-2 hover:bg-gray-100"
    >
      <CiEdit 
      width={80}
      height={80} />
    </Link>
  );
}

interface IdUser{
  id:string
  onDeleteSuccess:() => void
}





export function DeleteInvoice({id, onDeleteSuccess }:IdUser) {
  const handleDelete = async()=>{
  try {
    await DeleteUserId({user_id:id});
    onDeleteSuccess();
    toast.success("Usuario eliminado",{
      autoClose:1000,
      position:'bottom-right'
    });
  } catch (error) {
    console.error("Error deleting user:", error);
  }
  }
 
  return (
    <>
      <button 
      onClick={handleDelete}
      className="crudbtn rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <MdDeleteForever 
        width={80}
        height={80} />
      </button>
    </>
  );
}

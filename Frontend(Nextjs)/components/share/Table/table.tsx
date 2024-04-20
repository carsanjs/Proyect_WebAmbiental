"use client";
import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "./buttons";
import InvoiceStatus from "./status";
// import GetStudents from "@/app/validation/Interface/Studen"
import { fetchStudents } from "@/services/axios";
import { useEffect, useState } from "react";
import { formatDateToLocal } from "@/components/functions/getFecha";

// {query,currentPage,}: {query: string;currentPage: number;}
interface GetUsers {
  user_id: string;
  user_name: string;
  nombre: string;
  is_active: boolean;
  created_at: string;
  correo: string;
  carrera: string;
}


export default async function InvoicesTable() {
  const [isloading, setIsloading] = useState<boolean>(false);

  const [invoices, setInvoices] = useState<GetUsers[]>([]);
  
  const fectInvoices = async () => {
    let response = await fetchStudents();
    setInvoices(response);
    console.log(response);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsloading(false);
    }, 500);
    fectInvoices();
    return () => clearTimeout(timeout);
  }, []);

  const handleDeleteSuccess = () => {
    fectInvoices(); // Llama a esta función para recargar la tabla después de eliminar un usuario
  };

  return (
    <>
      {isloading ? (
        <div>cargando tabla...</div>
      ) : (
        <div className='className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4"'>
          <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
              <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                <div className="md:hidden">
                  {invoices?.map((invoice) => (
                    <div
                      key={invoice.user_id}
                      className="mb-2 w-full rounded-md bg-white p-4"
                    >
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <div className="mb-2 flex items-center">
                            <p>{invoice.nombre}</p>
                          </div>
                          <p className="text-sm text-gray-500">
                            {invoice.correo}
                          </p>
                        </div>
                        <InvoiceStatus status={invoice.is_active} />
                      </div>
                      <div className="flex w-full items-center justify-between pt-4">
                        <div></div>
                        <div className="flex justify-end gap-2">
                          <UpdateInvoice id={invoice.user_id} />
                          <DeleteInvoice id={invoice.user_id} onDeleteSuccess={handleDeleteSuccess}/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <table className="hidden min-w-full text-gray-900 md:table">
                  <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                      <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Usuario
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Nombre
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Correo
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Fecha/Creacion
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Carrera
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Estado
                      </th>
                      <th scope="col" className="relative py-3 pl-6 pr-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {invoices?.map((invoice) => (
                      <tr
                        key={invoice.user_id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                      >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex items-center gap-3">
                            <p>{invoice.user_name}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {invoice.nombre}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {invoice.correo}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {formatDateToLocal(invoice.created_at)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {invoice.carrera}
                        </td>

                        <td className="whitespace-nowrap px-3 py-3">
                          <InvoiceStatus status={invoice.is_active} />
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex justify-between gap-3">
                            <UpdateInvoice id={invoice.user_id} />
                            <DeleteInvoice id={invoice.user_id} onDeleteSuccess={handleDeleteSuccess}/>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

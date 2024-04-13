
import Link from "next/link";
import ReloadSkeleto from "../../sckeletos/Vambientapp";
import { useState, useEffect } from "react";


export const VambientalAppTitle =()=>{
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        return () => {
          clearTimeout(timeout);
        };
      }, []);

    return(
        <>
        {isLoading ? (<ReloadSkeleto />) : 
        (
          <div className="flex-1">
            <Link href="/">
              <h1 className="font-black text-3xl text-secondary"> Vambiental <span className="text-primary">App</span></h1>
            </Link>
          </div>
        )}
        </>
    )
}
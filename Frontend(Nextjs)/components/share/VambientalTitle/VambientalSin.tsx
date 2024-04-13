import { useState, useEffect } from "react";
import VambientalLogo from "../../../components/sckeletos/Vambientapp";


export const VambientalAppSignin =()=>{
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
          setIsLoading(false);
        }, 500);
        return () => {
          clearTimeout(timeout);
        };
      }, []);

    return(
        <>
        {isLoading ? (<VambientalLogo />) : 
        (
          <div className="flex-1">
           <a href="#"><h1 className="font-black text-2xl text-primary">Vambiental</h1></a>
          </div>
        )}
        </>
    )
}

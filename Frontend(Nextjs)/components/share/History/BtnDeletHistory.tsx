
import {DeleteHistoryId, DeleteAllHistory} from '@/services/axios';
import { toast } from "react-toastify";

interface HistoryId{
    id:string
    onDeleteSuccess:() => void
  }
function BtnDeletHistory({id, onDeleteSuccess }:HistoryId){

    const handleDelete = async()=>{
        try {
          await DeleteHistoryId({id_history:id});
          onDeleteSuccess();
          toast.success("Elemento eliminado",{
            autoClose:1000,
            position:'bottom-right'
          });
        } catch (error) {
          console.error("Error deleting user:", error);
        }
        }


return(
    <button className="c012020 c011997"  onClick={handleDelete} title="Eliminar">
                  <span className="c012012">
                    <div aria-hidden="true">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        className="c011998"
                        aria-hidden="true"
                      >
                        <path
                          d="M4.09 4.22l.06-.07a.5.5 0 01.63-.06l.07.06L10 9.29l5.15-5.14a.5.5 0 01.63-.06l.07.06c.18.17.2.44.06.63l-.06.07L10.71 10l5.14 5.15c.18.17.2.44.06.63l-.06.07a.5.5 0 01-.63.06l-.07-.06L10 10.71l-5.15 5.14a.5.5 0 01-.63.06l-.07-.06a.5.5 0 01-.06-.63l.06-.07L9.29 10 4.15 4.85a.5.5 0 01-.06-.63l.06-.07-.06.07z"
                          fill-rule="nonzero"
                        ></path>
                      </svg>
                    </div>
                  </span>
                </button>
)
}

export default BtnDeletHistory; 



interface HistoryIdAll{
  onDeleteSuccess:() => void
}
export function BtnDeletAllHistory ({onDeleteSuccess}:HistoryIdAll) {

  const handleDelete = async()=>{
      try {
        await DeleteAllHistory();
        onDeleteSuccess();
        toast.success("Elemento eliminado",{
          autoClose:1000,
          position:'bottom-right'
        });
      } catch (error) {
        console.error("Error deleting user:", error);
      }
      }


return(
  <button
  id="clear-browsing-data"
  title="Borrar datos de exploración"
  className="c01183 c01184"
  onClick={handleDelete}
>
  <span className="c01175 c01185">
    <span aria-hidden="true">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="c01173"
      >
        <path
          d="M11.5 4a1.5 1.5 0 00-3 0h-1a2.5 2.5 0 015 0H17a.5.5 0 110 1h-.55l-1.3 11.23A2 2 0 0113.16 18H6.84a2 2 0 01-1.99-1.77L3.55 5H3a.5.5 0 01-.5-.41V4.5c0-.28.22-.5.5-.5zm3.94 1H4.56l1.28 11.11a1 1 0 001 .89h6.32a1 1 0 001-.89L15.44 5zM8.5 7.5c.25 0 .45.15.5.36v6.2c0 .24-.22.44-.5.44-.25 0-.45-.15-.5-.36v-6.2c0-.24.22-.44.5-.44zm3 0c.25 0 .45.15.5.36v6.2c0 .24-.22.44-.5.44-.25 0-.45-.15-.5-.36v-6.2c0-.24.22-.44.5-.44z"
          fill-rule="nonzero"
        ></path>
      </svg>
    </span>
    <span className="c01174">
      Borrar datos de exploración
    </span>
  </span>
</button>
)
}

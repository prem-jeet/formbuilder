import { useRouter } from "next/navigation";
import { Enum } from "./new/formAction";
import { bulkDeleteEnums } from "./utils";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

type Props = {
  rows: Enum[];
};

const DeleteSelectedRowsPopup = ({ rows }: Props) => {
  const router = useRouter();
  const deleteSelectedRows = async () => {
    const ids = rows.map((row) => row.id);
    const rsp = await bulkDeleteEnums(ids);
    router.refresh();
    setTimeout(() => {
      if (rsp.success) {
        toast.success("Selected records deleted successfully", {
          position: "bottom-center",
        });
      } else {
        toast.error(rsp.msg);
      }
    }, 100);
  };
  return (
    <div className="fixed items-center w-1/4 px-5 py-3 duration-300 scale-110 bg-white rounded-full shadow-lg translate-x-2/4 bottom-16 right-2/4 animate-in slide-in-from-bottom-5 slide-in-from-right-1/2 fade-in-10">
      <div className="flex items-center justify-between">
        <span>
          Selected <b>{rows.length}</b> records
        </span>
        <button
          className="btn btn-outline btn-error btn-sm"
          onClick={deleteSelectedRows}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteSelectedRowsPopup;

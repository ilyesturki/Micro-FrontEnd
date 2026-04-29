import TagDetails from "@/components/Dashboard/Dashboard/components/Tag/TagDetails";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TagType } from "@/redux/tag/tagSlice";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const TagDetailsDialog = ({
  tag,
  isSelected,
}: {
  tag: TagType;
  isSelected: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(isSelected);

  const { data: session } = useSession({ required: true });

  useEffect(() => {
    if (isSelected) {
      setIsOpen(true);
    }
  }, [isSelected]);

  const closeDialog = () => {
    setIsOpen(!isOpen);
  };

  // if (
  //   ["qualité", "productions", "maintenance"].includes(
  //     session?.user?.userService || ""
  //   )
  // ) {
  //   return (
  //     <Link
  //       href={`tag-panel/tag?tagId=${tag.tagId}`}
  //       className="flex justify-center items-center w-full py-2.5 bg-greenAccent-900 bg-opacity-80 text-base font-semibold text-grayscale-100 rounded-sm"
  //     >
  //       Show Tag
  //     </Link>
  //   );
  // }
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="w-full py-2.5 bg-greenAccent-900 bg-opacity-80 text-base font-semibold text-grayscale-100 rounded-sm"
      >
        {/* <button className=""> */}
        View Details
        {/* </button> */}
      </DialogTrigger>
      <DialogContent className="max-w-[700px] max-h-screen pt-8 overflow-y-auto dialogScroll">
        <TagDetails tag={tag} dialogMode={true} />
      </DialogContent>
    </Dialog>
  );
};

export default TagDetailsDialog;

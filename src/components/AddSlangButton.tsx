import { Plus } from "lucide-react";
import { Button } from "./ui/button";

const AddSlangButton = () => {
  return (
    <Button className="fixed bottom-8 right-8 rounded-full h-14 w-14 shadow-lg">
      <Plus className="h-6 w-6" />
    </Button>
  );
};

export default AddSlangButton;
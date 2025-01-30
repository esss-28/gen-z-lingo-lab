import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const AddSlangForm = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    word: "",
    definition: "",
    example: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Success!",
      description: "Word sent for authentication",
    });
    setOpen(false);
    setFormData({ word: "", definition: "", example: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Add New Term</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Slang Term</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="word" className="text-sm font-medium">
              Word
            </label>
            <Input
              id="word"
              value={formData.word}
              onChange={(e) =>
                setFormData({ ...formData, word: e.target.value })
              }
              placeholder="Enter the slang word"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="definition" className="text-sm font-medium">
              Definition
            </label>
            <Textarea
              id="definition"
              value={formData.definition}
              onChange={(e) =>
                setFormData({ ...formData, definition: e.target.value })
              }
              placeholder="What does it mean?"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="example" className="text-sm font-medium">
              Example
            </label>
            <Textarea
              id="example"
              value={formData.example}
              onChange={(e) =>
                setFormData({ ...formData, example: e.target.value })
              }
              placeholder="Use it in a sentence"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSlangForm;
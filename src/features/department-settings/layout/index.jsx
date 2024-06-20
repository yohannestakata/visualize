import Heading from "../../../components/Heading";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { CreateDepartmentSchema } from "../../../schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

function DepartmentSettingsLayout() {
  const departments = [
    {
      name: "Computer Science",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut asperiores ducimus sequi reprehenderit nihil debitis, officia ex consequatur.",
    },
    {
      name: "Architecture",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut asperiores ducimus sequi reprehenderit nihil debitis, officia ex consequatur et ad suscipit animi deserunt repellat ipsam sit nulla dolorem eum totam.",
    },
    {
      name: "Nursing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut asperiores ducimus sequi reprehenderit nihil debitis, officia ex consequatur et ad suscipit animi deserunt repellat ipsam sit nulla dolorem eum totam.",
    },
    {
      name: "Marketing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut asperiores ducimus sequi reprehenderit nihil debitis.",
    },
  ];

  const form = useForm({
    resolver: zodResolver(CreateDepartmentSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      uniId: "",
      department: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading as="h1">Department Settings</Heading>
        <Dialog>
          <DialogTrigger>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>
                This creates a new department in visualize. Make sure department
                doesn&apos;t already exist before creating one.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid w-full items-center gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter department name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter description here"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit" disabled={false}>
                    <MagicWandIcon className="mr-2 h-4 w-4" /> Create
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {departments.map((dep) => {
          return (
            <div
              key={dep.name}
              className="flex flex-col gap-4 rounded-lg border bg-card p-6 text-card-foreground hover:bg-accent"
            >
              <span className="text-xl font-semibold">{dep.name}</span>
              <p>{dep.description}</p>
              <div className="mt-auto flex flex-1 items-end justify-end justify-self-end">
                <Button variant="ghost" className="ml-auto p-0 hover:underline">
                  Edit
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DepartmentSettingsLayout;
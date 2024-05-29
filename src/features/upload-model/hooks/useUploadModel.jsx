import { useMutation } from "@tanstack/react-query";
import { uploadModel } from "../services";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

function useUploadModel(action) {
  const { toast } = useToast();
  let passedValues;
  const navigate = useNavigate();

  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: (values) => {
      passedValues = values;
      return uploadModel(values);
    },
    onSuccess: (data) => {
      const modelId = data.data.data._id;
      toast({
        title: "Model uploaded successfully!",
        description: "Students can now access your model",
      });
      if (action === "drafts") navigate("/teacher/models");
      if (action === "publish")
        navigate(`/teacher/add-model-definitions?modelId=${modelId}`);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem uploading your model.",
        action: (
          <ToastAction altText="Try again">
            <span
              onClick={() => {
                mutate(passedValues);
              }}
            >
              Try again
            </span>
          </ToastAction>
        ),
      });
    },
  });

  return { mutate, isPending, data, isSuccess };
}

export default useUploadModel;

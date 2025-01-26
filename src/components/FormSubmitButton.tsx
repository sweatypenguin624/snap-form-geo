import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormSubmitButtonProps {
  isLoading: boolean;
}

const FormSubmitButton = ({ isLoading }: FormSubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className="w-full"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        "Submit"
      )}
    </Button>
  );
};

export default FormSubmitButton;
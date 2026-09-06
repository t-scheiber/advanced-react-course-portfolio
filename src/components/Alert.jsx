import {
  DialogTitle,
  DialogCloseTrigger,
  Button,
  DialogDescription,
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
} from "@chakra-ui/react";
import { useAlertContext } from "../context/alertContext";

/**
 * This is a global component that uses context to display a global alert message.
 */
function Alert() {
  const { isOpen, type, message, onClose } = useAlertContext();
  const isSuccess = type === "success";

  return (
    <DialogRoot
      role="alertdialog"
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
        }
      }}
    >
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent py={4} backgroundColor={isSuccess ? "#81C784" : "#FF8A65"}>
          <DialogHeader fontSize="lg" fontWeight="bold">
            <DialogTitle>{isSuccess ? "All good!" : "Oops!"}</DialogTitle>
          </DialogHeader>
          <DialogBody><DialogDescription>{message}</DialogDescription><DialogCloseTrigger asChild><Button mt={4}>Close</Button></DialogCloseTrigger></DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}

export default Alert;

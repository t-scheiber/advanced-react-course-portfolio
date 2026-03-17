import {
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
            {isSuccess ? "All good!" : "Oops!"}
          </DialogHeader>
          <DialogBody>{message}</DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}

export default Alert;

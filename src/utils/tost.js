import { toast } from "react-toastify";

const config = {
  position: "top-right",
  autoClose: 3000,
};

export const successToast = (msg) => toast.success(msg, config);
export const infoToast = (msg) => toast.info(msg, config);

export const errorToast = (error) => {
  const message = typeof error === "string" ? error : error.message;
  toast.error(message, config);
};

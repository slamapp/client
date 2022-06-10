import ReactDOM from "react-dom";
import ToastManager from "./ToastManager";
import type { CreateToast } from "./types";

class Toast {
  portal: HTMLElement | null = null;

  createToast: CreateToast | null = null;

  constructor(portalId = "toast-portal") {
    if (typeof document !== "undefined") {
      const portalElement = document.getElementById(portalId);

      if (portalElement) {
        this.portal = portalElement;
      } else {
        const newPortal = document.createElement("div");
        newPortal.id = portalId;
        newPortal.style.left = "0";
        newPortal.style.right = "0";
        newPortal.style.bottom = "0";
        newPortal.style.zIndex = "9999";
        newPortal.style.position = "fixed";
        this.portal = newPortal;
        document.body.appendChild(this.portal);
      }

      ReactDOM.render(
        <ToastManager
          bind={(createToast) => {
            this.createToast = createToast;
          }}
        />,
        this.portal
      );
    }
  }

  show(message: string, duration = 2000) {
    this.createToast!(message, duration);
  }
}

export default new Toast();

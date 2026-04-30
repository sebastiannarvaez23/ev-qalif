import Swal, { SweetAlertIcon } from "sweetalert2";
import { INotificationService } from "@domain/ports/INotificationService";
import { THEME } from "@infrastructure/config/theme";

export class SweetAlertNotificationService implements INotificationService {
  private fire(icon: SweetAlertIcon, message: string, title?: string) {
    return Swal.fire({
      icon,
      title: title ?? this.defaultTitle(icon),
      text: message,
      confirmButtonColor: THEME.primary,
      background: THEME.card,
      color: THEME.text,
      iconColor: this.iconColor(icon),
    }).then(() => undefined);
  }

  warn(message: string, title?: string) {
    return this.fire("warning", message, title);
  }
  error(message: string, title?: string) {
    return this.fire("error", message, title);
  }
  success(message: string, title?: string) {
    return this.fire("success", message, title);
  }
  info(message: string, title?: string) {
    return this.fire("info", message, title);
  }

  private defaultTitle(icon: SweetAlertIcon): string {
    switch (icon) {
      case "warning":
        return "Atención";
      case "error":
        return "Error";
      case "success":
        return "Listo";
      default:
        return "Información";
    }
  }

  private iconColor(icon: SweetAlertIcon): string {
    return icon === "success" || icon === "info" ? THEME.primary : undefined as unknown as string;
  }
}

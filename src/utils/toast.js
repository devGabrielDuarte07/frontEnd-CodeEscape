import Swal from "sweetalert2";

export function toast(icon, title) {
    return Swal.fire({
        toast: true,
        position: "top-end",
        icon,
        title,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
}
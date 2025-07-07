import { useToast } from 'vue-toastification'

let toastInstance = null

export function initToast() {
  toastInstance = useToast()
}

export function showSuccess(msg) {
  toastInstance?.success(msg)
}

export function showError(msg) {
  toastInstance?.error(msg)
}

export function showWarning(msg) {
  
  toastInstance.warning(msg)
}

export function showInfo(msg) {
  toastInstance?.info(msg)
}

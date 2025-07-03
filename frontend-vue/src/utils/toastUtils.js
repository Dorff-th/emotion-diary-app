// utils/toastUtils.js
import { useToast } from 'vue-toastification'

const toast = useToast()

export const showSuccessToast = (message = '성공적으로 처리되었습니다.') => {
  toast.success(message, {
    timeout: 3000,
    position: 'top-right',
  })
}

export const showErrorToast = (message = '오류가 발생했습니다.') => {
  toast.error(message, {
    timeout: 3000,
    position: 'top-right',
  })
}

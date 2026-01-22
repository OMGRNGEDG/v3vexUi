import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios'
import { useAuth } from '@/auth/auth'

export class ApiError extends Error {
  status?: number
  code?: string
  details?: unknown

  constructor(message: string, opts?: { status?: number; code?: string; details?: unknown }) {
    super(message)
    this.name = 'ApiError'
    this.status = opts?.status
    this.code = opts?.code
    this.details = opts?.details
  }
}

function getBaseURL() {
  // 可通过 .env 设置：VITE_API_BASE_URL=http://localhost:3000
  return (import.meta as any).env?.VITE_API_BASE_URL as string | undefined
}

function normalizeError(err: unknown): ApiError {
  if (!axios.isAxiosError(err)) {
    return new ApiError('请求失败', { details: err })
  }

  const e = err as AxiosError<any>
  const status = e.response?.status

  // 兼容一些常见后端返回结构：{ message } / { msg } / { error }
  const data = e.response?.data
  const msg =
    (data && (data.message || data.msg || data.error)) ||
    e.message ||
    '请求失败'

  return new ApiError(String(msg), { status, details: data })
}

export const http: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 15_000
})

http.interceptors.request.use((config) => {
  const { state } = useAuth()
  const token = state.token

  if (token) {
    config.headers = config.headers ?? {}
    // 约定 Bearer token，按你的后端要求可调整
    ;(config.headers as any).Authorization = `Bearer ${token}`
  }

  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    // 这里不做强耦合跳转（避免 http -> router 循环依赖）
    // 需要 401 自动退出/跳登录的话，可以在业务层捕获后处理
    return Promise.reject(normalizeError(err))
  }
)

export async function request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  const res = await http.request<T, AxiosResponse<T>>(config)
  return res.data
}

export const api = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, url, method: 'GET' }),
  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>({ ...config, url, data, method: 'POST' }),
  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>({ ...config, url, data, method: 'PUT' }),
  del: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, url, method: 'DELETE' })
}


import { computed, reactive } from 'vue'

export type AuthUser = {
  username: string
}

type AuthState = {
  token: string | null
  user: AuthUser | null
}

const LS_TOKEN_KEY = 'auth_token'
const LS_USER_KEY = 'auth_user'

function readToken(): string | null {
  try {
    return localStorage.getItem(LS_TOKEN_KEY)
  } catch {
    return null
  }
}

function readUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(LS_USER_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

function writeSession(token: string, user: AuthUser) {
  localStorage.setItem(LS_TOKEN_KEY, token)
  localStorage.setItem(LS_USER_KEY, JSON.stringify(user))
}

function clearSession() {
  localStorage.removeItem(LS_TOKEN_KEY)
  localStorage.removeItem(LS_USER_KEY)
}

const state = reactive<AuthState>({
  token: readToken(),
  user: readUser()
})

/**
 * 轻量鉴权（示例实现）
 * - token/user 写入 localStorage
 * - 可在此处替换为真实接口（如 /api/login）
 */
export function useAuth() {
  const isAuthed = computed(() => Boolean(state.token))

  async function login(payload: { username: string; password: string }) {
    const username = payload.username.trim()
    const password = payload.password
    if (!username || !password) {
      throw new Error('请输入用户名和密码')
    }

    // mock token：实际项目请替换为服务端返回
    const token = `mock_${username}_${Date.now()}`
    const user: AuthUser = { username }

    state.token = token
    state.user = user
    writeSession(token, user)
  }

  function logout() {
    state.token = null
    state.user = null
    clearSession()
  }

  return {
    state,
    isAuthed,
    login,
    logout
  }
}


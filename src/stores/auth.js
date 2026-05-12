import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/services/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const role = ref(null)
  const profile = ref(null)
  const ready = ref(false)

  const fetchProfile = async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', userId)
      .single()
    if (data) {
      profile.value = data
      role.value = data.role
    }
  }

  const init = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session?.user) {
      user.value = session.user
      await fetchProfile(session.user.id)
    }
    ready.value = true

    supabase.auth.onAuthStateChange(async (_event, session) => {
      user.value = session?.user ?? null
      profile.value = null
      role.value = null
      if (session?.user) await fetchProfile(session.user.id)
    })
  }

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    user.value = data.user
    await fetchProfile(data.user.id)
    return role.value
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    role.value = null
    profile.value = null
  }

  return { user, role, profile, ready, init, login, logout }
})

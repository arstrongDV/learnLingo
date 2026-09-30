import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useAuth } from '../context/useAuth'

type FavoritesStore = {
  /** Favorite teacher ids for each user, keyed by user uid */
  favoritesByUser: Record<string, string[]>
  toggleFavorite: (userId: string, teacherId: string) => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favoritesByUser: {},

      toggleFavorite: (userId, teacherId) =>
        set((state) => {
          const current = state.favoritesByUser[userId] ?? []
          const next = current.includes(teacherId)
            ? current.filter((id) => id !== teacherId)
            : [...current, teacherId]

          return { favoritesByUser: { ...state.favoritesByUser, [userId]: next } }
        }),
    }),
    { name: 'learnlingo-favorites' } // saved in localStorage under this key
  )
)

// Same array every time, so components don't re-render in a loop
const NO_FAVORITES: string[] = []

/** Favorite teacher ids of the logged-in user (empty for guests) */
export const useFavoriteIds = () => {
  const { user } = useAuth()
  return useFavoritesStore((state) =>
    user ? state.favoritesByUser[user.uid] ?? NO_FAVORITES : NO_FAVORITES
  )
}
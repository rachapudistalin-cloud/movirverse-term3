import { createContext, useState } from 'react'

export const WatchlistContext = createContext()

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  )

  const addToWatchlist = (movie) => {
    const alreadyExists = watchlist.find(
      (item) => item.id === movie.id
    )

    if (alreadyExists) return

    const updatedList = [...watchlist, movie]

    setWatchlist(updatedList)

    localStorage.setItem(
      'favorites',
      JSON.stringify(updatedList)
    )
  }

  const removeFromWatchlist = (id) => {
    const updatedList = watchlist.filter(
      (movie) => movie.id !== id
    )

    setWatchlist(updatedList)

    localStorage.setItem(
      'favorites',
      JSON.stringify(updatedList)
    )
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist
      }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}
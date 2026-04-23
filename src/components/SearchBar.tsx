import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { useFilterStore } from '@/store/useFilterStore'
import { SearchIcon } from '@/components/icons/SearchIcon'

export const SearchBar = () => {
  const [value, setValue] = useState('')
  const debounced = useDebounce(value)
  const setDebouncedSearch = useFilterStore((state) => state.setDebouncedSearch)

  useEffect(() => {
    setDebouncedSearch(debounced)
  }, [debounced, setDebouncedSearch])

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search for songs by artist or title"
        className="w-full rounded-full bg-white text-black text-sm px-5 py-3 pr-12 outline-none placeholder:text-dark-text"
      />
      <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 fill-dark-text" />
    </div>
  )
}

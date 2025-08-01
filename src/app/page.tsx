'use client'

import { useState, useEffect } from 'react'
import { ChainData } from '@/types/chain'
import ChainCard from '@/components/ChainCard'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  const [chains, setChains] = useState<ChainData[]>([])
  const [filteredChains, setFilteredChains] = useState<ChainData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchChains()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = chains.filter(chain =>
        chain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chain.chain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chain.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chain.chainId.toString().includes(searchQuery)
      )
      setFilteredChains(filtered)
    } else {
      setFilteredChains(chains)
    }
  }, [searchQuery, chains])

  const fetchChains = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://chainlist.org/rpcs.json')
      if (!response.ok) {
        throw new Error('Failed to fetch chain data')
      }
      const data: ChainData[] = await response.json()
      setChains(data)
      setFilteredChains(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Chain Search
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Discover and explore blockchain networks
          </p>
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search by name, chain ID, or symbol..."
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="mb-4 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Showing {filteredChains.length} of {chains.length} chains
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChains.map((chain) => (
            <ChainCard key={chain.chainId} chain={chain} />
          ))}
        </div>

        {!loading && filteredChains.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No chains found matching {searchQuery}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

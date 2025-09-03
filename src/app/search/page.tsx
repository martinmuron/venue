import { Suspense } from 'react'
import SearchContent from './search-content'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Search Venues</h1>
          <p className="text-lg text-gray-600">Find the perfect venue for your event</p>
        </div>
        
        <Suspense fallback={<div className="text-center py-8">Loading search...</div>}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  )
}
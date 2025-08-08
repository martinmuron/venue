"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VENUE_TYPES, US_STATES, CAPACITY_RANGES } from "@/types"
import { Search, Calendar, Users, MapPin } from "lucide-react"

export function HeroSearch() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCapacity, setSelectedCapacity] = useState<string>("all")
  const [selectedState, setSelectedState] = useState<string>("all")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (selectedType && selectedType !== "all") params.set("type", selectedType)
    if (selectedCapacity && selectedCapacity !== "all") params.set("capacity", selectedCapacity)
    if (selectedState && selectedState !== "all") params.set("state", selectedState)
    
    window.location.href = `/venues?${params.toString()}`
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Venue Type Filter */}
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-700">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center mr-3">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <label className="text-base font-medium text-black">Venue type</label>
            </div>
            <div className="flex justify-center">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-white border-2 border-blue-700 text-black focus:border-black w-full max-w-xs">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {Object.entries(VENUE_TYPES).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Capacity Filter */}
          <div className="bg-white rounded-2xl p-6 border-2 border-green-700">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center mr-3">
                <Users className="h-4 w-4 text-white" />
              </div>
              <label className="text-base font-medium text-black">Capacity</label>
            </div>
            <div className="flex justify-center">
              <Select value={selectedCapacity} onValueChange={setSelectedCapacity}>
                <SelectTrigger className="bg-white border-2 border-green-700 text-black focus:border-black w-full max-w-xs">
                  <SelectValue placeholder="Any capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any capacity</SelectItem>
                  {CAPACITY_RANGES.map((range) => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location Filter */}
          <div className="bg-white rounded-2xl p-6 border-2 border-amber-700">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center mr-3">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <label className="text-base font-medium text-black">Location</label>
            </div>
            <div className="flex justify-center">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="bg-white border-2 border-amber-700 text-black focus:border-black w-full max-w-xs">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}
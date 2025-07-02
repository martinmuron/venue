"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { VENUE_TYPES, PRAGUE_DISTRICTS, CAPACITY_RANGES } from "@/types"
import { Search, Calendar, Users, MapPin, ChevronDown } from "lucide-react"

export function HeroSearch() {
  const [selectedType, setSelectedType] = useState<string>("")
  const [selectedCapacity, setSelectedCapacity] = useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (selectedType) params.set("type", selectedType)
    if (selectedCapacity) params.set("capacity", selectedCapacity)
    if (selectedDistrict) params.set("district", selectedDistrict)
    
    window.location.href = `/prostory?${params.toString()}`
  }

  const FilterCard = ({ 
    icon: Icon, 
    label, 
    value, 
    placeholder, 
    options, 
    onSelect, 
    dropdownKey 
  }: {
    icon: any
    label: string
    value: string
    placeholder: string
    options: Array<{ key: string; label: string }>
    onSelect: (value: string) => void
    dropdownKey: string
  }) => {
    const isOpen = openDropdown === dropdownKey

    return (
      <div className="relative">
        <div 
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          onClick={() => setOpenDropdown(isOpen ? null : dropdownKey)}
        >
          <div className="flex items-center mb-4">
            <Icon className="h-5 w-5 text-white mr-3" />
            <label className="text-lg font-semibold text-white">{label}</label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base text-white/90">
              {value || placeholder}
            </span>
            <ChevronDown className={`h-5 w-5 text-white/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-4 max-h-60 overflow-y-auto shadow-2xl" style={{ zIndex: 9999 }}>
            <div className="space-y-2">
              <div
                className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors text-black"
                onClick={() => {
                  onSelect("")
                  setOpenDropdown(null)
                }}
              >
                {placeholder}
              </div>
              {options.map((option) => (
                <div
                  key={option.key}
                  className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors text-black"
                  onClick={() => {
                    onSelect(option.key)
                    setOpenDropdown(null)
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Venue Type Filter */}
          <FilterCard
            icon={Calendar}
            label="Typ prostoru"
            value={selectedType ? VENUE_TYPES[selectedType as keyof typeof VENUE_TYPES] : ""}
            placeholder="Všechny typy"
            options={Object.entries(VENUE_TYPES).map(([key, label]) => ({ key, label }))}
            onSelect={setSelectedType}
            dropdownKey="type"
          />

          {/* Capacity Filter */}
          <FilterCard
            icon={Users}
            label="Kapacita"
            value={selectedCapacity}
            placeholder="Libovolná kapacita"
            options={CAPACITY_RANGES.map((range) => ({ key: range, label: range }))}
            onSelect={setSelectedCapacity}
            dropdownKey="capacity"
          />

          {/* Location Filter */}
          <FilterCard
            icon={MapPin}
            label="Lokalita"
            value={selectedDistrict}
            placeholder="Celá Praha"
            options={PRAGUE_DISTRICTS.map((district) => ({ key: district, label: district }))}
            onSelect={setSelectedDistrict}
            dropdownKey="district"
          />
        </div>

        {/* Search Button */}
        <div className="text-center mt-8">
          <Button 
            type="submit" 
            size="lg"
            className="magnetic-button hover-lift px-12 py-4 text-base font-semibold rounded-2xl bg-black hover:bg-gray-900 text-white shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            <Search className="mr-3 h-5 w-5" />
            Najít prostory
          </Button>
        </div>
      </form>

      {/* Click outside to close dropdowns */}
      {openDropdown && (
        <div 
          className="fixed inset-0" 
          style={{ zIndex: 9998 }}
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </div>
  )
}
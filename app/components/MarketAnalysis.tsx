'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Home, MapPin, Calendar, DollarSign } from 'lucide-react'

interface Property {
  id: string
  address: string
  price: number
  sqft: number
  bedrooms: number
  bathrooms: number
  status: 'for-sale' | 'sold'
  daysOnMarket: number
  pricePerSqft: number
  listDate: string
  soldDate?: string
  distance: number
}

export default function MarketAnalysis() {
  const [activeTab, setActiveTab] = useState<'overview' | 'comps' | 'trends'>('overview')
  const [compFilter, setCompFilter] = useState<'all' | 'for-sale' | 'sold'>('all')

  // Sample comparable properties data
  const comparableProperties: Property[] = [
    {
      id: '1',
      address: '250 N 3rd St #2A',
      price: 385000,
      sqft: 1200,
      bedrooms: 2,
      bathrooms: 2,
      status: 'for-sale',
      daysOnMarket: 45,
      pricePerSqft: 321,
      listDate: '2024-11-25',
      distance: 0.1
    },
    {
      id: '2',
      address: '240 N 3rd St #5B',
      price: 365000,
      sqft: 1150,
      bedrooms: 2,
      bathrooms: 1.5,
      status: 'sold',
      daysOnMarket: 32,
      pricePerSqft: 317,
      listDate: '2024-10-15',
      soldDate: '2024-11-16',
      distance: 0.2
    },
    {
      id: '3',
      address: '260 N 3rd St #3C',
      price: 395000,
      sqft: 1300,
      bedrooms: 2,
      bathrooms: 2,
      status: 'for-sale',
      daysOnMarket: 67,
      pricePerSqft: 304,
      listDate: '2024-11-01',
      distance: 0.1
    },
    {
      id: '4',
      address: '235 N 2nd St #4A',
      price: 375000,
      sqft: 1180,
      bedrooms: 2,
      bathrooms: 2,
      status: 'sold',
      daysOnMarket: 28,
      pricePerSqft: 318,
      listDate: '2024-09-20',
      soldDate: '2024-10-18',
      distance: 0.3
    }
  ]

  const filteredProperties = comparableProperties.filter(prop => {
    if (compFilter === 'all') return true
    return prop.status === compFilter
  })

  const marketStats = {
    averagePrice: Math.round(comparableProperties.reduce((sum, prop) => sum + prop.price, 0) / comparableProperties.length),
    averagePricePerSqft: Math.round(comparableProperties.reduce((sum, prop) => sum + prop.pricePerSqft, 0) / comparableProperties.length),
    averageDaysOnMarket: Math.round(comparableProperties.reduce((sum, prop) => sum + prop.daysOnMarket, 0) / comparableProperties.length),
    totalListings: comparableProperties.filter(p => p.status === 'for-sale').length,
    totalSold: comparableProperties.filter(p => p.status === 'sold').length
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-dark-card rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'overview'
              ? 'bg-neon-green text-black'
              : 'text-gray-400 hover:text-white hover:bg-dark-border'
          }`}
        >
          Market Overview
        </button>
        <button
          onClick={() => setActiveTab('comps')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'comps'
              ? 'bg-neon-green text-black'
              : 'text-gray-400 hover:text-white hover:bg-dark-border'
          }`}
        >
          Comparable Properties
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'trends'
              ? 'bg-neon-green text-black'
              : 'text-gray-400 hover:text-white hover:bg-dark-border'
          }`}
        >
          Market Trends
        </button>
      </div>

      {/* Market Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-dark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Average Price</p>
                <p className="text-2xl font-bold neon-text">${marketStats.averagePrice.toLocaleString()}</p>
              </div>
              <DollarSign className="text-neon-green" size={24} />
            </div>
          </div>
          
          <div className="card-dark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Price per Sq Ft</p>
                <p className="text-2xl font-bold neon-text">${marketStats.averagePricePerSqft}</p>
              </div>
              <Home className="text-neon-green" size={24} />
            </div>
          </div>
          
          <div className="card-dark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Days on Market</p>
                <p className="text-2xl font-bold neon-text">{marketStats.averageDaysOnMarket}</p>
              </div>
              <Calendar className="text-neon-green" size={24} />
            </div>
          </div>
          
          <div className="card-dark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Listings</p>
                <p className="text-2xl font-bold neon-text">{marketStats.totalListings}</p>
              </div>
              <TrendingUp className="text-neon-green" size={24} />
            </div>
          </div>
        </div>
      )}

      {/* Comparable Properties */}
      {activeTab === 'comps' && (
        <div className="space-y-6">
          {/* Filter Controls */}
          <div className="card-dark">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold neon-text">Comparable Properties</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCompFilter('all')}
                  className={`px-3 py-1 rounded text-sm ${
                    compFilter === 'all' ? 'bg-neon-green text-black' : 'bg-dark-border text-gray-400'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setCompFilter('for-sale')}
                  className={`px-3 py-1 rounded text-sm ${
                    compFilter === 'for-sale' ? 'bg-neon-green text-black' : 'bg-dark-border text-gray-400'
                  }`}
                >
                  For Sale
                </button>
                <button
                  onClick={() => setCompFilter('sold')}
                  className={`px-3 py-1 rounded text-sm ${
                    compFilter === 'sold' ? 'bg-neon-green text-black' : 'bg-dark-border text-gray-400'
                  }`}
                >
                  Sold
                </button>
              </div>
            </div>
            
            {/* Properties Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredProperties.map((property) => (
                <div key={property.id} className="bg-dark-bg border border-dark-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{property.address}</h4>
                      <p className="text-sm text-gray-400 flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {property.distance} miles away
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      property.status === 'for-sale' 
                        ? 'bg-blue-900 text-blue-300' 
                        : 'bg-green-900 text-green-300'
                    }`}>
                      {property.status === 'for-sale' ? 'For Sale' : 'Sold'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Price</p>
                      <p className="font-semibold text-neon-green">${property.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Price/Sq Ft</p>
                      <p className="font-semibold">${property.pricePerSqft}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Size</p>
                      <p className="font-semibold">{property.sqft.toLocaleString()} sq ft</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Bed/Bath</p>
                      <p className="font-semibold">{property.bedrooms}bd / {property.bathrooms}ba</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Days on Market</p>
                      <p className="font-semibold">{property.daysOnMarket} days</p>
                    </div>
                    <div>
                      <p className="text-gray-400">{property.status === 'sold' ? 'Sold Date' : 'List Date'}</p>
                      <p className="font-semibold">
                        {property.status === 'sold' ? property.soldDate : property.listDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Market Trends */}
      {activeTab === 'trends' && (
        <div className="card-dark">
          <h3 className="text-lg font-semibold mb-4 neon-text">Philadelphia Condominium Market Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
              <div>
                <p className="font-medium">Q4 2024 Market Performance</p>
                <p className="text-sm text-gray-400">Compared to Q3 2024</p>
              </div>
              <div className="flex items-center text-red-400">
                <TrendingDown size={20} className="mr-2" />
                <span className="font-semibold">-18% Price Decline</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
              <div>
                <p className="font-medium">Average Days on Market</p>
                <p className="text-sm text-gray-400">Old City neighborhood</p>
              </div>
              <div className="flex items-center text-yellow-400">
                <TrendingUp size={20} className="mr-2" />
                <span className="font-semibold">+25% Increase</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
              <div>
                <p className="font-medium">Inventory Levels</p>
                <p className="text-sm text-gray-400">Available condominiums</p>
              </div>
              <div className="flex items-center text-neon-green">
                <TrendingUp size={20} className="mr-2" />
                <span className="font-semibold">+40% More Inventory</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
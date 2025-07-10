'use client'

import { useState } from 'react'
import {
  Home,
  TrendingUp,
  Calculator,
  FileText,
  Building,
  DollarSign,
  MessageSquare,
  Download,
  LogOut
} from 'lucide-react'
import MarketAnalysis from './MarketAnalysis'
import FinancialCalculators from './FinancialCalculators'
import DocumentManagement from './DocumentManagement'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const handleLogout = () => {
    sessionStorage.removeItem('portal-auth')
    window.location.reload()
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'market', label: 'Market Analysis', icon: TrendingUp },
    { id: 'calculators', label: 'Financial Tools', icon: Calculator },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'hoa', label: 'HOA Tracking', icon: Building },
    { id: 'separation', label: 'Financial Separation', icon: DollarSign },
    { id: 'ai-chat', label: 'AI Assistant', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-card border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold neon-text">
                246 N 3rd St Property Portal
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                Stephen, Melissa & Realtor
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-400 hover:text-white"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-dark-card rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-neon-green text-black'
                      : 'text-gray-400 hover:text-white hover:bg-dark-border'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {activeTab === 'overview' && <OverviewSection />}
          {activeTab === 'market' && <MarketAnalysisSection />}
          {activeTab === 'calculators' && <FinancialToolsSection />}
          {activeTab === 'documents' && <DocumentsSection />}
          {activeTab === 'hoa' && <HOATrackingSection />}
          {activeTab === 'separation' && <FinancialSeparationSection />}
          {activeTab === 'ai-chat' && <AIChatSection />}
        </div>
      </div>
    </div>
  )
}

// Overview Section Component
function OverviewSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="card-dark">
        <h3 className="text-lg font-semibold mb-4 neon-text">Property Summary</h3>
        <div className="space-y-2 text-sm">
          <p><span className="text-gray-400">Address:</span> 246 N 3rd St #4CD</p>
          <p><span className="text-gray-400">City:</span> Philadelphia, PA 19106</p>
          <p><span className="text-gray-400">Owners:</span> Stephen Boerner & Melissa Bemer</p>
          <p><span className="text-gray-400">Current Status:</span> <span className="text-red-400">Vacant</span></p>
          <p><span className="text-gray-400">Listed Price:</span> $379,900</p>
        </div>
      </div>

      <div className="card-dark">
        <h3 className="text-lg font-semibold mb-4 neon-text">Financial Overview</h3>
        <div className="space-y-2 text-sm">
          <p><span className="text-gray-400">Mortgage Balance:</span> $XXX,XXX</p>
          <p><span className="text-gray-400">HOA Monthly:</span> $813</p>
          <p><span className="text-gray-400">Break-even Price:</span> $395,000</p>
          <p><span className="text-gray-400">Monthly Carrying Cost:</span> $X,XXX</p>
          <p><span className="text-gray-400">Days on Market:</span> XXX days</p>
        </div>
      </div>

      <div className="card-dark">
        <h3 className="text-lg font-semibold mb-4 neon-text">Quick Actions</h3>
        <div className="space-y-3">
          <button className="btn-neon w-full text-sm">
            <Download size={16} className="inline mr-2" />
            Export Legal Report
          </button>
          <button className="btn-neon w-full text-sm">
            <Calculator size={16} className="inline mr-2" />
            Run Break-even Analysis
          </button>
          <button className="btn-neon w-full text-sm">
            <MessageSquare size={16} className="inline mr-2" />
            Ask AI Assistant
          </button>
        </div>
      </div>
    </div>
  )
}

// Market Analysis Section Component
function MarketAnalysisSection() {
  return <MarketAnalysis />
}

function FinancialToolsSection() {
  return <FinancialCalculators />
}

function DocumentsSection() {
  return <DocumentManagement />
}

function HOATrackingSection() {
  return (
    <div className="card-dark">
      <h3 className="text-lg font-semibold mb-4 neon-text">HOA Payment & Delinquency Tracking</h3>
      <p className="text-gray-400">HOA payment history and delinquency tracking will be displayed here.</p>
    </div>
  )
}

function FinancialSeparationSection() {
  return (
    <div className="card-dark">
      <h3 className="text-lg font-semibold mb-4 neon-text">Financial Obligation Separation</h3>
      <p className="text-gray-400">Divorce-related financial separation tracking will be displayed here.</p>
    </div>
  )
}

function AIChatSection() {
  return (
    <div className="card-dark">
      <h3 className="text-lg font-semibold mb-4 neon-text">AI Assistant Chat</h3>
      <p className="text-gray-400">Perplexity-powered AI chat for Q&A and financial analysis will be displayed here.</p>
    </div>
  )
}
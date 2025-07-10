'use client'

import { useState } from 'react'
import { Calculator, DollarSign, TrendingUp, TrendingDown, Calendar, PieChart } from 'lucide-react'

export default function FinancialCalculators() {
  const [activeCalculator, setActiveCalculator] = useState('breakeven')

  const calculators = [
    { id: 'breakeven', label: 'Break-even Analysis', icon: TrendingUp },
    { id: 'carrying', label: 'Carrying Costs', icon: DollarSign },
    { id: 'scenarios', label: 'Sale Scenarios', icon: PieChart },
    { id: 'timeline', label: 'Timeline Analysis', icon: Calendar },
  ]

  return (
    <div className="space-y-6">
      {/* Calculator Navigation */}
      <div className="flex flex-wrap gap-2">
        {calculators.map((calc) => {
          const Icon = calc.icon
          return (
            <button
              key={calc.id}
              onClick={() => setActiveCalculator(calc.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCalculator === calc.id
                  ? 'bg-neon-blue text-black'
                  : 'bg-dark-card text-gray-400 hover:text-white hover:bg-dark-border'
              }`}
            >
              <Icon size={16} />
              <span>{calc.label}</span>
            </button>
          )
        })}
      </div>

      {/* Calculator Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeCalculator === 'breakeven' && <BreakevenCalculator />}
        {activeCalculator === 'carrying' && <CarryingCostsCalculator />}
        {activeCalculator === 'scenarios' && <SaleScenariosCalculator />}
        {activeCalculator === 'timeline' && <TimelineAnalysisCalculator />}
      </div>
    </div>
  )
}

function BreakevenCalculator() {
  const [inputs, setInputs] = useState({
    mortgageBalance: 350000,
    sellingCosts: 6, // percentage
    capitalGains: 0, // percentage
    improvements: 0,
    legalFees: 5000,
    otherCosts: 0
  })

  const [results, setResults] = useState({
    breakevenPrice: 0,
    netProceeds: 0,
    totalCosts: 0
  })

  const calculateBreakeven = () => {
    const sellingCostAmount = (inputs.mortgageBalance * inputs.sellingCosts) / 100
    const capitalGainsAmount = (inputs.mortgageBalance * inputs.capitalGains) / 100
    const totalCosts = inputs.mortgageBalance + sellingCostAmount + capitalGainsAmount + 
                      inputs.improvements + inputs.legalFees + inputs.otherCosts
    
    const breakevenPrice = totalCosts / (1 - inputs.sellingCosts / 100)
    
    setResults({
      breakevenPrice: Math.round(breakevenPrice),
      netProceeds: 0,
      totalCosts: Math.round(totalCosts)
    })
  }

  return (
    <>
      <div className="card-dark">
        <h3 className="text-lg font-semibold mb-4 neon-text flex items-center">
          <Calculator className="mr-2" size={20} />
          Break-even Analysis
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Mortgage Balance ($)
            </label>
            <input
              type="number"
              value={inputs.mortgageBalance}
              onChange={(e) => setInputs({...inputs, mortgageBalance: Number(e.target.value)})}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Selling Costs (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={inputs.sellingCosts}
              onChange={(e) => setInputs({...inputs, sellingCosts: Number(e.target.value)})}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Capital Gains Tax (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={inputs.capitalGains}
              onChange={(e) => setInputs({...inputs, capitalGains: Number(e.target.value)})}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Improvements/Repairs ($)
            </label>
            <input
              type="number"
              value={inputs.improvements}
              onChange={(e) => setInputs({...inputs, improvements: Number(e.target.value)})}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Legal/Divorce Fees ($)
            </label>
            <input
              type="number"
              value={inputs.legalFees}
              onChange={(e) => setInputs({...inputs, legalFees: Number(e.target.value)})}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Other Costs ($)
            </label>
            <input
              type="number"
              value={inputs.otherCosts}
              onChange={(e) => setInputs({...inputs, otherCosts: Number(e.target.value)})}
              className="input-dark w-full"
            />
          </div>

          <button
            onClick={calculateBreakeven}
            className="btn-neon w-full"
          >
            Calculate Break-even
          </button>
        </div>
      </div>

      <div className="card-dark">
        <h3 className="text-lg font-semibold mb-4 neon-text">Results</h3>
        
        <div className="space-y-4">
          <div className="bg-dark-bg p-4 rounded-lg border border-neon-green/20">
            <div className="text-2xl font-bold text-neon-green">
              ${results.breakevenPrice.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Break-even Sale Price</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-bg p-3 rounded-lg">
              <div className="text-lg font-semibold text-white">
                ${results.totalCosts.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Total Costs</div>
            </div>
            
            <div className="bg-dark-bg p-3 rounded-lg">
              <div className="text-lg font-semibold text-white">
                ${(379900 - results.breakevenPrice).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">vs Current List Price</div>
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-4">
            * Break-even calculation includes mortgage payoff, selling costs, taxes, and fees
          </div>
        </div>
      </div>
    </>
  )
}

function CarryingCostsCalculator() {
  const [monthlyInputs, setMonthlyInputs] = useState({
    hoaFees: 813,
    utilities: 150,
    insurance: 200,
    taxes: 300,
    maintenance: 100,
    other: 0
  })

  const totalMonthly = Object.values(monthlyInputs).reduce((sum, val) => sum + val, 0)

  return (
    <>
      <div className="card-dark">
        <h3 className="text-lg font-semibold mb-4 neon-text flex items-center">
          <DollarSign className="mr-2" size={20} />
          Monthly Carrying Costs
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              HOA Fees ($)
            </label>
            <input
              type="number"
              value={monthlyInputs.hoaFees}
              onChange={(e) => setMonthlyInputs({...monthlyInputs, hoaFees: Number(e.target.value)})}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Utilities (PECO, etc.) ($)
            </label>
            <input
              type="number"
              value={monthlyInputs.utilities}
              onChange={(e) => setMonthlyInputs({...monthlyInputs, utilities: Number(e.target.value)})}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Insurance ($)
            </label>
            <input
              type="number"
              value={monthlyInputs.insurance}
              onChange={(e) => setMonthlyInputs({...monthlyInputs, insurance: Number(e.target.value)})}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Property Taxes ($)
            </label>
            <input
              type="number"
              value={monthlyInputs.taxes}
              onChange={(e) => setMonthlyInputs({...monthlyInputs, taxes: Number(e.target.value)})}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Maintenance/Repairs ($)
            </label>
            <input
              type="number"
              value={monthlyInputs.maintenance}
              onChange={(e) => setMonthlyInputs({...monthlyInputs, maintenance: Number(e.target.value)})}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Other Costs ($)
            </label>
            <input
              type="number"
              value={monthlyInputs.other}
              onChange={(e) => setMonthlyInputs({...monthlyInputs, other: Number(e.target.value)})}
              className="input-dark w-full"
            />
          </div>
        </div>
      </div>

      <div className="card-dark">
        <h3 className="text-lg font-semibold mb-4 neon-text">Cost Summary</h3>
        
        <div className="space-y-4">
          <div className="bg-dark-bg p-4 rounded-lg border border-neon-blue/20">
            <div className="text-2xl font-bold text-neon-blue">
              ${totalMonthly.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total Monthly Carrying Cost</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-bg p-3 rounded-lg">
              <div className="text-lg font-semibold text-white">
                ${(totalMonthly * 3).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">3-Month Cost</div>
            </div>
            
            <div className="bg-dark-bg p-3 rounded-lg">
              <div className="text-lg font-semibold text-white">
                ${(totalMonthly * 6).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">6-Month Cost</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Cost Breakdown:</h4>
            {Object.entries(monthlyInputs).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-white">${value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function SaleScenariosCalculator() {
  const scenarios = [
    { name: 'Current List Price', price: 379900, probability: 'Medium' },
    { name: 'Reduced Price (-5%)', price: 360905, probability: 'High' },
    { name: 'Market Price (-10%)', price: 341910, probability: 'Very High' },
    { name: 'Quick Sale (-15%)', price: 322915, probability: 'Certain' },
  ]

  const breakevenPrice = 395000 // This would come from the breakeven calculator

  return (
    <div className="col-span-2">
      <div className="card-dark">
        <h3 className="text-lg font-semibold mb-4 neon-text flex items-center">
          <PieChart className="mr-2" size={20} />
          Sale Price Scenarios
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left py-3 text-gray-300">Scenario</th>
                <th className="text-right py-3 text-gray-300">Sale Price</th>
                <th className="text-right py-3 text-gray-300">Net Proceeds</th>
                <th className="text-right py-3 text-gray-300">Profit/Loss</th>
                <th className="text-center py-3 text-gray-300">Probability</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((scenario, index) => {
                const netProceeds = scenario.price * 0.94 // Assuming 6% selling costs
                const profitLoss = netProceeds - breakevenPrice
                const isProfit = profitLoss > 0
                
                return (
                  <tr key={index} className="border-b border-dark-border/50">
                    <td className="py-3 text-white">{scenario.name}</td>
                    <td className="py-3 text-right text-white">${scenario.price.toLocaleString()}</td>
                    <td className="py-3 text-right text-white">${Math.round(netProceeds).toLocaleString()}</td>
                    <td className={`py-3 text-right font-medium ${isProfit ? 'text-neon-green' : 'text-red-400'}`}>
                      {isProfit ? '+' : ''}${Math.round(profitLoss).toLocaleString()}
                    </td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        scenario.probability === 'Certain' ? 'bg-neon-green/20 text-neon-green' :
                        scenario.probability === 'Very High' ? 'bg-neon-blue/20 text-neon-blue' :
                        scenario.probability === 'High' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {scenario.probability}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-dark-bg rounded-lg border border-yellow-500/20">
          <h4 className="text-sm font-medium text-yellow-400 mb-2">Key Insights:</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Current list price may result in a loss of ${((379900 * 0.94) - breakevenPrice).toLocaleString()}</li>
            <li>• Break-even requires sale price of approximately ${breakevenPrice.toLocaleString()}</li>
            <li>• Quick sale scenarios minimize carrying costs but increase losses</li>
            <li>• Consider market timing and negotiation strategies</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function TimelineAnalysisCalculator() {
  const [timelineInputs, setTimelineInputs] = useState({
    currentDaysOnMarket: 45,
    estimatedSaleDays: 90,
    monthlyCarryingCost: 1563
  })

  const totalCarryingCost = (timelineInputs.estimatedSaleDays / 30) * timelineInputs.monthlyCarryingCost

  return (
    <div className="col-span-2">
      <div className="card-dark">
        <h3 className="text-lg font-semibold mb-4 neon-text flex items-center">
          <Calendar className="mr-2" size={20} />
          Timeline & Cost Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Current Days on Market
              </label>
              <input
                type="number"
                value={timelineInputs.currentDaysOnMarket}
                onChange={(e) => setTimelineInputs({...timelineInputs, currentDaysOnMarket: Number(e.target.value)})}
                className="input-dark w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Estimated Days to Sale
              </label>
              <input
                type="number"
                value={timelineInputs.estimatedSaleDays}
                onChange={(e) => setTimelineInputs({...timelineInputs, estimatedSaleDays: Number(e.target.value)})}
                className="input-dark w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Monthly Carrying Cost ($)
              </label>
              <input
                type="number"
                value={timelineInputs.monthlyCarryingCost}
                onChange={(e) => setTimelineInputs({...timelineInputs, monthlyCarryingCost: Number(e.target.value)})}
                className="input-dark w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-dark-bg p-4 rounded-lg border border-neon-purple/20">
              <div className="text-xl font-bold text-neon-purple">
                ${Math.round(totalCarryingCost).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Carrying Cost to Sale</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Days remaining:</span>
                <span className="text-white">{timelineInputs.estimatedSaleDays - timelineInputs.currentDaysOnMarket} days</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Cost per day:</span>
                <span className="text-white">${Math.round(timelineInputs.monthlyCarryingCost / 30)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Cost to date:</span>
                <span className="text-white">${Math.round((timelineInputs.currentDaysOnMarket / 30) * timelineInputs.monthlyCarryingCost).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="text-xs text-yellow-400">
                <strong>Strategy Note:</strong> Each additional month on market costs ${timelineInputs.monthlyCarryingCost.toLocaleString()}. 
                Consider price reduction vs. carrying cost trade-offs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
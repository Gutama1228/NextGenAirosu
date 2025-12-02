import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { getAnalytics, getCategoryStats } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Analytics Component
 * Detailed insights and statistics
 */
const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [analyticsData, statsData] = await Promise.all([
        getAnalytics(),
        getCategoryStats()
      ]);
      setAnalytics(analyticsData);
      setCategoryStats(statsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" text="Loading analytics..." />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Failed to load analytics</p>
      </div>
    );
  }

  const COLORS = ['#3b82f6', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-gray-400 mt-1">Detailed insights tentang penggunaan platform</p>
      </div>

      {/* Category Performance */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold mb-4">Category Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryStats.map((stat, idx) => (
            <div key={idx} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{stat.category}</h4>
                <span className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.trend.startsWith('+') ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.trend}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Queries</span>
                  <span className="font-semibold">{stat.totalQueries}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Avg Response</span>
                  <span className="font-semibold">{stat.avgResponseTime}s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Satisfaction</span>
                  <span className="font-semibold text-yellow-400">⭐ {stat.satisfaction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Usage Bar Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-4">Category Usage Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.categoryUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {analytics.categoryUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Usage Pie Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.categoryUsage}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analytics.categoryUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Prompts */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Prompts</h3>
        <div className="space-y-3">
          {analytics.topPrompts.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                  idx === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                  idx === 1 ? 'bg-gray-400/20 text-gray-400' :
                  idx === 2 ? 'bg-orange-500/20 text-orange-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  #{idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.prompt}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.category === 'coding' ? 'bg-blue-500/20 text-blue-400' :
                      item.category === 'design' ? 'bg-orange-500/20 text-orange-400' :
                      item.category === 'optimization' ? 'bg-green-500/20 text-green-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.count} queries
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-32 ml-4">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      idx === 0 ? 'bg-yellow-500' :
                      idx === 1 ? 'bg-gray-400' :
                      idx === 2 ? 'bg-orange-500' :
                      'bg-blue-500'
                    }`}
                    style={{ width: `${(item.count / analytics.topPrompts[0].count) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-xl p-6">
          <h4 className="text-sm text-blue-400 mb-2">Most Popular Category</h4>
          <p className="text-2xl font-bold">
            {analytics.categoryUsage.sort((a, b) => b.value - a.value)[0].name}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {analytics.categoryUsage.sort((a, b) => b.value - a.value)[0].value} queries
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-xl p-6">
          <h4 className="text-sm text-purple-400 mb-2">Total Interactions</h4>
          <p className="text-2xl font-bold">
            {analytics.categoryUsage.reduce((sum, cat) => sum + cat.value, 0).toLocaleString()}
          </p>
          <p className="text-sm text-gray-400 mt-1">Across all categories</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-6">
          <h4 className="text-sm text-green-400 mb-2">Engagement Rate</h4>
          <p className="text-2xl font-bold">94.5%</p>
          <p className="text-sm text-gray-400 mt-1">Users who return</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

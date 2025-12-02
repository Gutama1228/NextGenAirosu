import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, Key, Shield, Palette, Bell } from 'lucide-react';
import { getSettings, updateSettings } from '../../services/api';
import { getApiStatus } from '../../services/anthropic';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Settings Component
 * Platform configuration and preferences
 */
const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    fetchSettings();
    checkApiStatus();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkApiStatus = () => {
    const status = getApiStatus();
    setApiStatus(status);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default?')) {
      fetchSettings();
    }
  };

  const handleToggle = (section, key) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key]
      }
    }));
  };

  const handleInputChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" text="Loading settings..." />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Failed to load settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-400 mt-1">Konfigurasi website dan API</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 rounded-lg font-medium transition-all shadow-lg"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : saved ? (
              <>
                ✓ Saved
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* API Status Banner */}
      {apiStatus && (
        <div className={`p-4 rounded-xl border ${
          apiStatus.configured 
            ? 'bg-green-500/10 border-green-500/50' 
            : 'bg-yellow-500/10 border-yellow-500/50'
        }`}>
          <div className="flex items-center gap-3">
            <Key className={`w-5 h-5 ${apiStatus.configured ? 'text-green-400' : 'text-yellow-400'}`} />
            <div className="flex-1">
              <p className="font-semibold">
                {apiStatus.configured ? '✓ API Configured' : '⚠ Demo Mode Active'}
              </p>
              <p className="text-sm text-gray-400">
                {apiStatus.configured 
                  ? `Using Claude ${apiStatus.model}` 
                  : 'Add REACT_APP_ANTHROPIC_API_KEY to .env to enable real AI'}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              apiStatus.configured 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {apiStatus.mode}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Configuration */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">API Configuration</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">API Model</label>
              <select 
                value={settings.api.model}
                onChange={(e) => handleInputChange('api', 'model', e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="claude-sonnet-4-20250514">Claude Sonnet 4 (Recommended)</option>
                <option value="claude-opus-4">Claude Opus 4 (Most Capable)</option>
                <option value="claude-haiku-4-5">Claude Haiku 4.5 (Fastest)</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">Current model for AI responses</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Tokens</label>
              <input 
                type="number"
                value={settings.api.maxTokens}
                onChange={(e) => handleInputChange('api', 'maxTokens', parseInt(e.target.value))}
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="256"
                max="8192"
              />
              <p className="text-xs text-gray-400 mt-1">Maximum response length (256-8192)</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Temperature</label>
              <input 
                type="range"
                value={settings.api.temperature}
                onChange={(e) => handleInputChange('api', 'temperature', parseFloat(e.target.value))}
                className="w-full"
                min="0"
                max="1"
                step="0.1"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Precise (0)</span>
                <span className="font-medium text-purple-400">{settings.api.temperature}</span>
                <span>Creative (1)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Feature Management</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="font-medium">User Registration</p>
                <p className="text-sm text-gray-400">Allow new users to register</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.features.userRegistration}
                  onChange={() => handleToggle('features', 'userRegistration')}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="font-medium">Maintenance Mode</p>
                <p className="text-sm text-gray-400">Temporarily disable the site</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.features.maintenance}
                  onChange={() => handleToggle('features', 'maintenance')}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="font-medium">Analytics Tracking</p>
                <p className="text-sm text-gray-400">Collect usage statistics</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.features.analytics}
                  onChange={() => handleToggle('features', 'analytics')}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* UI Preferences */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">UI Preferences</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select 
                value={settings.ui.theme}
                onChange={(e) => handleInputChange('ui', 'theme', e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="dark">Dark (Current)</option>
                <option value="light">Light (Coming Soon)</option>
                <option value="auto">Auto (Coming Soon)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select 
                value={settings.ui.language}
                onChange={(e) => handleInputChange('ui', 'language', e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English (Coming Soon)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-sm">New User Registration</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-sm">High API Usage</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-sm">System Errors</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-4">
        <p className="text-sm text-blue-400">
          💡 <strong>Pro Tip:</strong> Some settings require application restart to take effect. 
          Save your changes and refresh the page if needed.
        </p>
      </div>
    </div>
  );
};

export default Settings;

import React, { useState, useEffect } from 'react';
import { Save, Upload, Sparkles, Star, Zap, Eye, RefreshCw } from 'lucide-react';
import { getSettings, updateSettings } from '../../services/api';

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Roblox AI Studio',
    tagline: 'Your Development Assistant',
    logo: null,
    logoUrl: '',
    showBadge: true,
    badgeIcon: 'sparkles',
    badgeText: 'AI Powered'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      if (data.site) {
        setSettings(prev => ({ ...prev, ...data.site }));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setLoading(false);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({
          ...prev,
          logo: file,
          logoUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Upload logo jika ada
      let logoUrl = settings.logoUrl;
      if (settings.logo instanceof File) {
        // TODO: Implement upload ke cloud storage
        // logoUrl = await uploadLogo(settings.logo);
      }

      await updateSettings({
        site: {
          siteName: settings.siteName,
          tagline: settings.tagline,
          logoUrl: logoUrl,
          showBadge: settings.showBadge,
          badgeIcon: settings.badgeIcon,
          badgeText: settings.badgeText
        }
      });

      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const badgeIcons = [
    { id: 'sparkles', name: 'Sparkles', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'star', name: 'Star', icon: <Star className="w-5 h-5" /> },
    { id: 'zap', name: 'Zap', icon: <Zap className="w-5 h-5" /> },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Site Settings</h1>
          <p className="text-gray-400 mt-1">Kelola tampilan dan branding website Anda</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
          >
            <Eye className="w-5 h-5" />
            {preview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium transition-all shadow-lg disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Saving...
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Settings */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              {/* Site Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Roblox AI Studio"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-sm font-medium mb-2">Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings(prev => ({ ...prev, tagline: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your Development Assistant"
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">Logo</h3>
            
            <div className="space-y-4">
              {/* Current Logo */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                  {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Sparkles className="w-10 h-10 text-purple-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-2">
                    Upload logo untuk branding website (recommended: 512x512px)
                  </p>
                  <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-all inline-flex">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm font-medium">Upload Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {settings.logoUrl && (
                <button
                  onClick={() => setSettings(prev => ({ ...prev, logo: null, logoUrl: '' }))}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Remove Logo
                </button>
              )}
            </div>
          </div>

          {/* Badge Settings */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">Hero Badge</h3>
            
            <div className="space-y-4">
              {/* Show Badge Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Badge</p>
                  <p className="text-sm text-gray-400">Display badge di hero section</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showBadge}
                    onChange={(e) => setSettings(prev => ({ ...prev, showBadge: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {settings.showBadge && (
                <>
                  {/* Badge Text */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Badge Text</label>
                    <input
                      type="text"
                      value={settings.badgeText}
                      onChange={(e) => setSettings(prev => ({ ...prev, badgeText: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="AI Powered"
                    />
                  </div>

                  {/* Badge Icon */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Badge Icon</label>
                    <div className="grid grid-cols-3 gap-3">
                      {badgeIcons.map((icon) => (
                        <button
                          key={icon.id}
                          onClick={() => setSettings(prev => ({ ...prev, badgeIcon: icon.id }))}
                          className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                            settings.badgeIcon === icon.id
                              ? 'border-purple-500 bg-purple-500/20'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className={settings.badgeIcon === icon.id ? 'text-purple-400' : 'text-gray-400'}>
                            {icon.icon}
                          </div>
                          <span className="text-xs font-medium">{icon.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-6">
          {preview && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
              
              {/* Header Preview */}
              <div className="bg-black/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Logo" className="w-10 h-10 rounded-lg" />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold">{settings.siteName}</h4>
                    <p className="text-xs text-gray-400">{settings.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Badge Preview */}
              {settings.showBadge && (
                <div className="flex justify-center mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm font-medium">
                    {badgeIcons.find(i => i.id === settings.badgeIcon)?.icon}
                    {settings.badgeText}
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-sm">
                <p className="text-blue-400 font-semibold mb-1">💡 Preview Tips</p>
                <p className="text-gray-400 text-xs">
                  Changes shown here are for preview only. Click "Save Changes" to apply them to the live website.
                </p>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
            <h4 className="font-semibold mb-2">ℹ️ Settings Information</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Logo akan muncul di header dan footer website</li>
              <li>• Badge muncul di hero section sebagai highlight</li>
              <li>• Perubahan akan langsung terlihat setelah save</li>
              <li>• Recommended logo size: 512x512px (PNG/SVG)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;

'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2, AlertTriangle } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { supabase, BrainDump } from '@/src/lib/supabaseClient';

const EditBrainDump: React.FC = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [brainDump, setBrainDump] = useState<BrainDump | null>(null);
  const [brainDumpText, setBrainDumpText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBrainDump(id);
    }
  }, [id]);

  const fetchBrainDump = async (brainDumpId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data: brainDumpData, error: brainDumpError } = await supabase
        .from('brain_dumps')
        .select('*')
        .eq('id', brainDumpId)
        .single();

      if (brainDumpError) {
        throw brainDumpError;
      }

      if (!brainDumpData) {
        setError('Brain dump not found');
        return;
      }

      setBrainDump(brainDumpData);
      setBrainDumpText(brainDumpData.content);
    } catch (err) {
      console.error('Error fetching brain dump:', err);
      setError(err instanceof Error ? err.message : 'Failed to load brain dump');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!brainDump || !brainDumpText.trim()) return;

    try {
      setSaving(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('brain_dumps')
        .update({ content: brainDumpText.trim() })
        .eq('id', brainDump.id);

      if (updateError) {
        throw updateError;
      }

      router.push(`/braindump/${id}`);
    } catch (err) {
      console.error('Error saving brain dump:', err);
      setError(err instanceof Error ? err.message : 'Failed to save brain dump');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/braindump/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600">Loading brain dump...</p>
        </div>
      </div>
    );
  }

  if (error || !brainDump) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-red-500" />
          <p className="text-gray-600 mb-4">{error || 'Brain dump not found'}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-300 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-32 right-24 w-12 h-12 bg-green-300 opacity-40 transform rotate-45"></div>
      <div className="absolute top-1/3 right-20 w-8 h-8 bg-orange-300 rounded-full opacity-50"></div>
      <div className="absolute bottom-20 left-1/4 w-6 h-6 bg-blue-300 rounded-full opacity-40"></div>
      <div className="absolute top-1/2 left-10 w-10 h-10 bg-purple-300 opacity-30 transform rotate-12"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Back/Cancel Button */}
        <button
          onClick={handleCancel}
          className="mb-6 bg-white hover:bg-orange-50 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Cancel</span>
        </button>

        {/* Edit Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative">
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-300 rounded-full opacity-80"></div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Brain Dump</h1>
          
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Textarea */}
          <div className="mb-8">
            <textarea
              value={brainDumpText}
              onChange={(e) => setBrainDumpText(e.target.value)}
              className="w-full h-64 p-6 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 text-lg leading-relaxed"
              placeholder="What's on your mind?"
              autoFocus
              disabled={saving}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              disabled={saving || !brainDumpText.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-8 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 flex items-center space-x-2 shadow-lg"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
            
            <button
              onClick={handleCancel}
              disabled={saving}
              className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 py-3 px-8 rounded-xl font-medium transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBrainDump; 
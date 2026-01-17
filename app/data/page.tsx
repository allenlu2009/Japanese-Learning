'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, Upload, Database, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { downloadUniversalExport, importFromUniversalFormat, getTests } from '@/lib/storage';
import { getCharacterAttempts } from '@/lib/characterStorage';
import { cn } from '@/lib/utils';
import { GoogleDriveSync } from '@/components/data/GoogleDriveSync';

interface ImportResult {
  success: boolean;
  imported: number;
  duplicates: number;
  error?: string;
}

export default function DataPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'warning'; text: string } | null>(null);
  const [testCount, setTestCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Load current data stats
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    try {
      const tests = getTests();
      const attempts = getCharacterAttempts();
      setTestCount(tests.length);
      setAttemptCount(attempts.length);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleExport = () => {
    setExporting(true);
    try {
      downloadUniversalExport();
      setMessage({ type: 'success', text: 'Data exported successfully! Check your downloads folder.' });
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error('Export error:', error);
      setMessage({ type: 'error', text: 'Failed to export data. Please try again.' });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setExporting(false);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        const result: ImportResult = importFromUniversalFormat(jsonData);

        if (result.success) {
          const messages = [];
          if (result.imported > 0) {
            messages.push(`Successfully imported ${result.imported} test${result.imported > 1 ? 's' : ''}`);
          }
          if (result.duplicates > 0) {
            messages.push(`${result.duplicates} duplicate${result.duplicates > 1 ? 's' : ''} skipped`);
          }

          const type = result.duplicates > 0 && result.imported === 0 ? 'warning' : 'success';
          setMessage({ type, text: messages.join('. ') + '.' });

          // Reload stats
          loadStats();

          // Refresh after a delay
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        } else {
          setMessage({ type: 'error', text: result.error || 'Import failed. Please check the file format.' });
          setTimeout(() => setMessage(null), 5000);
        }
      } catch (error) {
        console.error('Import error:', error);
        setMessage({ type: 'error', text: 'Failed to parse import file. File may be corrupted.' });
        setTimeout(() => setMessage(null), 5000);
      } finally {
        setImporting(false);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.onerror = () => {
      setMessage({ type: 'error', text: 'Failed to read file.' });
      setTimeout(() => setMessage(null), 5000);
      setImporting(false);
    };

    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">
            Data Management
          </p>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Import & Export
          </h1>
          <p className="text-lg text-slate-600">
            Transfer data between devices or back up your progress.
          </p>
        </div>

        {/* Message Banner */}
        {message && (
          <div
            className={cn(
              'mb-6 p-4 rounded-xl border-2 flex items-center gap-3 shadow-sm',
              message.type === 'success' && 'bg-green-50 border-green-200',
              message.type === 'error' && 'bg-red-50 border-red-200',
              message.type === 'warning' && 'bg-yellow-50 border-yellow-200'
            )}
          >
            {message.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />}
            {message.type === 'error' && <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />}
            {message.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />}
            <p
              className={cn(
                'text-sm font-medium',
                message.type === 'success' && 'text-green-800',
                message.type === 'error' && 'text-red-800',
                message.type === 'warning' && 'text-yellow-800'
              )}
            >
              {message.text}
            </p>
          </div>
        )}

        <div className="space-y-6">
          {/* Google Drive Auto-Sync */}
          <GoogleDriveSync />

          {/* Stats Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900">Current Data</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-bold text-blue-600">{testCount}</p>
                <p className="text-sm text-slate-600">Tests</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-indigo-600">{attemptCount}</p>
                <p className="text-sm text-slate-600">Character Attempts</p>
              </div>
            </div>
          </Card>

          {/* Import Section */}
          <Card>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Import from Another Device</h2>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="import-file"
            />

            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={importing}
              size="lg"
              className="w-full mb-4"
            >
              <Upload className="h-5 w-5 mr-2" />
              {importing ? 'Importing...' : '📁 Browse Files'}
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Import Instructions
              </p>
              <ol className="text-sm text-blue-800 space-y-1 ml-6 list-decimal">
                <li>On your other device, go to Data tab and click "Export Data"</li>
                <li>Transfer the JSON file to this device</li>
                <li>Click "Browse Files" above to select it</li>
                <li>Data will be merged (duplicates are automatically skipped)</li>
              </ol>
            </div>
          </Card>

          {/* Export Section */}
          <Card>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Export Your Data</h2>

            <Button
              onClick={handleExport}
              disabled={exporting}
              variant="secondary"
              size="lg"
              className="w-full mb-4"
            >
              <Download className="h-5 w-5 mr-2" />
              {exporting ? 'Exporting...' : '💾 Export Data'}
            </Button>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-sm text-slate-700">
              <p>
                <strong className="text-slate-900">Format:</strong> Universal v1.0 (cross-platform compatible)
              </p>
              <p>
                <strong className="text-slate-900">Compatible with:</strong> Mobile app, Gemini, Codex implementations
              </p>
              <p>
                <strong className="text-slate-900">File name:</strong> japanese-tests-[timestamp].json
              </p>
            </div>
          </Card>

          {/* Format Info */}
          <Card className="bg-slate-50 border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">About the Universal Format</h2>
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                Exports use the <span className="font-mono bg-slate-200 px-1.5 py-0.5 rounded">Universal v1.0</span> format,
                which is compatible with all implementations (web and mobile).
              </p>
              <p>
                This format follows the agreed schema specification and ensures your data can be transferred
                between any device or platform seamlessly.
              </p>
              <p className="text-green-700 font-medium">
                ✅ Imports are non-destructive - existing data is preserved and duplicates are skipped
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

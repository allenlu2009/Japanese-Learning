'use client';

import React, { useRef, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, Upload, Database, CheckCircle, XCircle } from 'lucide-react';
import { exportTests, importTests } from '@/lib/storage';

interface DataManagementProps {
  onDataChange?: () => void; // Callback when data is imported
}

export function DataManagement({ onDataChange }: DataManagementProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Handle export - download JSON file
  const handleExport = () => {
    try {
      const jsonData = exportTests();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      // Create timestamp with date and time (YYYY-MM-DD-HH-MM-SS)
      const now = new Date();
      const timestamp = now.toISOString()
        .replace(/T/, '-')
        .replace(/:/g, '-')
        .split('.')[0];

      link.href = url;
      link.download = `japanese-learning-tests-${timestamp}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: 'Data exported successfully! Save to the data/ folder.' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Export error:', error);
      setMessage({ type: 'error', text: 'Failed to export data.' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // Handle import - read and restore from JSON file
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        const success = importTests(jsonData);

        if (success) {
          setMessage({ type: 'success', text: 'Data imported successfully!' });
          // Notify parent component to refresh data
          if (onDataChange) {
            onDataChange();
          }
          // Refresh the page to show updated data
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          setMessage({ type: 'error', text: 'Failed to import data. Invalid format.' });
        }
      } catch (error) {
        console.error('Import error:', error);
        setMessage({ type: 'error', text: 'Failed to import data. File may be corrupted.' });
      } finally {
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setTimeout(() => setMessage(null), 3000);
      }
    };

    reader.onerror = () => {
      setMessage({ type: 'error', text: 'Failed to read file.' });
      setTimeout(() => setMessage(null), 3000);
    };

    reader.readAsText(file);
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Database className="h-6 w-6 text-primary-600" />
          <div>
            <h3 className="text-lg font-bold text-gray-900">Data Management</h3>
            <p className="text-sm text-gray-600">Backup and restore your test data</p>
          </div>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`p-3 rounded-lg border-2 flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Export Button */}
          <Button onClick={handleExport} variant="secondary" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>

          {/* Import Button */}
          <div>
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
              variant="secondary"
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-xs text-gray-500 space-y-1 pt-2 border-t border-gray-200">
          <p>
            <strong>Export:</strong> Download your test data as a JSON file with timestamp.
          </p>
          <p>
            <strong>Tip:</strong> Save exported files to the <code className="bg-gray-100 px-1 py-0.5 rounded">data/</code> folder in the project root.
          </p>
          <p>
            <strong>Import:</strong> Restore test data from a previously exported JSON file.
          </p>
          <p className="text-yellow-600">
            ⚠️ Importing will replace all current data. Make sure to export first!
          </p>
        </div>
      </div>
    </Card>
  );
}

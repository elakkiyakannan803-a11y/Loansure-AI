import { useState } from 'react';
import { FolderOpen, Upload, CheckCircle2, FileText, Info, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/lib/toast';
import { demoDocuments } from '@/data/demoData';
import type { DocumentItem } from '@/types';

export default function Documents() {
  const { showToast } = useToast();
  const [documents, setDocuments] = useState<DocumentItem[]>(demoDocuments);
  const [uploadTarget, setUploadTarget] = useState<DocumentItem | null>(null);

  const requiredCount = documents.filter((d) => d.required).length;
  const uploadedCount = documents.filter((d) => d.uploaded).length;
  const requiredUploaded = documents.filter((d) => d.required && d.uploaded).length;
  const progress = Math.round((requiredUploaded / requiredCount) * 100);

  const categories = [...new Set(documents.map((d) => d.category))];

  const handleUpload = (doc: DocumentItem) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === doc.id ? { ...d, uploaded: true, uploadDate: new Date().toISOString().split('T')[0] } : d
      )
    );
    showToast(`${doc.name} uploaded successfully (demo).`, 'success');
    setUploadTarget(null);
  };

  const handleRemove = (doc: DocumentItem) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, uploaded: false, uploadDate: undefined } : d))
    );
    showToast(`${doc.name} removed.`, 'info');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Document Checklist</h2>
        <p className="text-sm text-navy-300">Track and manage your loan application documents</p>
      </div>

      {/* Progress */}
      <Card>
        <CardBody className="pt-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-white">Required Documents Progress</p>
              <p className="text-xs text-navy-300">{requiredUploaded} of {requiredCount} required documents uploaded</p>
            </div>
            <span className="text-2xl font-bold text-accent-400">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-navy-600/50 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-4 mt-3 text-xs">
            <span className="text-navy-300">Total: <span className="text-white font-medium">{documents.length}</span></span>
            <span className="text-green-400">Uploaded: <span className="font-medium">{uploadedCount}</span></span>
            <span className="text-orange-400">Pending: <span className="font-medium">{documents.length - uploadedCount}</span></span>
          </div>
        </CardBody>
      </Card>

      {/* Disclaimer */}
      <div className="rounded-xl bg-navy-700/40 border border-navy-500/20 px-4 py-3 flex gap-3">
        <Info className="h-4 w-4 text-navy-300 shrink-0 mt-0.5" />
        <p className="text-xs text-navy-300">
          Document uploads are for demonstration only. Do not upload sensitive personal documents unless proper secure storage is configured.
        </p>
      </div>

      {/* Documents by category */}
      {categories.map((category) => {
        const docs = documents.filter((d) => d.category === category);
        return (
          <div key={category}>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-accent-400" />
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {docs.map((doc) => (
                <Card key={doc.id} className="hover:border-accent-400/30 transition-colors">
                  <CardBody className="pt-4 flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg shrink-0 ${doc.uploaded ? 'bg-green-500/15 text-green-400' : 'bg-navy-600/50 text-navy-300'}`}>
                      {doc.uploaded ? <CheckCircle2 className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {doc.required ? (
                          <Badge variant="warning">Required</Badge>
                        ) : (
                          <Badge variant="neutral">Optional</Badge>
                        )}
                        {doc.uploaded ? (
                          <Badge variant="success">Uploaded</Badge>
                        ) : (
                          <Badge variant="error">Pending</Badge>
                        )}
                      </div>
                      {doc.uploadDate && (
                        <p className="text-[10px] text-navy-400 mt-1">Uploaded: {doc.uploadDate}</p>
                      )}
                    </div>
                    {doc.uploaded ? (
                      <Button size="sm" variant="ghost" onClick={() => handleRemove(doc)}>
                        Remove
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => setUploadTarget(doc)}>
                        <Upload className="h-3.5 w-3.5" />
                        Upload
                      </Button>
                    )}
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* Upload modal */}
      {uploadTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setUploadTarget(null)}>
          <Card className="w-full max-w-md" >
            <div className="flex items-center justify-between px-5 py-4 border-b border-navy-600/40">
              <h3 className="text-base font-bold text-white">Upload Document</h3>
              <button onClick={() => setUploadTarget(null)} className="text-navy-300 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <CardBody className="space-y-4" >
              <p className="text-sm text-navy-200">Upload: <span className="font-semibold text-white">{uploadTarget.name}</span></p>
              <div className="border-2 border-dashed border-navy-500/40 rounded-xl p-8 text-center">
                <Upload className="h-10 w-10 text-navy-300 mx-auto mb-3" />
                <p className="text-sm text-navy-200 mb-1">Click to select a file</p>
                <p className="text-xs text-navy-400">or drag and drop</p>
              </div>
              <div className="rounded-lg bg-orange-500/10 border border-orange-500/30 px-3 py-2">
                <p className="text-xs text-orange-200">Demo upload — no actual file will be stored.</p>
              </div>
              <Button className="w-full" onClick={() => handleUpload(uploadTarget)}>
                <CheckCircle2 className="h-4 w-4" />
                Confirm Upload
              </Button>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}

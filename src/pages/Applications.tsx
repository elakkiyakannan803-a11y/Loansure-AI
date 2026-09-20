import { useState } from 'react';
import { FileText, ChevronRight, X, Calendar, Percent, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { formatINR } from '@/lib/eligibility';
import { demoApplications } from '@/data/demoData';
import type { LoanApplication } from '@/types';

const statusColors: Record<string, string> = {
  'Draft': 'border-navy-400/40',
  'Submitted': 'border-accent-500/40',
  'Under Review': 'border-accent-500/40',
  'Documents Required': 'border-orange-500/40',
  'Approved': 'border-green-500/40',
  'Rejected': 'border-red-500/40',
};

export default function Applications() {
  const [selected, setSelected] = useState<LoanApplication | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">My Applications</h2>
        <p className="text-sm text-navy-300">Track the status of your loan applications</p>
      </div>

      {demoApplications.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-navy-600/50">
            <FileText className="h-7 w-7 text-navy-300" />
          </div>
          <h3 className="text-base font-semibold text-white mb-1">No Applications Yet</h3>
          <p className="text-sm text-navy-300 text-center">When you submit loan applications, they'll appear here.</p>
        </Card>
      ) : (
        <>
          {/* Desktop table */}
          <Card className="hidden lg:block overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-600/40">
                    <th className="text-left text-xs font-semibold text-navy-300 px-5 py-3">Application ID</th>
                    <th className="text-left text-xs font-semibold text-navy-300 px-5 py-3">Loan Type</th>
                    <th className="text-left text-xs font-semibold text-navy-300 px-5 py-3">Lender</th>
                    <th className="text-left text-xs font-semibold text-navy-300 px-5 py-3">Amount</th>
                    <th className="text-left text-xs font-semibold text-navy-300 px-5 py-3">Date</th>
                    <th className="text-left text-xs font-semibold text-navy-300 px-5 py-3">Status</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {demoApplications.map((app) => (
                    <tr key={app.id} className="border-b border-navy-600/20 hover:bg-navy-600/20 transition-colors">
                      <td className="px-5 py-3.5 text-sm text-white font-mono">{app.id}</td>
                      <td className="px-5 py-3.5 text-sm text-navy-100">{app.loanType}</td>
                      <td className="px-5 py-3.5 text-sm text-navy-100">{app.lender}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-white">{formatINR(app.requestedAmount)}</td>
                      <td className="px-5 py-3.5 text-sm text-navy-300">{app.applicationDate}</td>
                      <td className="px-5 py-3.5"><StatusBadge status={app.status} /></td>
                      <td className="px-5 py-3.5">
                        <button onClick={() => setSelected(app)} className="text-accent-400 hover:text-accent-300">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-3">
            {demoApplications.map((app) => (
              <Card key={app.id} className={`border-l-4 ${statusColors[app.status] || ''}`}>
                <CardBody className="pt-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-mono text-navy-300">{app.id}</p>
                      <p className="text-sm font-semibold text-white mt-0.5">{app.loanType}</p>
                      <p className="text-xs text-navy-300">{app.lender}</p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{formatINR(app.requestedAmount)}</span>
                    <Button size="sm" variant="ghost" onClick={() => setSelected(app)}>
                      View <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <p className="text-xs text-navy-400 mt-2">{app.applicationDate}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setSelected(null)}>
          <Card className="w-full max-w-lg max-h-[85vh] overflow-y-auto scrollbar-thin" >
            <div className="flex items-center justify-between px-5 py-4 border-b border-navy-600/40" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-base font-bold text-white">Application Details</h3>
              <button onClick={() => setSelected(null)} className="text-navy-300 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <CardBody className="space-y-4" >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-navy-300">Application ID</p>
                  <p className="text-sm font-mono text-white">{selected.id}</p>
                </div>
                <StatusBadge status={selected.status} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-navy-800/50 p-3">
                  <p className="text-[10px] text-navy-300">Loan Type</p>
                  <p className="text-sm font-semibold text-white">{selected.loanType}</p>
                </div>
                <div className="rounded-lg bg-navy-800/50 p-3">
                  <p className="text-[10px] text-navy-300">Lender</p>
                  <p className="text-sm font-semibold text-white">{selected.lender}</p>
                </div>
                <div className="rounded-lg bg-navy-800/50 p-3">
                  <p className="text-[10px] text-navy-300">Requested Amount</p>
                  <p className="text-sm font-semibold text-white">{formatINR(selected.requestedAmount)}</p>
                </div>
                <div className="rounded-lg bg-navy-800/50 p-3">
                  <p className="text-[10px] text-navy-300">Interest Rate</p>
                  <p className="text-sm font-semibold text-white">{selected.interestRate}% p.a.</p>
                </div>
                <div className="rounded-lg bg-navy-800/50 p-3">
                  <p className="text-[10px] text-navy-300 flex items-center gap-1"><Calendar className="h-3 w-3" /> Date</p>
                  <p className="text-sm font-semibold text-white">{selected.applicationDate}</p>
                </div>
                <div className="rounded-lg bg-navy-800/50 p-3">
                  <p className="text-[10px] text-navy-300 flex items-center gap-1"><Clock className="h-3 w-3" /> Tenure</p>
                  <p className="text-sm font-semibold text-white">{selected.tenure} months</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-white mb-3">Status Timeline</p>
                <div className="space-y-2">
                  {['Draft', 'Submitted', 'Under Review', 'Documents Required', 'Approved', 'Rejected'].map((s, i) => {
                    const reached = ['Draft', 'Submitted', 'Under Review', 'Documents Required', 'Approved', 'Rejected'].indexOf(selected.status) >= i;
                    return (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${reached ? 'bg-accent-400' : 'bg-navy-600'}`} />
                        <span className={`text-xs ${reached ? 'text-white' : 'text-navy-400'}`}>{s}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}

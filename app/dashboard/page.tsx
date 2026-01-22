import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/common/PageHeader';
import Card from '@/components/common/Card';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Dashboard"
        description="Welcome to your dashboard overview"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-xs font-semibold mb-2 font-heading uppercase tracking-wider text-slate-500">Total Organizations</h3>
          <p className="text-2xl font-bold tracking-tight text-blue-600">0</p>
        </Card>
        
        <Card>
          <h3 className="text-xs font-semibold mb-2 font-heading uppercase tracking-wider text-slate-500">Active Users</h3>
          <p className="text-2xl font-bold tracking-tight text-green-600">0</p>
        </Card>
        
        <Card>
          <h3 className="text-xs font-semibold mb-2 font-heading uppercase tracking-wider text-slate-500">Reports Generated</h3>
          <p className="text-2xl font-bold tracking-tight text-purple-600">0</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}

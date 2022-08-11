import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { useGetEntities } from 'src/hooks/api/ngsi-ld/useGetEntities';

function RecentOrders() {
  const { data, loading, error, refresh } = useGetEntities<any>("Asset", "http://context/ngsi-context.jsonld")

  return (
    <Card>
      <RecentOrdersTable assets={data} />
    </Card>
  );
}

export default RecentOrders;

import { FC, ChangeEvent, useState } from 'react';
import {
  Divider,
  Card,
  CardHeader
} from '@mui/material';
import { SmartDataModelsXXXdataModelXXXSchema } from 'src/models/SmartDataModelsXXXdataModelXXXSchema ';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';

interface RecentOrdersTableProps {
  className?: string;
  assets: SmartDataModelsXXXdataModelXXXSchema[];
}


const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ assets }) => {

  const navigate = useNavigate();

  const columns: GridColDef<SmartDataModelsXXXdataModelXXXSchema>[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2
    },
    {
      field: 'owner',
      headerName: 'Owner',
      flex: 1
    },
  ]
  return (
    <Card style={{ height: 400, width: '100%' }}>
      <CardHeader title="Assets" />
      <Divider />
      <DataGrid rows={assets} pageSize={5} rowsPerPageOptions={[5]} columns={columns} onRowClick={(params) => {
        navigate(`./${params.id}`)
        console.log(params)
      }} />
    </Card>
  )
};

export default RecentOrdersTable;

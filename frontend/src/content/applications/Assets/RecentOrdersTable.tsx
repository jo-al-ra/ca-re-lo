import { FC, ChangeEvent, useState } from 'react';
import {
  Divider,
  Card,
  CardHeader
} from '@mui/material';
import { BaseModel } from 'src/models/BaseModel';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';

interface RecentOrdersTableProps {
  className?: string;
  assets: BaseModel[];
}


const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ assets }) => {

  const navigate = useNavigate();

  const columns: GridColDef<BaseModel>[] = [
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
    <Card style={{ width: '100%' }}>
      <CardHeader title="Assets" />
      <Divider />
      <DataGrid
        autoHeight
        rows={assets}
        pageSize={5}
        rowsPerPageOptions={[5]}
        columns={columns}
        onRowClick={(params) => {
          navigate(`./${params.id}`)
        }} />
    </Card >
  )
};

export default RecentOrdersTable;

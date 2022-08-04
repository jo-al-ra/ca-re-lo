import { FC } from 'react';
import {
    Divider,
    Card,
    CardHeader
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { Asset } from 'src/models/Asset';

interface RecentOrdersTableProps {
    className?: string;
    assets: Asset[];
}


const EnergyDataGrid: FC<RecentOrdersTableProps> = ({ assets }) => {

    const navigate = useNavigate();

    const columns: GridColDef<Asset>[] = [
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
            <CardHeader title="Energy" />
            <Divider />
            <DataGrid
                autoHeight
                rows={assets}
                pageSize={5}
                rowsPerPageOptions={[5]}
                columns={columns}
                onRowClick={(params) => {
                    navigate(`/carelo/canvas?id=${params.row.id}`)
                }} />
        </Card >
    )
};

export default EnergyDataGrid;

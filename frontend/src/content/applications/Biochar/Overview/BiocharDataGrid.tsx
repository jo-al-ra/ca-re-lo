import { FC } from 'react';
import {
    Divider,
    Card,
    CardHeader
} from '@mui/material';
import { BaseModel } from 'src/models/BaseModel';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { Asset } from 'src/models/Asset';
import EntityOverviewPageHeader from 'src/components/PageHeaders/EntityOverviewPageHeader';

interface RecentOrdersTableProps {
    className?: string;
    assets: Asset[];
}


const BiocharDataGrid: FC<RecentOrdersTableProps> = ({ assets }) => {

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
            <EntityOverviewPageHeader
                categoryDescription='Biochar is a solid material created via a thermochemical conversion of biomass with limited presence of oxygen. It can be used as a renewable fuel or to sequester carbon.'
                entityCategory='Biochar'
                image="/static/images/entities/Biochar_2.jpg"
            />
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

export default BiocharDataGrid;

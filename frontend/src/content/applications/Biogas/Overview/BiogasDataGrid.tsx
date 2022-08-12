import { FC } from 'react';
import {
    Card,
} from '@mui/material';
import { BaseModel } from 'src/models/BaseModel';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { Asset } from 'src/models/Asset';
import EntityOverviewCardHeader from 'src/components/CardHeaders/EntityOverviewCardHeader';

interface RecentOrdersTableProps {
    className?: string;
    assets: Asset[];
}


const BiogasDataGrid: FC<RecentOrdersTableProps> = ({ assets }) => {

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
            <EntityOverviewCardHeader
                categoryId='biogas'
                categoryDescription='Biogas is a mixture of gases produced from organic matter, which can be used as fuel.'
                entityCategory='Biogas'
                image="/static/images/entities/Biogas.jpg"
            />
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

export default BiogasDataGrid;

import { FC } from 'react';
import {
    Card,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { Asset } from 'src/models/Asset';
import EntityOverviewCardHeader from 'src/components/CardHeaders/EntityOverviewCardHeader';

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
            <EntityOverviewCardHeader
                categoryId='energy'
                entityCategory='Energy'
                image="/static/images/entities/Energy.jpg"
                categoryDescription='An energy source is almost always required to perform activities. Energy can have various forms such as electrical, thermal or chemical energy.'
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

export default EnergyDataGrid;

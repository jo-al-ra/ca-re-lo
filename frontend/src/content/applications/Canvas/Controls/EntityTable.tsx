import { FC, useState, useEffect } from 'react';
import { BaseModel } from 'src/models/BaseModel';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetEntitiesByQuery } from 'src/hooks/api/ngsi-ld/useGetEntitiesByQuery';

interface EntityTableProps {
    className?: string;
    onSelectRow: (entityId) => void
}

const columns: GridColDef<BaseModel>[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: "dateModified", headerName: "last modified", flex: 1 },
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
]

const EntityTable: FC<EntityTableProps> = ({ onSelectRow }) => {
    const loadDataCallback = useGetEntitiesByQuery();
    useEffect(() => {
        loadDataCallback.makeRequest({
            linkHeader: "http://context/ngsi-context.jsonld",
            keyValues: true,
            query: `owner=="urn:ngsi-ld:Actor:Jonathan"`,
        })
            .then(res => setData(res))
    }, []
    )

    const [data, setData] = useState([])


    return (
        <DataGrid
            autoHeight
            rows={data}
            pageSize={5}
            rowsPerPageOptions={[5]}
            columns={columns}
            onRowClick={(params) => {
                onSelectRow(params.id)
            }} />
    )
};

export default EntityTable;

import { useGetEntitiesByQuery } from 'src/hooks/api/ngsi-ld/useGetEntitiesByQuery';
import { FC, useEffect, useState } from 'react';
import { Asset } from 'src/models/Asset';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { ActivityCategory } from './config';
import { Box, CardHeader, Divider } from '@mui/material';
import EntityOverviewCardHeader from 'src/components/CardHeaders/EntityOverviewCardHeader';
import { categories } from 'src/config/categories';


export interface PickableInputTablesProps {
    category: ActivityCategory;
    onChange: (inputIds: string[], sufficientInputs: boolean) => void;
}


const PickableInputTables: FC<PickableInputTablesProps> = ({ category, onChange }) => {
    const { makeRequest, loading, error, responseStatus } = useGetEntitiesByQuery()
    const initialEmptyState = category.inputs.reduce((acc, current) => {
        const ac = { ...acc }
        ac[`${current.category}`] = []
        return ac
    }, {})
    const [assets, setAssets] = useState<{ [input: string]: Asset[] }>(initialEmptyState)
    const web3 = useWeb3MetaMask();
    const [selectionModel, setSelectionModel] = useState<{ [input: string]: GridSelectionModel }>(initialEmptyState);
    console.log(selectionModel)

    const loadAvailableInputs = (inputs, name) => {
        Promise.all(inputs.map(async input => {
            const query = `category=="${input.category}";owner=="${name}";!consumedVia`
            const possibleInputs = await makeRequest({
                linkHeader: process.env.REACT_APP_CARELO_NGSI_CONTEXT ?? "http://context/ngsi-context.jsonld",
                keyValues: true,
                query: query,
                type: input.type
            });
            let response = {}
            response[input.category] = possibleInputs
            return response
        }))
            .then(values => {
                setAssets(values
                    .reduce((acc, current) => ({ ...acc, ...current }))
                )
            }
            )
    }

    useEffect(() => {
        loadAvailableInputs(category.inputs, web3.name !== "Unnamed User" ? web3.name : web3.account)
    }, [web3.active, web3.account, web3.name])

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

    const renderInputTable = (inputType) => {
        return (<Box pt={2}>
            <EntityOverviewCardHeader
                categoryId={inputType.category}
                categoryDescription={categories[inputType.category].description}
                entityCategory={categories[inputType.category]?.categoryName}
                image={categories[inputType.category]?.image}

            />
            <DataGrid
                key={"data-grid-input-category" + inputType.category}
                autoHeight
                rows={assets[inputType.category]}
                pageSize={5}
                rowsPerPageOptions={[5]}
                columns={columns}
                checkboxSelection
                onSelectionModelChange={(selection) => {
                    const newSelection = { ...selectionModel }
                    newSelection[inputType.category] = selection
                    setSelectionModel(newSelection)
                    const keys = Object.keys(newSelection)
                    const sufficientInputs = keys.every(key => newSelection[key].length > 0)
                    console.log(sufficientInputs)
                    onChange(keys.reduce((acc, key) => {
                        return [...acc, ...newSelection[key]]
                    }, []), sufficientInputs)
                }}
                selectionModel={selectionModel[inputType.category]}
            />
        </Box>
        )
    }

    return (
        <>
            {category.inputs.map(input => renderInputTable(input))}
        </>
    );
}

export default PickableInputTables;

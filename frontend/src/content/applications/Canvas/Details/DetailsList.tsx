import { Box, Grid, Typography } from "@mui/material"
import { FC } from "react"
import Text from "src/components/Text"

export interface DetailsListProps {
    keyValuesObject: any;
    loading: boolean;
}

const DetailsList: FC<DetailsListProps> = ({ keyValuesObject, loading }) => {

    if (loading || !keyValuesObject) {
        return <Text>loading</Text>
    }

    const listedProperties = [
        "id",
        "type",
        "name",
        "alternateName",
        "category",
        "description",
        "dateCreated",
        "dateModified",
        "dataProvider",
        "owner",
        "source",
        "seeAlso"]
    const listedRelationships = ["producedVia", "consumedVia"]

    const renderProperty = (keyValuesObject, key) => {
        return (
            <>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                        {key}:
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                        <b>{keyValuesObject[key] ?? "not defined"}</b>
                    </Text>
                </Grid>
            </>)
    }

    const renderRelationship = (keyValuesObject, key) => {
        return (
            <>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                        {key}:
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                    <Text color="info">
                        <b>{keyValuesObject[key] ?? "not defined"}</b>
                    </Text>
                </Grid>
            </>)
    }

    return (
        <Typography variant="subtitle2">
            <Grid container spacing={0}>
                {listedProperties.map(key => renderProperty(keyValuesObject, key))}
                {listedRelationships.map(key => renderRelationship(keyValuesObject, key))}
            </Grid>
        </Typography>
    )

}

export default DetailsList
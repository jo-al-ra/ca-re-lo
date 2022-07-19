import { Box, Grid, Typography } from "@mui/material"
import { FC } from "react"
import Text from "src/components/Text"
import { detailsCardConfig } from "./config";

export interface DetailsListProps {
    keyValuesObject: any;
    loading: boolean;
    hideUndefined: boolean;
    CustomSection: () => JSX.Element;
}

const DetailsCardContent: FC<DetailsListProps> = ({ keyValuesObject, loading, hideUndefined, CustomSection }) => {

    if (loading || !keyValuesObject) {
        return <Text>loading</Text>
    }

    const shouldHideUndefined = (keyValuesObject, key) => {
        return (hideUndefined && !keyValuesObject[key])
    }

    const renderProperty = (keyValuesObject, key) => {
        if (shouldHideUndefined(keyValuesObject, key)) {
            return undefined
        }
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
        if (shouldHideUndefined(keyValuesObject, key)) {
            return undefined
        }
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
                {detailsCardConfig[keyValuesObject.type].listedProperties.map(key => renderProperty(keyValuesObject, key))}
                {detailsCardConfig[keyValuesObject.type].listedRelationships.map(key => renderRelationship(keyValuesObject, key))}
                <CustomSection />
            </Grid>
        </Typography>
    )

}

export default DetailsCardContent
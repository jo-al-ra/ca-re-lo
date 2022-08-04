import { Box, Grid, Typography } from "@mui/material"
import { FC } from "react"
import Text from "src/components/Text"
import { detailsCardConfig, DetailsCardConfigItem } from "./config";

export interface DetailsListProps {
    keyValuesObject: any;
    loading: boolean;
    hideUndefined: boolean;
    customSection?: JSX.Element;
    config?: DetailsCardConfigItem
}

const DetailsCardContent: FC<DetailsListProps> = ({ keyValuesObject, loading, hideUndefined, customSection, config }) => {

    if (loading || !keyValuesObject) {
        return <Text>loading</Text>
    }

    const usedConfig = config ? config : detailsCardConfig[keyValuesObject.type]

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
                {usedConfig.listedProperties.map(key => renderProperty(keyValuesObject, key))}
                {usedConfig.listedRelationships.map(key => renderRelationship(keyValuesObject, key))}
                {customSection}
            </Grid>
        </Typography>
    )

}

export default DetailsCardContent
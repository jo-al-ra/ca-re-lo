import { Container } from '@mui/material';
import { FC } from 'react';
import { Asset } from 'src/models/Asset';
import { ActivityCategory, ActivityCategoryOutput } from '../config';
import SingleOutput from './SingleOutput';


export interface CreateOutputsProps {
    category: ActivityCategory;
    activityId: string;
    /**
     * asset in NGSI-LD format
     */
    onSubmit: (ngsiLdObject: any, output: ActivityCategoryOutput) => void;
}

const CreateOutputs: FC<CreateOutputsProps> = ({ category, activityId, onSubmit }) => {

    return (
        <>
            <Container maxWidth="lg">
                {category.outputs.map(output => <SingleOutput activityId={activityId} onSubmit={onSubmit} output={output} />)}
            </Container>
        </>
    );
}

export default CreateOutputs;

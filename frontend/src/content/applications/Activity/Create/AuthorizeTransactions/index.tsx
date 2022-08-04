import { Divider, List } from "@mui/material"
import { FC } from "react";
import CreateActivityTransaction from "./CreateActivityTransaction";
import CreateOutput from "./CreateOutput";
import UpdateInput from "./UpdateInput";

export interface AuthorizeTransactionsProps {
    inputIds: string[];
    activityId: string;
    outputs: any[];
    category: string;
}

const AuthorizeTransactions: FC<AuthorizeTransactionsProps> = ({ inputIds, activityId, outputs, category }) => {

    return (<>
        <List>
            {inputIds.map((inputId) => <UpdateInput inputId={inputId} activityId={activityId} relationshipName="consumedVia" />)}
            <Divider />
            <CreateActivityTransaction activityId={activityId} inputIds={inputIds} category={category} outputIds={outputs.map(output => output.id)} />
            <Divider />
            {outputs.map((output) => <CreateOutput output={output} />)}
        </List>

    </>)
}

export default AuthorizeTransactions
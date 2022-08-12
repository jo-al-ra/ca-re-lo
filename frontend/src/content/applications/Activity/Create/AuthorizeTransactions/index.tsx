import { Divider, List } from "@mui/material"
import { FC, useState } from "react";
import CreateActivityTransaction from "./CreateActivityTransaction";
import CreateOutput from "./CreateOutput";
import UpdateInput from "./UpdateInput";

export interface AuthorizeTransactionsProps {
    inputIds: string[];
    activityId: string;
    outputs: any[];
    category: string;
    onAllAuthorized: () => void;
}

const AuthorizeTransactions: FC<AuthorizeTransactionsProps> = ({ inputIds, activityId, outputs, category, onAllAuthorized }) => {

    const [remainingTransactions, setRemainingTransactions] = useState(inputIds.length + outputs.length + 1)
    const onSubmitted = () => {
        if (remainingTransactions <= 1) {
            onAllAuthorized()
        }
        setRemainingTransactions(remainingTransactions - 1)
    }

    return (<>
        <List>
            {inputIds.map((inputId) => <UpdateInput inputId={inputId} activityId={activityId} relationshipName="consumedVia" onSuccess={onSubmitted} />)}
            <Divider />
            <CreateActivityTransaction
                activityId={activityId}
                inputIds={inputIds}
                category={category}
                outputIds={outputs.map(output => output.id)}
                onSuccess={onSubmitted}
            />
            <Divider />
            {outputs.map((output) => <CreateOutput
                output={output}
                onSuccess={onSubmitted}
            />)}
        </List>

    </>)
}

export default AuthorizeTransactions
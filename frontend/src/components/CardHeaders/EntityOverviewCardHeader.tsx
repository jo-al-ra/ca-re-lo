import { CardMedia, Button, CardHeader } from '@mui/material';
import { FC } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';

interface PageHeaderProps {
    className?: string;
    entityCategory: string;
    image: string;
    categoryDescription: string
}


const EntityOverviewPageHeader: FC<PageHeaderProps> = (props) => {
    const web3 = useWeb3MetaMask()
    const navigate = useNavigate()

    const loggedInSubtitle = `${web3.name}, below are ${props.entityCategory} entities owned by you. New entities can be created directly using the button. However, it is recommended to create new entities by selecting the inputs first and creating an activity.`
    const loggedOutSubtitle = `Below are all publicly available ${props.entityCategory} entities. Login to filter the view or create new ones`

    const subtitle = web3.active ? loggedInSubtitle : loggedOutSubtitle

    return (
        <>
            <CardMedia
                image={props.image}
                sx={{ height: 180 }}
            />
            <CardHeader
                title={`${props.entityCategory} Entities`}
                subheader={props.categoryDescription}
                action={
                    web3.active ? (
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<AddTwoToneIcon fontSize="small" />}
                            onClick={() => {
                                navigate("create")
                            }}
                            disabled={!web3.active}
                        >
                            {`Create ${props.entityCategory}`}
                        </Button>
                    ) : undefined
                }>

            </CardHeader>
        </>
    );
}

export default EntityOverviewPageHeader;

import {
    Box,
    Card,
    Typography,
    Container,
    Button,
    FormControl,
    OutlinedInput,
    InputAdornment
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const MainContent = styled(Box)(
    ({ theme }) => `
      height: 100%;
      display: flex;
      flex: 1;
      overflow: auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `
);

const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
  `
);

const ButtonSearch = styled(Button)(
    ({ theme }) => `
      margin-right: -${theme.spacing(1)};
  `
);


const EmptyCanvas = () => {
    const [value, setValue] = useState<string>()
    const [searchParams, setSearchParams] = useSearchParams()
    return (
        <MainContent>
            <Container maxWidth="md">
                <Box textAlign="center">
                    <img height={300} src="/static/images/Canvas.jpg" />
                    <Typography variant="h2" sx={{ my: 2 }}>
                        Welcome to the canvas. The core of CaReLo.
                    </Typography>
                    <Typography
                        variant="h4"
                        color="text.secondary"
                        fontWeight="normal"
                        sx={{ mb: 4 }}
                    >
                        The canvas provides you all the neccessary information you need to get a trustworthy view of the provenance of carbon removal credits. You can start browsing by entering the id of the asset below or by picking an asset from the listed categories on the left.
                    </Typography>
                </Box>
                <Container maxWidth="sm">
                    <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
                        <FormControl variant="outlined" fullWidth>
                            <OutlinedInputWrapper
                                type="text"
                                placeholder="Enter the id here..."
                                value={value}
                                onChange={(event) => setValue(event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <ButtonSearch variant="contained" size="small" onClick={() => {
                                            setSearchParams({ id: value })
                                        }}>
                                            Search
                                        </ButtonSearch>
                                    </InputAdornment>
                                }
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchTwoToneIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Card>
                </Container>
            </Container>
        </MainContent>
    )
}

export default EmptyCanvas
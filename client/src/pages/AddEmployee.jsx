import {Alert, Box, styled} from '@mui/material';

const Wrapper = styled(Box)({
    display: 'flex',
    padding: 50
});

const Container = styled(Box)({
    margin: '0 50px',
    '& > *': {
        marginBottom: '20px !important'
    }
})

const AddEmployee = () => {

    return (
        <Wrapper>
            <Container>
              <Alert severity="warning">A venir</Alert>
            </Container>
        </Wrapper>
    )
}

export default AddEmployee;
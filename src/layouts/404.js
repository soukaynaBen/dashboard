import { Box, Typography } from "@material-ui/core"

function ErrorPage() {
    return (
    <Box style={{ display: 'flex',width:'100%',height:'100% ',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
        <Typography style={{padding:'.5rem'}} variant="h3" color="primary">Oooooops, 404 Error!!</Typography>
    </Box>
    )
}

export default ErrorPage

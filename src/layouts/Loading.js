import { CircularProgress,Box } from "@material-ui/core"

function Loading() {
    return (
     <Box style={{ display: 'flex',position:"absolute",left:'50%', top:'50%',transform:'translate(-50%,-100%)' }}>
      <CircularProgress style={{width:'4rem',height:'4rem'}}/>
    </Box>
)
}

export default Loading

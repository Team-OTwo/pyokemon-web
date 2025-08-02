import { Button } from "@mui/material"
import { FallbackProps } from "react-error-boundary"
import { Link } from "react-router"
import styled from "styled-components"

const Box = styled.div`
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
`

function RootError({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Box>
      {/* <ErrorTitle>Error</ErrorTitle>
      <ErrorMessage>{error.message}</ErrorMessage>
      <ButtonBox>
        <Button onClick={resetErrorBoundary} variant="secondary">
          Try again
        </Button>
        <Button component={Link} to="/" variant="link">
          Go to home
        </Button>
      </ButtonBox> */}
    </Box>
  )
}

export default RootError

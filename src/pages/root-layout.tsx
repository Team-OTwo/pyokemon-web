import { Box } from "@mui/material"
import { ErrorBoundary } from "react-error-boundary"
import { Outlet } from "react-router"

import Footer from "@/components/footer"
import Header from "@/components/header"

import ErrorPage from "./error-page"

function RootLayout() {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          minHeight: "100svh",
          minWidth: "var(--container-width)",
        }}
      >
        <Header />
        <Outlet />
        <Footer />
      </Box>
    </ErrorBoundary>
  )
}

export default RootLayout

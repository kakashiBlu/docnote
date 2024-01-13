import { Container, Grid } from "@mantine/core"
import { useRecoilValue } from "recoil"
import { showTutorialState } from "storage/state/Dashboard"
import AccountOverview from "./AccountOverview"
import OntologyTable from "./OntologyTable"
import WorkspaceTable from "./WorkspaceTable"
import Steps from "./Steps"

function Dashboard() {
  const showTutorial = useRecoilValue(showTutorialState)

  return (
    <>
      <Container my="md" size="xl">
        <Grid>
          {showTutorial && 
            <Grid.Col  xs={12}>
              <AccountOverview />
            </Grid.Col>
          }
          <Grid.Col  xs={4}>
              <Steps />
          </Grid.Col>
          {/* <Grid.Col xs={12} md={6}>
            <WorkspaceTable />
          </Grid.Col> */}
          <Grid.Col  xs={8}>
            <WorkspaceTable />
          </Grid.Col>

          {/* <Grid.Col xs={12} md={6}>
            <OntologyTable />
          </Grid.Col> */}
        </Grid>
      </Container>
    </>
  )
}

export default Dashboard

import { Card, Checkbox, Anchor, createStyles, Text, Group } from "@mantine/core"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import { tutorialProgressState } from "storage/state/Dashboard"
import { Path } from "utils/Path"
import { Accordion, Container, Title } from "@mantine/core"
import { IconStar } from "@tabler/icons"
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  item: {
    "& + &": {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },
  },

  switch: {
    "& *": {
      cursor: "pointer",
    },
  },

  title: {
    lineHeight: 1,
  },
}))



function Steps() {
  const { classes } = useStyles()

  const [tutorialProgress, setTutorialProgress] = useRecoilState(tutorialProgressState)

  return (
    <Container size="sm">
      <Title
        order={2}
        size="h1"
        weight={900}
      >
        Steps
      </Title>

      <Accordion variant="filled" mt="xl">
        <Accordion.Item value="foss">
          <Accordion.Control>
            Create Workspace
          </Accordion.Control>

          <Accordion.Panel>
            Click on the button.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="data-safety">
          <Accordion.Control>
            Give name and description
          </Accordion.Control>

          <Accordion.Panel>
            name and relevant description
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="project-support">
          <Accordion.Control>
            click annotate button
          </Accordion.Control>

          <Accordion.Panel>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    
</Container >
  )
}



export default Steps

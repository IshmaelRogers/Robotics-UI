// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";

// Images
import AdobeXD from "examples/Icons/AdobeXD";
import Atlassian from "examples/Icons/Atlassian";
import Slack from "examples/Icons/Slack";
import Spotify from "examples/Icons/Spotify";
import Jira from "examples/Icons/Jira";
import Invision from "examples/Icons/Invision";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <VuiAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { dark } }) =>
              `${borderWidth[2]} solid ${dark.focus}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "Divers", align: "left" },
      { name: "Rank", align: "left" },
      { name: "O2", align: "center" },
      { name: "BMI", align: "center" },
    ],

    rows: [
      {
        Divers: (
          <VuiBox display="flex" alignItems="center">
            <AdobeXD size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Castel, Martin
            </VuiTypography>
          </VuiBox>
        ),
        Rank: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar1, "Ryan Tompson"],
              [avatar2, "Romina Hadid"],
              [avatar3, "Alexander Smith"],
              [avatar4, "Jessica Doe"],
            ])}
          </VuiBox>
        ),
        O2: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            $14,000
          </VuiTypography>
        ),
        BMI: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              60%
            </VuiTypography>
            <VuiProgress value={60} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        Divers: (
          <VuiBox display="flex" alignItems="center">
            <Atlassian size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Foster, Jane
            </VuiTypography>
          </VuiBox>
        ),
        Rank: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar2, "Romina Hadid"],
              [avatar4, "Jessica Doe"],
            ])}
          </VuiBox>
        ),
        O2: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            $3,000
          </VuiTypography>
        ),
        BMI: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              10%
            </VuiTypography>
            <VuiProgress value={10} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        Divers: (
          <VuiBox display="flex" alignItems="center">
            <Slack size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Stark, Tony
            </VuiTypography>
          </VuiBox>
        ),
        Rank: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar1, "Ryan Tompson"],
              [avatar3, "Alexander Smith"],
            ])}
          </VuiBox>
        ),
        O2: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            Not set
          </VuiTypography>
        ),
        BMI: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              100%
            </VuiTypography>
            <VuiProgress value={100} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        Divers: (
          <VuiBox display="flex" alignItems="center">
            <Spotify size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Maximoff, Wanda
            </VuiTypography>
          </VuiBox>
        ),
        Rank: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar4, "Jessica Doe"],
              [avatar3, "Alexander Smith"],
              [avatar2, "Romina Hadid"],
              [avatar1, "Ryan Tompson"],
            ])}
          </VuiBox>
        ),
        O2: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            $20,500
          </VuiTypography>
        ),
        BMI: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              100%
            </VuiTypography>
            <VuiProgress value={100} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        Divers: (
          <VuiBox display="flex" alignItems="center">
            <Jira size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Jane, Mary
            </VuiTypography>
          </VuiBox>
        ),
        Rank: (
          <VuiBox display="flex" py={1}>
            {avatars([[avatar4, "Jessica Doe"]])}
          </VuiBox>
        ),
        O2: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            $500
          </VuiTypography>
        ),
        BMI: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              25%
            </VuiTypography>
            <VuiProgress value={25} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        Divers: (
          <VuiBox display="flex" alignItems="center">
            <Invision size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Doe, John
            </VuiTypography>
          </VuiBox>
        ),
        Rank: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar1, "Ryan Tompson"],
              [avatar4, "Jessica Doe"],
            ])}
          </VuiBox>
        ),
        O2: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            $2,000
          </VuiTypography>
        ),
        BMI: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              40%
            </VuiTypography>
            <VuiProgress value={40} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
    ],
  };
}

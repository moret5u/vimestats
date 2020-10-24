import { FunctionComponent } from "react";
import { Typography, Grid, Divider, Box } from "@material-ui/core";
import { KDR } from "../../../CustomRows";
import { IKitPvp } from "vime-types/models/Stats";

type Props = Omit<IKitPvp, "season">;

const KitPVP: FunctionComponent<Props> = ({ global }) => (
  <Grid container direction="row">
    <Grid item xs={12}>
      <Typography>
        <strong>Очков:</strong> {global["points"]}
      </Typography>

      <Box my={2}>
        <Divider />
      </Box>

      <Typography>
        <strong>Убийств:</strong> {global["kills"]}
      </Typography>
      <Typography>
        <strong>Смертей:</strong> {global["deaths"]}
      </Typography>
      <KDR kills={global["kills"]} deaths={global["deaths"]} />
    </Grid>
  </Grid>
);

export default KitPVP;
import { FunctionComponent } from "react";
import { Typography, Grid, Divider, Box } from "@material-ui/core";
import { WLR } from "../../../CustomRows";
import { IBlockParty } from "vime-types/models/Stats";

type Props = Omit<IBlockParty, "season">;

const BlockParty: FunctionComponent<Props> = ({ global }) => {
  const { games, wins, levels } = global;

  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Typography>
          <strong>Игр сыграно:</strong> {games}
        </Typography>
        <Typography>
          <strong>Побед:</strong> {wins}
        </Typography>
        <WLR wins={wins} total={games} />

        <Box my={2}>
          <Divider />
        </Box>

        <Typography>
          <strong>Выиграно уровней:</strong> {levels}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default BlockParty;
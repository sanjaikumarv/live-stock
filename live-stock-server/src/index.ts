import { port } from "./config/env";
import app from "./config/express";

app.listen(port, () => {
  console.log(`Our app listening on port ${port}`);
});

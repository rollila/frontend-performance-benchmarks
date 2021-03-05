import { exec } from "child_process";
import frameworks from "./frameworks.js";

frameworks.forEach((framework) => {
  exec(
    `serve -s ${framework.path} -l ${framework.port}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        return;
      }
      if (stderr) {
        console.error(stderr);
        return;
      }
      console.log(stdout);
    }
  );
});

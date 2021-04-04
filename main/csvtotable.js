import Papa from "papaparse";
import * as fs from "fs";
import _ from "lodash";

const files = [
  "group1_create_elements",
  "group1_create_components",
  "group3_create_tree",
  "group3_update_root",
  "group3_update_leaf",
  "group5_update_root",
  "group5_update_all",
];

files.forEach((file) => {
  const filePath = `results/csv/${file}.csv`;
  const f = fs.readFileSync(filePath, "utf8");
  Papa.parse(f, {
    complete(results) {
      const rows = results.data[0].slice(1);
      const data = _.keyBy(results.data.slice(1), 0);

      const scriptRows = [];

      for (let i = 0; i < rows.length; i += 1) {
        const row = `${rows[i]} & ${data["angular_script"][i + 1]} & ${
          data["react_script"][i + 1]
        } & ${data["vue3_script"][i + 1]} & ${data["svelte_script"][i + 1]} & ${
          data["blazor_script"][i + 1]
        } \\\\`;
        scriptRows.push(row);
      }

      fs.writeFileSync(`./${file}_script.tex`, scriptRows.join("\n"));

      const totalRows = [];

      for (let i = 0; i < rows.length; i += 1) {
        const row = `${rows[i]} & ${data["angular_total"][i + 1]} & ${
          data["react_total"][i + 1]
        } & ${data["vue3_total"][i + 1]} & ${data["svelte_total"][i + 1]} & ${
          data["blazor_total"][i + 1]
        } \\\\`;
        totalRows.push(row);
      }

      fs.writeFileSync(`./${file}_total.tex`, totalRows.join("\n"));
    },
  });
});

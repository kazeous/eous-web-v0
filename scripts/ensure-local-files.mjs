import {mkdir, writeFile} from "node:fs/promises";
import {existsSync} from "node:fs";
import {dirname, resolve} from "node:path";

const hiddenImagesPath = resolve("api/src/routes/local_scripts/hidden.json");

if (!existsSync(hiddenImagesPath)) {
    await mkdir(dirname(hiddenImagesPath), {recursive: true});
    await writeFile(hiddenImagesPath, "[]\n", "utf8");
    console.log("Created empty local hidden image list.");
}

import { generateScssMapName } from "../../../../utils/generators/scss";
import UtilityConfig from "../../../../UtilityConfig";

const displayUtilities: Record<string, UtilityConfig> = {
    display: new UtilityConfig({
        properties: "display",
        className: "d",
        values: {
            none: "none",
            block: "block",
            "inline-block": "inline-block",
            inline: "inline",
            flex: "flex",
            "inline-flex": "inline-flex",
            grid: "grid",
            "inline-grid": "inline-grid",
        },
    }),
};

export default displayUtilities;

import { generateScssMapName } from "../../../../utils/generators/scss";
import UtilityConfig from "../../../../UtilityConfig";

const flexUtilities: Record<string, UtilityConfig> = {
    flexDirection: new UtilityConfig({
        properties: "flex-direction",
        className: "direction",
        values: {
            row: "row",
            column: "column",
            "row-reverse": "row-reverse",
            "column-reverse": "column-reverse",
        },
    }),
    flexWrap: new UtilityConfig({
        properties: "flex-wrap",
        className: "flex",
        values: {
            wrap: "wrap",
            nowrap: "nowrap",
            "wrap-reverse": "wrap-reverse",
        },
    }),
    flexGrow: new UtilityConfig({
        properties: "flex-grow",
        className: "flex",
        values: {
            grow: "1",
            "grow-0": "0",
        },
    }),
    flexShrink: new UtilityConfig({
        properties: "flex-shrink",
        className: "flex",
        values: {
            shrink: "1",
            "shrink-0": "0",
        },
    }),
};

export default flexUtilities;

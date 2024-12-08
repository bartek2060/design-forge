import UtilityConfig from "../../../../UtilityConfig";

const alignmentUtilities: Record<string, UtilityConfig> = {
    alignItems: new UtilityConfig({
        properties: "align-items",
        className: "items",
        values: {
            start: "flex-start",
            center: "center",
            end: "flex-end",
            stretch: "stretch",
            baseline: "baseline",
        },
    }),
    justifyContent: new UtilityConfig({
        properties: "justify-content",
        className: "justify",
        values: {
            start: "flex-start",
            center: "center",
            end: "flex-end",
            between: "space-between",
            around: "space-around",
            evenly: "space-evenly",
        },
    }),
};

export default alignmentUtilities;

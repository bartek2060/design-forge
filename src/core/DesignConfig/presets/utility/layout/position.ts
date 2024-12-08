import UtilityConfig from "../../../../UtilityConfig";

const positionUtilities: Record<string, UtilityConfig> = {
    position: new UtilityConfig({
        properties: "position",
        className: "pos",
        values: {
            static: "static",
            relative: "relative",
            absolute: "absolute",
            fixed: "fixed",
            sticky: "sticky",
        },
    }),
};

export default positionUtilities;

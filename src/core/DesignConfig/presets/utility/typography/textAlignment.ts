import UtilityConfig from "../../../../UtilityConfig";

const createTextAlignmentUtilities = (): Record<string, UtilityConfig> => {
    return {
        textAlign: new UtilityConfig({
            properties: "text-align",
            className: "text",
            values: {
                left: "left",
                center: "center",
                right: "right",
                justify: "justify",
            },
        }),
    };
};

export default createTextAlignmentUtilities;

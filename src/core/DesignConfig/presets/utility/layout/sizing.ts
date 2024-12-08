import UtilityConfig from "../../../../UtilityConfig";

const values = {
    "0": "0%",
    "5": "5%",
    "10": "10%",
    "15": "15%",
    "20": "20%",
    "25": "25%",
    "33": "33.333333%",
    "40": "40%",
    "50": "50%",
    "60": "60%",
    "66": "66.666667%",
    "70": "70%",
    "75": "75%",
    "80": "80%",
    "90": "90%",
    "100": "100%",
    auto: "auto",
};
const sizingUtilities: Record<string, UtilityConfig> = {
    width: new UtilityConfig({
        properties: "width",
        className: "w",
        values,
    }),
    height: new UtilityConfig({
        properties: "height",
        className: "h",
        values,
    }),
};

export default sizingUtilities;

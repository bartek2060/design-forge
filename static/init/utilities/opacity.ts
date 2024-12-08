import { UtilityConfig } from "@mogielski/design-forge";

// Here is an example of a custom utility.
const opacityUtility = new UtilityConfig({
    properties: "opacity",
    className: "opacity",
    values: {
        0: "0",
        25: "0.25",
        50: "0.5",
        75: "0.75",
        100: "1",
    },
});

export default opacityUtility;

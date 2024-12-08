import { UtilityGeneratorInput } from "../../../../..";

import opacityUtility from "./opacity";

const utilities: UtilityGeneratorInput = {
    /* Preset utilities
    We build all of them by default, but you can pick and choose if you want to exclude some.
    
    spacing: {
        margin: true, // Generates margin utilities. This is the default.
        padding: false, // Padding utilities won't be generated
    },
    
    */

    // Custom utilities
    custom: {
        opacity: opacityUtility,
    },
};

export default utilities;

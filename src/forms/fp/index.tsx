import React from "react";
import { Stack, Text } from "@chakra-ui/react";

import AggTable from "../../components/AggTable";
import family_planning from "./family_planning.json";
import {
    REFUGEE,
    NEW_USER,
    REPEAT_USER,
    DISCONTINUED_USER,
    AGE_18_G_YRS,
    MALE_FEMALE,
    NATIONAL,
    join2,
    REFUGEE_NATIONAL,
    YEARS_LT_20,
    YEARS_GT_20,
    YEARS_T0TAL,
} from "../../utils";
import AggTable2 from "../../components/AggTable2";
export const FP = ({ data }: { data: any }) => {
    const userAndNat = join2(REFUGEE_NATIONAL, [
        NEW_USER,
        REPEAT_USER,
        DISCONTINUED_USER,
    ]);
    const userAndNatAndAge = join2(userAndNat, [YEARS_LT_20, YEARS_GT_20]);

    // const nationalColumn = [...AGE_0_TO_60, YEARS_T0TAL];

    const acuteColumns = [
        [
            { ...REFUGEE, span: 15 },
            { ...NATIONAL, span: 3 },
        ],
        [
            { ...NEW_USER, span: 2 },
            { ...YEARS_T0TAL, row: 3 },
            { ...REPEAT_USER, span: 2 },
            { ...YEARS_T0TAL, row: 3 },
            { ...DISCONTINUED_USER, span: 2 },
            { ...YEARS_T0TAL, row: 3 },
        ],
        [
            { ...YEARS_LT_20, span: 2 },
            { ...YEARS_GT_20, span: 2 },
            { ...YEARS_LT_20, span: 2 },
            { ...YEARS_GT_20, span: 2 },
            { ...YEARS_LT_20, span: 2 },
            { ...YEARS_GT_20, span: 2 },
        ],
        [
            ...join2([NEW_USER], [YEARS_LT_20, YEARS_GT_20]),
            // YEARS_T0TAL,
            ...join2([REPEAT_USER], [YEARS_LT_20, YEARS_GT_20]),
            // YEARS_T0TAL,
            ...join2([DISCONTINUED_USER], [YEARS_LT_20, YEARS_GT_20]),
            // YEARS_T0TAL,
        ],
        // [
        //     ...yearsColumns.map((a) => ({
        //         ...a,
        //         id: `${REFUGEE.id}_${a.id}`,
        //     })),
        //     ...nationalColumn.map((a) => ({
        //         ...a,
        //         id: `${NATIONAL.id}_${a.id}`,
        //     })),
        // ],
    ];
    return (
        <Stack>
            <Text>Family Planning </Text>
            <AggTable2
                // refugeeColumns={[
                //     [NEW_USER, REPEAT_USER, DISCONTINUED_USER],
                //     [REFUGEE],

                //     AGE_18_G_YRS,
                //     MALE_FEMALE,
                // ]}
                // nationalColumns={[
                //     [NEW_USER, REPEAT_USER, DISCONTINUED_USER],
                //     [NATIONAL],
                // ]}
                columns={acuteColumns}
                rows={family_planning}
                data={data}
            />
        </Stack>
    );
};

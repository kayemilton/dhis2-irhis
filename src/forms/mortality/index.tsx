import { Stack } from "@chakra-ui/react";
import React from "react";
import AggTable2 from "../../components/AggTable2";
import {
    AGE_1_TO_60,
    join2,
    MALE_FEMALE,
    NATIONAL,
    REFUGEE,
    YEARS_18_TO_59,
    YEARS_1_T0_4,
    YEARS_5_TO_17,
    YEARS_FROM_60,
    YEARS_T0TAL,
    YEARS_T0TAL_LT_5,
    YEARS_T0_1,
} from "../../utils";
import mortality from "./mortality.json";
import mortalityByAge from "./mortality_age.json";

export const Mortality = ({ data }: { data: any }) => {
    const modifiedRef = { ...REFUGEE, id: "Refugee" };
    const modifiedNat = {
        ...NATIONAL,
        id: "National",
    };
    const columns1 = [
        [
            { ...modifiedRef, span: AGE_1_TO_60.length },
            { ...modifiedNat, span: AGE_1_TO_60.length },
        ],
        [
            ...AGE_1_TO_60.map((a) => ({
                ...a,
                id: `${modifiedRef.id}_${a.id}`,
            })),
            ...AGE_1_TO_60.map((a) => ({
                ...a,
                id: `${modifiedNat.id}_${a.id}`,
            })),
        ],
    ];

    const mortalityColumns1 = join2([YEARS_T0_1, YEARS_1_T0_4], MALE_FEMALE);
    const mortalityColumns2 = join2(
        [YEARS_5_TO_17, YEARS_18_TO_59, YEARS_FROM_60],
        MALE_FEMALE
    );

    const allColumns = [
        ...mortalityColumns1,
        YEARS_T0TAL_LT_5,
        ...mortalityColumns2,
        YEARS_T0TAL,
    ];

    const columns2 = [
        [
            { ...REFUGEE, span: allColumns.length },
            { ...NATIONAL, span: AGE_1_TO_60.length },
        ],
        [
            ...allColumns.map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...AGE_1_TO_60.map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),
        ],
    ];
    return (
        <Stack>
            <AggTable2 columns={columns1} rows={mortalityByAge} data={data} />
            <AggTable2 columns={columns2} rows={mortality} data={data} />
        </Stack>
    );
};

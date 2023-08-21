import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import {
    REFUGEE_NATIONAL,
    AGE_0_TO_59_MONTHS,
    join2,
    MALE_FEMALE,
    YEARS_T0TAL_LT_5,
    YEARS_T0TAL_GT_5,
    YEARS_T0TAL,
    REFUGEE,
    NATIONAL,
} from "../../utils";
import AggTable from "../../components/AggTable";
import bsfp from "./bsfp.json";
import AggTable2 from "../../components/AggTable2";

export const BSFP1 = ({ data }: { data: any }) => {
    const columns0To4 = join2(AGE_0_TO_59_MONTHS, MALE_FEMALE);
    const yearsColumns = [...columns0To4, YEARS_T0TAL_LT_5];

    const nationalColumn = [...AGE_0_TO_59_MONTHS, YEARS_T0TAL_LT_5];

    const columns = [
        [
            { ...REFUGEE, span: yearsColumns.length },
            { ...NATIONAL, span: nationalColumn.length },
        ],
        [
            ...yearsColumns.map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...nationalColumn.map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),
        ],
    ];
    return (
        <Stack>
            <Text>Blanket Supplementary Feeding Program U5</Text>
            <AggTable2 columns={columns} rows={bsfp} data={data} />
        </Stack>
    );
};

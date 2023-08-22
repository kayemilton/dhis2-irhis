import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import {
    REFUGEE,
    AGE_0_TO_59_MONTHS,
    MALE_FEMALE,
    NATIONAL,
    HIV_TB,
    PREGNANT_LACTATING,
    YEARS_T0TAL,
    join2,
    YEARS_0_T0_4,
    YEARS_5_TO_17,
    YEARS_18_TO_59,
    YEARS_FROM_60,
    YEARS_T0TAL_LT_5,
    AGE_0_TO_60,
    YEARS_T0TAL_GT_5,
} from "../../utils";
import AggTable from "../../components/AggTable";

import tsfp from "./tsfp.json";
import AggTable2 from "../../components/AggTable2";

export const TSFP = ({ data }: { data: any }) => {
    const columns0To4 = join2(AGE_0_TO_59_MONTHS, MALE_FEMALE);
    const hivTBColumns = join2([HIV_TB], MALE_FEMALE);
    const yearsColumns = [
        ...columns0To4,
        YEARS_T0TAL_LT_5,
        YEARS_T0TAL_GT_5,
        ...hivTBColumns,
        PREGNANT_LACTATING,
        YEARS_T0TAL,
    ];

    const nationalColumn = [
        ...AGE_0_TO_59_MONTHS,
        YEARS_T0TAL_LT_5,
        YEARS_T0TAL_GT_5,
        HIV_TB,
        PREGNANT_LACTATING,
        YEARS_T0TAL,
    ];

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
            <Stack>
                <Text>Targeted Supplementary Feeding Program</Text>
                <AggTable2 columns={columns} rows={tsfp} data={data} />
            </Stack>

            <AggTable
                refugeeColumns={[[REFUGEE, NATIONAL]]}
                rows={[
                    {
                        id: "TSFP_TS_Ind_Sum_number_of_days_stay_for_discharged_children_lt_5",
                        name: "Sum number of days stay for exit promoted to otp/tsfp and recovered (< 5)",
                    },
                    {
                        id: "TSFP_TS_Ind_Sum_average_weight_gain_for_discharged_children_lt_5",
                        name: "Sum average weight gain for exit promoted to otp/tsfp and recovered (< 5)",
                    },
                ]}
                data={data}
                onlyRow
            />
        </Stack>
    );
};

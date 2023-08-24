import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import AggTable from "../../components/AggTable";
import AggTable2 from "../../components/AggTable2";
import {
    AGE_0_TO_59_MONTHS,
    join2,
    MALE_FEMALE,
    NATIONAL,
    REFUGEE,
    YEARS_T0TAL,
    YEARS_T0TAL_LT_5,
    YEARS_T0TAL_GT_5,
} from "../../utils";
import stabilization from "./stabilization.json";

export const Stabilization = ({ data }: { data: any }) => {
    const columns0To4 = join2(AGE_0_TO_59_MONTHS, MALE_FEMALE);
    const yearsColumns = [
        ...columns0To4,
        YEARS_T0TAL_LT_5,
        YEARS_T0TAL_GT_5,
        YEARS_T0TAL,
    ];

    const nationalColumn = [
        ...AGE_0_TO_59_MONTHS,
        YEARS_T0TAL_LT_5,
        YEARS_T0TAL_GT_5,
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
                <Text>Stabilization Center </Text>
                <AggTable2 columns={columns} rows={stabilization} data={data} />
            </Stack>

            <AggTable
                refugeeColumns={[
                    [
                        { ...REFUGEE, id: `SC_TS_${REFUGEE.id}` },
                        { ...NATIONAL, id: `SC_TS_${NATIONAL.id}` },
                    ],
                ]}
                rows={[
                    {
                        id: "Ind_Sum_number_of_days_stay_for_discharged_children_lt_5",
                        name: "Sum number of days stay for exit promoted to otp/tsfp and recovered (< 5)",
                    },
                    {
                        id: "Ind_Sum_average_weight_gain_for_discharged_children_lt_5",
                        name: "Sum average weight gain for exit promoted to otp/tsfp and recovered (< 5)",
                    },
                ]}
                data={data}
                reverse
            />
        </Stack>
    );
};

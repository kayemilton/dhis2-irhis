import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import {
    REFUGEE,
    AGE_0_TO_59_MONTHS,
    MALE_FEMALE,
    NATIONAL,
    join2,
    YEARS_T0TAL_LT_5,
    YEARS_T0TAL,
    YEARS_T0TAL_GT_5,
} from "../../utils";
import AggTable from "../../components/AggTable";
import otp from "./otp.json";
import AggTable2 from "../../components/AggTable2";

export const OTP = ({ data }: { data: any }) => {
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
                <Text>Outpatient Therapeutic Program</Text>
                <AggTable2 columns={columns} rows={otp} data={data} />
            </Stack>

            <AggTable
                refugeeColumns={[[REFUGEE, NATIONAL]]}
                rows={[
                    {
                        id: "OTP_TS_Ind_Sum_number_of_days_stay_for_discharged_children_lt_5",
                        name: "Sum number of days stay for exit promoted to otp/tsfp and recovered (< 5)",
                    },
                    {
                        id: "OTP_TS_Ind_Sum_average_weight_gain_for_discharged_children_lt_5",
                        name: "Sum average weight gain for exit promoted to otp/tsfp and recovered (< 5)",
                    },
                ]}
                data={data}
                onlyRow
            />
        </Stack>
    );
};

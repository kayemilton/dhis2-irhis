import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import {
    REFUGEE,
    AGE_0_TO_59_MONTHS,
    MALE_FEMALE,
    NATIONAL,
    HIV_TB,
    PREGNANT_LACTATING,
} from "../../utils";
import AggTable from "../../components/AggTable";

import tsfp from "./tsfp.json";

export const TSFP = ({ data }: { data: any }) => {
    return (
        <Stack>
            <Stack>
                <Text>Targeted Supplementary Feeding Program</Text>
                <AggTable
                    refugeeColumns={[
                        [REFUGEE],
                        [...AGE_0_TO_59_MONTHS, HIV_TB, PREGNANT_LACTATING],
                        MALE_FEMALE,
                    ]}
                    nationalColumns={[
                        [NATIONAL],
                        [...AGE_0_TO_59_MONTHS, HIV_TB, PREGNANT_LACTATING],
                    ]}
                    rows={tsfp}
                    data={data}
                />
            </Stack>

            <AggTable
                refugeeColumns={[[{ id: "", name: "Value" }]]}
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

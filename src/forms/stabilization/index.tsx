import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import {
    REFUGEE,
    AGE_0_TO_59_MONTHS,
    MALE_FEMALE,
    NATIONAL,
} from "../../utils";
import AggTable from "../../components/AggTable";
import stabilization from "./stabilization.json";

export const Stabilization = ({ data }: { data: any }) => {
    return (
        <Stack>
            <Stack>
                <Text>Stabilization Center </Text>
                <AggTable
                    refugeeColumns={[
                        [REFUGEE],
                        AGE_0_TO_59_MONTHS,
                        MALE_FEMALE,
                    ]}
                    nationalColumns={[[NATIONAL], AGE_0_TO_59_MONTHS]}
                    rows={stabilization}
                    data={data}
                />
            </Stack>

            <AggTable
                refugeeColumns={[[{ id: "", name: "Value" }]]}
                rows={[
                    {
                        id: "SC_TS_Ind_Sum_number_of_days_stay_for_discharged_children_lt_5",
                        name: "Sum number of days stay for exit promoted to otp/tsfp and recovered (< 5)",
                    },
                    {
                        id: "SC_TS_Ind_Sum_average_weight_gain_for_discharged_children_lt_5",
                        name: "Sum average weight gain for exit promoted to otp/tsfp and recovered (< 5)",
                    },
                ]}
                data={data}
                onlyRow
            />
        </Stack>
    );
};

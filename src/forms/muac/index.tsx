import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import {
    REFUGEE_NATIONAL,
    AGE_0_TO_59_MONTHS,
    PREGNANT_LACTATING,
    YEARS_T0TAL,
} from "../../utils";
import AggTable from "../../components/AggTable";

const rows = [
    { id: "MUAC_TS_Green_gt_12_5_cm_Community_GMP", name: "Green (normal)" },
    {
        id: "MUAC_TS_Yellow_11_5_cm_12_5_cm_Community_GMP",
        name: "Yellow (borderline)",
    },
    { id: "MUAC_TS_Red_lt_11_5_cm_Community_GMP", name: "Red (danger)" },
    { id: "MUAC_TS_Oedema_Community_GMP", name: "Oedema" },
];
const rows1 = [
    {
        id: "MUAC_TS_Green_gt_12_5_cm_Health_facility_MUAC",
        name: "Green (normal)",
    },
    {
        id: "MUAC_TS_Yellow_11_5_cm_12_5_cm_Health_facility_MUAC",
        name: "Yellow (borderline)",
    },
    { id: "MUAC_TS_Red_lt_11_5_cm_Health_facility_MUAC", name: "Red (danger)" },
    { id: "MUAC_TS_Oedema_Health_facility_MUAC", name: "Oedema" },
];

export const MUAC = ({ data }: { data: any }) => {
    return (
        <Stack>
            <Stack>
                <Text>GMP (Community)</Text>
                <AggTable
                    refugeeColumns={[REFUGEE_NATIONAL, AGE_0_TO_59_MONTHS]}
                    rows={rows}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text>MUAC (Health Facility)</Text>
                <AggTable
                    refugeeColumns={[
                        REFUGEE_NATIONAL,
                        [
                            ...AGE_0_TO_59_MONTHS,
                            PREGNANT_LACTATING,
                            YEARS_T0TAL,
                        ],
                    ]}
                    rows={rows1}
                    data={data}
                />
            </Stack>
        </Stack>
    );
};

import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import AggTable from "../../components/AggTable";
import AggTable2 from "../../components/AggTable2";
import {
    ADMIN_DEATHS,
    AGE_0_TO_60,
    NATIONAL,
    REFUGEE,
    REFUGEE_NATIONAL,
    YEARS_18_TO_59,
    YEARS_1_T0_4,
    YEARS_5_TO_17,
    YEARS_FROM_60,
    YEARS_T0TAL,
    YEARS_T0TAL_LT_5,
    YEARS_T0TAL_ONLY,
    YEARS_T0_1,
} from "../../utils";
import admissions from "./admissions.json";
import ipd_admissions_death from "./ipd_admissions_death.json";
import ipd_indicators from "./ipd_indicators.json";

export const IPD = ({ data }: { data: any }) => {
    const allColumns = [
        YEARS_T0_1,
        YEARS_1_T0_4,
        YEARS_T0TAL_LT_5,
        YEARS_5_TO_17,
        YEARS_18_TO_59,
        YEARS_FROM_60,
        YEARS_T0TAL,
    ];

    const admissionColumns = [
        [
            { ...REFUGEE, span: allColumns.length },
            { ...NATIONAL, span: allColumns.length },
        ],
        [
            ...allColumns.map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...allColumns.map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),
        ],
    ];
    return (
        <Stack spacing="20px" w="100%" h="100%">
            <Text fontWeight="bold">Admissions/Exits</Text>
            <AggTable2
                columns={admissionColumns}
                rows={admissions}
                data={data}
            />
            <Text fontWeight="bold">IPD Indicators</Text>
            <AggTable
                refugeeColumns={[[{ name: "Total", id: "" }]]}
                rows={ipd_indicators}
                data={data}
                onlyRow
            />
            <Text fontWeight="bold">In-patient Admissions and Deaths</Text>
            <AggTable
                refugeeColumns={[
                    REFUGEE_NATIONAL,
                    [...AGE_0_TO_60, YEARS_T0TAL_ONLY],
                    ADMIN_DEATHS,
                ]}
                rows={ipd_admissions_death}
                data={data}
            />
        </Stack>
    );
};

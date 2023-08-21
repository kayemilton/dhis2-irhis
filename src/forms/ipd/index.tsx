import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import AggTable from "../../components/AggTable";
import {
    AGE_0_TO_60,
    NAT_AGE_0_TO_60_ADMIN,
    REFUGEE_NATIONAL,
    join2,
    YEARS_T0_1,
    YEARS_1_T0_4,
    MALE_FEMALE,
    YEARS_5_TO_17,
    YEARS_18_TO_59,
    YEARS_FROM_60,
    YEARS_T0TAL_LT_5,
    YEARS_T0TAL,
    REFUGEE,
    NATIONAL,
    AGE_1_TO_60,
} from "../../utils";
import admissions from "./admissions.json";
import ipd_admissions_death from "./ipd_admissions_death.json";
import ipd_indicators from "./ipd_indicators.json";
import AggTable2 from "../../components/AggTable2";

export const IPD = ({ data }: { data: any }) => {
    const mortalityColumns1 = join2([YEARS_T0_1, YEARS_1_T0_4], MALE_FEMALE);
    const mortalityColumns2 = join2(
        [YEARS_5_TO_17, YEARS_18_TO_59, YEARS_FROM_60],
        MALE_FEMALE
    );

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
        <Stack spacing="40px">
            <Stack>
                <Text fontWeight="bold">Admissions/Exits</Text>
                <AggTable2
                    columns={admissionColumns}
                    rows={admissions}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">IPD Indicators</Text>
                <AggTable
                    refugeeColumns={[[{ name: "Total", id: "" }]]}
                    rows={ipd_indicators}
                    data={data}
                    onlyRow
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">In-patient Admissions and Deaths</Text>
                <AggTable
                    refugeeColumns={NAT_AGE_0_TO_60_ADMIN}
                    rows={ipd_admissions_death}
                    data={data}
                />
            </Stack>
        </Stack>
    );
};

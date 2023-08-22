import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import AggTable2 from "../../components/AggTable2";
import {
    diseaseControlColumns,
    join2,
    YEARS_0_T0_4,
    MALE_FEMALE,
    YEARS_5_TO_14,
    YEARS_FROM_14,
    YEARS_T0TAL_LT_5,
    YEARS_T0TAL,
    REFUGEE,
    NATIONAL,
    YEARS_0_T0_4_LT,
    YEARS_5_TO_14_NO,
} from "../../utils";
import leprossy from "./leprossy.json";
import tb from "./tb.json";

export const DiseaseControl = ({ data }: { data: any }) => {
    const columns0To4 = join2(MALE_FEMALE, [YEARS_0_T0_4_LT]);
    const columns5To14 = join2(MALE_FEMALE, [YEARS_5_TO_14_NO, YEARS_FROM_14]);
    const yearsColumns = [
        ...columns0To4,
        YEARS_T0TAL_LT_5,
        ...columns5To14,
        YEARS_T0TAL,
    ];

    const nationalColumn = [
        YEARS_0_T0_4_LT,
        YEARS_5_TO_14_NO,
        YEARS_FROM_14,
        YEARS_T0TAL,
    ];

    const tbColumns = [
        [
            { ...REFUGEE, span: yearsColumns.length },
            { ...NATIONAL, span: nationalColumn.length },
        ],
        [
            ...yearsColumns.map((a) => ({
                ...a,
                id: `${REFUGEE.id}_TBC_${a.id}`,
            })),
            ...nationalColumn.map((a) => ({
                ...a,
                id: `${NATIONAL.id}_TBC_${a.id}`,
            })),
        ],
    ];
    const leprosyColumns = [
        [
            { ...REFUGEE, span: yearsColumns.length },
            { ...NATIONAL, span: nationalColumn.length },
        ],
        [
            ...yearsColumns.map((a) => ({
                ...a,
                id: `${REFUGEE.id}_Leprosy_${a.id}`,
            })),
            ...nationalColumn.map((a) => ({
                ...a,
                id: `${NATIONAL.id}_Leprosy_${a.id}`,
            })),
        ],
    ];

    return (
        <Stack spacing="40px">
            <Stack>
                <Text fontWeight="bold">Tuberculosis</Text>
                <AggTable2 columns={tbColumns} rows={tb} data={data} />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Leprosy</Text>
                <AggTable2
                    columns={leprosyColumns}
                    rows={leprossy}
                    data={data}
                />
            </Stack>
        </Stack>
    );
};

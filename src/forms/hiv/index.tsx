import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import AggTable2 from "../../components/AggTable2";
import {
    FEMALE,
    FEMALE_INFANTS,
    join2,
    MALE,
    MALE_FEMALE,
    MALE_INFANTS,
    NATIONAL,
    REFUGEE,
    YEARS_GT_20,
    YEARS_LT_20,
    YEARS_T0TAL,
} from "../../utils";
import art from "./art.json";

const rows = [
    { id: "HIV_HIV_Testing_ANC_Total", name: "Total" },
    { id: "HIV_HIV_Testing_ANC_Positive", name: "Positive" },
];
const ipt = [
    { id: "HIV_HIV_Testing_PITC_Total", name: "Total" },
    { id: "HIV_HIV_Testing_PITC_Positive", name: "Positive" },
];
const hct = [
    { id: "HIV_HIV_Testing_HCT_VCT_Total", name: "Total" },
    { id: "HIV_HIV_Testing_HCT_VCT_Positive", name: "Positive" },
];
const pcr = [
    { id: "HIV_HIV_Testing_PCR_Total", name: "Total" },
    { id: "HIV_HIV_Testing_PCR_Positive", name: "Positive" },
];
const other = [
    { id: "HIV_HIV_Testing_Other_Total", name: "Total" },
    { id: "HIV_HIV_Testing_Other_Positive", name: "Positive" },
];

export const HIV = ({ data }: { data: any }) => {
    const maleFemaleTotal = [...MALE_FEMALE, YEARS_T0TAL];
    const consultationColumns = [
        [
            { ...REFUGEE, span: maleFemaleTotal.length },
            { ...NATIONAL, span: maleFemaleTotal.length },
        ],
        [
            ...maleFemaleTotal.map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...[YEARS_T0TAL].map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),
        ],
    ];

    const pitcColumns = [
        [
            { ...REFUGEE, span: 5 },
            { ...NATIONAL, span: 3 },
        ],
        [
            ...join2([YEARS_LT_20], [FEMALE]).map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...join2([YEARS_GT_20], [FEMALE]).map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),

            ...join2([YEARS_LT_20], [MALE]).map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...join2([YEARS_GT_20], [MALE]).map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...[YEARS_T0TAL].map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),

            ...join2([YEARS_LT_20], [FEMALE]).map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),
            ...join2([YEARS_GT_20], [FEMALE]).map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),

            ...[YEARS_T0TAL].map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),
        ],
    ];

    const pitcColumns2 = [
        [
            { ...REFUGEE, span: 5 },
            { ...NATIONAL, span: 3 },
        ],
        [
            ...join2([YEARS_LT_20], [FEMALE]).map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...join2([YEARS_GT_20], [FEMALE]).map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),

            ...join2([YEARS_LT_20], [MALE]).map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...join2([YEARS_GT_20], [MALE]).map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...[YEARS_T0TAL].map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),

            ...[YEARS_LT_20].map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),
            ...[YEARS_GT_20].map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),

            ...[YEARS_T0TAL].map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),
        ],
    ];

    const pitcFemaleColumns = [
        [
            { ...REFUGEE, span: 3 },
            { ...NATIONAL, span: 3 },
        ],
        [
            ...join2([YEARS_LT_20], [FEMALE]).map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...join2([YEARS_GT_20], [FEMALE]).map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...[YEARS_T0TAL].map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),

            ...join2([YEARS_LT_20], [FEMALE]).map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),
            ...join2([YEARS_GT_20], [FEMALE]).map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),

            ...[YEARS_T0TAL].map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),
        ],
    ];

    const pcrColumns = [
        [
            { ...REFUGEE, span: 3 },
            { ...NATIONAL, span: 1 },
        ],
        [
            ...[MALE_INFANTS, FEMALE_INFANTS, YEARS_T0TAL].map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...[{ id: "Infants", name: "Infants" }].map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),
        ],
    ];
    return (
        <Stack spacing="20px" w="100%">
            <Stack>
                <Text fontWeight="bold">Condom Distribution</Text>
                <AggTable2
                    columns={consultationColumns}
                    rows={[
                        { id: "HIV_Condom_Distribuition_OPD", name: "OPD" },
                        {
                            id: "HIV_Condom_Distribuition_FP_Clinic",
                            name: "FP Clinic",
                        },
                        {
                            id: "HIV_Condom_Distribuition_Community",
                            name: "Community",
                        },
                    ]}
                    data={data}
                />
            </Stack>

            <Stack>
                <Text fontWeight="bold">ANC Testing</Text>
                <AggTable2
                    columns={pitcFemaleColumns}
                    rows={rows}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">PITC Testing</Text>
                <AggTable2 columns={pitcColumns} rows={ipt} data={data} />
            </Stack>
            <Stack>
                <Text fontWeight="bold">HCT/VCT Testing</Text>
                <AggTable2 columns={pitcColumns} rows={hct} data={data} />
            </Stack>
            <Stack>
                <Text fontWeight="bold">PCR Testing</Text>
                <AggTable2 columns={pcrColumns} rows={pcr} data={data} />
            </Stack>
            <Stack>
                <Text fontWeight="bold">ART</Text>
                <AggTable2 columns={pitcColumns2} rows={art} data={data} />
            </Stack>
        </Stack>
    );
};

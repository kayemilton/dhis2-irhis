import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import AggTable from "../../components/AggTable";
import AggTable2 from "../../components/AggTable2";
import {
    AGE_0_TO_60,
    join2,
    MALE_FEMALE,
    NATIONAL,
    REFUGEE,
    YEARS_0_T0_4,
    YEARS_18_TO_59,
    YEARS_5_TO_17,
    YEARS_FROM_60,
    YEARS_T0TAL,
    YEARS_T0TAL_LT_5,
} from "../../utils";
import acute from "./accute_health.json";
import chronic from "./chronic.json";
import consultation from "./consultation.json";
import injuries from "./injuries.json";
import mental from "./mental.json";
import notifiable from "./notifiable.json";
import sti from "./sti.json";

export const Morbidity = ({ data }: { data: any }) => {
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
            ...maleFemaleTotal.map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),
        ],
    ];

    const columns0To4 = join2([YEARS_0_T0_4], MALE_FEMALE);
    const columns5To60 = join2(
        [YEARS_5_TO_17, YEARS_18_TO_59, YEARS_FROM_60],
        MALE_FEMALE
    );
    const yearsColumns = [
        ...columns0To4,
        YEARS_T0TAL_LT_5,
        ...columns5To60,
        YEARS_T0TAL,
    ];

    const nationalColumn = [...AGE_0_TO_60, YEARS_T0TAL];

    const acuteColumns = [
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
        <Stack spacing="20px">
            <Stack>
                <Text fontWeight="bold">Consultation</Text>
                <AggTable2
                    columns={consultationColumns}
                    rows={[
                        {
                            name: "Number of new consultations",
                            id: "OPD_TS_number_of_new_consultations",
                        },
                        {
                            name: "Number of new NCD consultations",
                            id: "OPD_TS_number_of_new_ncd_consultations",
                        },
                        {
                            name: "Number of new MH consultations",
                            id: "OPD_TS_number_of_new_mh_consultations",
                        },
                        {
                            name: "Total consultations (new and revisits)",
                            id: "OPD_TS_consultation",
                        },
                    ]}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Consultation Indicators</Text>
                <AggTable
                    refugeeColumns={[[{ id: "", name: "Total" }]]}
                    rows={consultation}
                    data={data}
                    onlyRow
                />
            </Stack>

            <Stack>
                <Text fontWeight="bold">Acute Health Conditions</Text>
                <AggTable2 columns={acuteColumns} rows={acute} data={data} />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Sexually Transmitted Diseases</Text>
                <AggTable2 columns={acuteColumns} rows={sti} data={data} />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Chronic Disease</Text>
                <AggTable2 columns={acuteColumns} rows={chronic} data={data} />
            </Stack>

            <Stack>
                <Text fontWeight="bold">Mental Illness</Text>
                <AggTable2 columns={acuteColumns} rows={mental} data={data} />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Injuries</Text>
                <AggTable2 columns={acuteColumns} rows={injuries} data={data} />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Notifiable Diseases</Text>
                <AggTable2
                    columns={acuteColumns}
                    rows={notifiable}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Outbreak Alert and Response</Text>
                <AggTable
                    refugeeColumns={[[{ id: "", name: "Total" }]]}
                    onlyRow
                    rows={[
                        {
                            name: "Number of outbreaks reported",
                            id: "OPD_TS_oar_nr_outbreaks_rep",
                        },
                        {
                            name: "Number of reported outbreaks investigated within 48 hours",
                            id: "OPD_TS_oar_nr_rep_invest",
                        },
                    ]}
                    data={data}
                />
            </Stack>
        </Stack>
    );
};

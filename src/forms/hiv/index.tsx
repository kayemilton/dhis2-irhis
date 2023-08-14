import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import {
    REFUGEE,
    MALE_FEMALE,
    NATIONAL,
    REFUGEE_NATIONAL,
    AGE_18_G,
    AGE_18,
} from "../../utils";
import AggTable from "../../components/AggTable";
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
    return (
        <Stack spacing="40px">
            <Stack>
                <Text fontWeight="bold">Condom Distribution</Text>
                <AggTable
                    refugeeColumns={[[REFUGEE], MALE_FEMALE]}
                    nationalColumns={[[NATIONAL]]}
                    rows={[
                        { id: "HIV_Condom_Distribution_OPD", name: "OPD" },
                        { id: "HIV_Condom_Distribution_FP", name: "FP Clinic" },
                        {
                            id: "HIV_Condom_Distribution_Community",
                            name: "Community",
                        },
                    ]}
                    data={data}
                />
            </Stack>

            <Stack>
                <Text fontWeight="bold">ANC Testing</Text>
                <AggTable
                    refugeeColumns={[REFUGEE_NATIONAL, AGE_18_G]}
                    rows={rows}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">PITC Testing</Text>
                <AggTable
                    refugeeColumns={[[REFUGEE], AGE_18_G, MALE_FEMALE]}
                    nationalColumns={[[NATIONAL], AGE_18_G]}
                    rows={ipt}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">HCT/VCT Testing</Text>
                <AggTable
                    refugeeColumns={[[REFUGEE], AGE_18_G, MALE_FEMALE]}
                    nationalColumns={[[NATIONAL], AGE_18_G]}
                    rows={hct}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">PCR Testing</Text>
                <AggTable
                    refugeeColumns={[[REFUGEE], MALE_FEMALE]}
                    nationalColumns={[[NATIONAL]]}
                    rows={pcr}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">ART</Text>
                <AggTable
                    refugeeColumns={[[REFUGEE], AGE_18_G, MALE_FEMALE]}
                    nationalColumns={[[NATIONAL], AGE_18_G]}
                    rows={art}
                    data={data}
                />
            </Stack>
        </Stack>
    );
};

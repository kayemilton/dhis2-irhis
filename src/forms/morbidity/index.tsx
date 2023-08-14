import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import {
    MORBIDITY_TOTAL,
    NAT_AGE_0_TO_60,
    REF_AGE_0_TO_60_GENDER,
    REF_AGE_0_TO_60_GENDER_MOB,
    NAT_AGE_0_TO_60_MOB,
} from "../../utils";
import AggTable from "../../components/AggTable";
import consultation from "./consultation.json";
import acute from "./accute_health.json";
import sti from "./sti.json";
import chronic from "./chronic.json";
import mental from "./mental.json";
import injuries from "./injuries.json";
import accute_health from "./accute_health.json";
import notifiable from "./notifiable.json";

export const Morbidity = ({ data }: { data: any }) => {
    return (
        <Stack spacing="40px">
            <Stack>
                <Text fontWeight="bold">Consultation</Text>
                <AggTable
                    refugeeColumns={MORBIDITY_TOTAL}
                    rows={[{ name: "Total", id: "OPD_TS_consultation" }]}
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
                <AggTable
                    refugeeColumns={REF_AGE_0_TO_60_GENDER}
                    nationalColumns={NAT_AGE_0_TO_60}
                    rows={acute}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Sexually Transmitted Diseases</Text>
                <AggTable
                    refugeeColumns={REF_AGE_0_TO_60_GENDER}
                    nationalColumns={NAT_AGE_0_TO_60}
                    rows={sti}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Chronic Disease</Text>
                <AggTable
                    refugeeColumns={REF_AGE_0_TO_60_GENDER}
                    nationalColumns={NAT_AGE_0_TO_60}
                    rows={chronic}
                    data={data}
                />
            </Stack>

            <Stack>
                <Text fontWeight="bold">Mental Illness</Text>
                <AggTable
                    refugeeColumns={REF_AGE_0_TO_60_GENDER}
                    nationalColumns={NAT_AGE_0_TO_60}
                    rows={mental}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Injuries</Text>
                <AggTable
                    refugeeColumns={REF_AGE_0_TO_60_GENDER}
                    nationalColumns={NAT_AGE_0_TO_60}
                    rows={mental}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Notifiable Diseases</Text>
                <AggTable
                    refugeeColumns={REF_AGE_0_TO_60_GENDER}
                    nationalColumns={NAT_AGE_0_TO_60}
                    rows={notifiable}
                    data={data}
                />
            </Stack>
        </Stack>
    );
};

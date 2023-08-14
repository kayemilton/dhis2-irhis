import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { REFUGEE_NATIONAL, AGE_0_TO_59_MONTHS } from "../../utils";
import AggTable from "../../components/AggTable";
import bsfp from "./bsfp.json";

export const BSFP1 = ({ data }: { data: any }) => {
    return (
        <Stack>
            <Text>Blanket Supplementary Feeding Program U5</Text>
            <AggTable
                refugeeColumns={[REFUGEE_NATIONAL, AGE_0_TO_59_MONTHS]}
                rows={bsfp}
                data={data}
            />
        </Stack>
    );
};

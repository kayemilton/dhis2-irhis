import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { REFUGEE_NATIONAL, AGE_0_TO_59_MONTHS, AGE_18 } from "../../utils";
import AggTable from "../../components/AggTable";
import bsfp2 from "./bsfp2.json";

export const BSFP2 = ({ data }: { data: any }) => {
    return (
        <Stack>
            <Text>
                Blanket Supplementary Feeding Program Pregnant and Lactating
            </Text>
            <AggTable
                refugeeColumns={[REFUGEE_NATIONAL, AGE_18]}
                rows={bsfp2}
                data={data}
            />
        </Stack>
    );
};

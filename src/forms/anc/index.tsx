import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { REFUGEE_NATIONAL, AGE_18_G_YRS } from "../../utils";
import AggTable from "../../components/AggTable";
import anc from "./anc.json";
export const ANC = ({ data }: { data: any }) => {
    return (
        <Stack>
            <Text>Stabilization Center </Text>
            <AggTable
                refugeeColumns={[REFUGEE_NATIONAL, AGE_18_G_YRS]}
                rows={anc}
                data={data}
            />
        </Stack>
    );
};

import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { REFUGEE_NATIONAL } from "../../utils";
import AggTable from "../../components/AggTable";

export const ANCTetanus = ({ data }: { data: any }) => {
    return (
        <Stack>
            <Text>ANC Tetanus </Text>
            <AggTable
                refugeeColumns={[REFUGEE_NATIONAL]}
                rows={[
                    { id: "ANC_Tetanus_TS_Not_given", name: "Not given" },
                    { id: "ANC_Tetanus_TS_TT_1", name: "TT 1" },
                    { id: "ANC_Tetanus_TS_TT_2", name: "TT 2" },
                    { id: "ANC_Tetanus_TS_TT_3", name: "TT 3" },
                    { id: "ANC_Tetanus_TS_TT_4", name: "TT 4" },
                    { id: "ANC_Tetanus_TS_TT_5", name: "TT 5" },
                ]}
                data={data}
            />
        </Stack>
    );
};

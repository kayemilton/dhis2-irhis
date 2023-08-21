import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import AggTable2 from "../../components/AggTable2";
import { diseaseControlColumns } from "../../utils";
import leprossy from "./leprossy.json";
import tb from "./tb.json";

export const DiseaseControl = ({ data }: { data: any }) => {
    return (
        <Stack spacing="40px">
            <Stack>
                <Text fontWeight="bold">Tuberculosis</Text>
                <AggTable2
                    columns={diseaseControlColumns}
                    rows={tb}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Leprosy</Text>
                <AggTable2
                    columns={diseaseControlColumns}
                    rows={leprossy}
                    data={data}
                />
            </Stack>
        </Stack>
    );
};

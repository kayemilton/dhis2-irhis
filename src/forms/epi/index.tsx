import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { REFUGEE_NATIONAL, EPI_AGE, ADMINISTERED, SUPPLIED } from "../../utils";
import AggTable from "../../components/AggTable";
import vaccinated from "./vaccinated.json";
import vaccine_supply from "./vaccine_supply.json";

export const EPI = ({ data }: { data: any }) => {
    return (
        <Stack spacing="40px">
            <Stack>
                <Text fontWeight="bold">People vaccinated</Text>
                <AggTable
                    refugeeColumns={[REFUGEE_NATIONAL, EPI_AGE]}
                    rows={vaccinated}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Vaccine Supply</Text>
                <AggTable
                    refugeeColumns={[[ADMINISTERED, SUPPLIED]]}
                    rows={vaccine_supply}
                    data={data}
                />
            </Stack>
        </Stack>
    );
};

import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import AggTable from "../../components/AggTable";
import { ADMINISTERED, EPI_AGE, REFUGEE_NATIONAL, SUPPLIED } from "../../utils";
import vaccinated from "./vaccinated.json";
import vaccine_supply from "./vaccine_supply.json";

export const EPI = ({ data }: { data: any }) => {
    return (
        <Stack spacing="20px">
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

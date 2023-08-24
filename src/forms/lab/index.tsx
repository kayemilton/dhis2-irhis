import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import AggTable from "../../components/AggTable";
import { DONE, POSITIVE } from "../../utils";

export const LAB = ({ data }: { data: any }) => {
    return (
        <Stack spacing="20px">
            <AggTable
                refugeeColumns={[[{ id: "", name: "Total" }]]}
                rows={[
                    {
                        id: "LAB_TS_all_lab_tests_performed",
                        name: "Number of all lab tests performed",
                    },
                ]}
                data={data}
                onlyRow
            />
            <Stack>
                <Text fontWeight="bold">Malaria (microscopy)</Text>
                <AggTable
                    refugeeColumns={[
                        [
                            {
                                id: "LAB_TS_laboratory_malaria_blood_slide_total",
                                name: "Total",
                            },
                        ],
                    ]}
                    rows={[DONE, POSITIVE]}
                    data={data}
                    reverse
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Malaria (RDT)</Text>
                <AggTable
                    refugeeColumns={[
                        [
                            {
                                id: "LAB_TS_laboratory_rdt_malaria_total",
                                name: "Total",
                            },
                        ],
                    ]}
                    rows={[DONE, POSITIVE]}
                    data={data}
                    reverse
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Tuberculosis</Text>
                <AggTable
                    refugeeColumns={[
                        [
                            {
                                id: "LAB_TS_laboratory_tb_sputum_total",
                                name: "Total",
                            },
                        ],
                    ]}
                    rows={[DONE, POSITIVE]}
                    data={data}
                    reverse
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Blood donation HIV</Text>
                <AggTable
                    refugeeColumns={[
                        [
                            {
                                id: "LAB_TS_laboratory_blood_units_tested_hiv_slide_total",
                                name: "Total",
                            },
                        ],
                    ]}
                    rows={[DONE, POSITIVE]}
                    data={data}
                    reverse
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Blood donation Syphilis</Text>
                <AggTable
                    refugeeColumns={[
                        [
                            {
                                id: "LAB_TS_laboratory_blood_units_tested_Syphilis_slide_total",
                                name: "Total",
                            },
                        ],
                    ]}
                    rows={[DONE, POSITIVE]}
                    data={data}
                    reverse
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Syphilis Testing (OPD)</Text>
                <AggTable
                    refugeeColumns={[
                        [
                            {
                                id: "LAB_TS_laboratory_syphilis_opd_total",
                                name: "Total",
                            },
                        ],
                    ]}
                    rows={[DONE, POSITIVE]}
                    data={data}
                    reverse
                />
            </Stack>
        </Stack>
    );
};

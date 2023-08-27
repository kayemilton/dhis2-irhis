import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Dictionary } from "lodash";
import React from "react";

export default function AggTable2({
    columns,
    rows,
    data,
    reverse,
    onlyRow,
}: {
    columns: Array<
        Array<{ id: string; name: string; span?: number; row?: number }>
    >;
    rows: Array<any>;
    data: Dictionary<{ value: string; expression: string }>;
    reverse?: boolean;
    onlyRow?: boolean;
}) {
    return (
        <Box h="100%" w="100%">
            <Box overflow="auto" whiteSpace="nowrap">
                <Table variant="unstyled" size="sm">
                    <Thead>
                        {columns.map((col, index) => (
                            <Tr key={index}>
                                {index === 0 && (
                                    <Th
                                        borderColor="#DDDDDD"
                                        borderWidth="thin"
                                        borderStyle="solid"
                                        rowSpan={columns.length}
                                        textTransform="none"
                                    ></Th>
                                )}
                                {col.map((col) => (
                                    <Th
                                        borderColor="#DDDDDD"
                                        borderWidth="thin"
                                        borderStyle="solid"
                                        colSpan={col.span}
                                        rowSpan={col.row}
                                        textAlign="center"
                                        textTransform="none"
                                        key={col.id}
                                    >
                                        {col.name}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {rows.map(({ name, id }: any) => (
                            <Tr key={name}>
                                <Td
                                    borderColor="#DDDDDD"
                                    borderWidth="thin"
                                    borderStyle="solid"
                                >
                                    {name}
                                </Td>

                                {columns[columns.length - 1].map((col) => {
                                    let finalKey = `${id}_${col.id}`;
                                    if (
                                        id === "IPD_TS" &&
                                        [
                                            "Nat_5_17_yrs",
                                            "Nat_18_59_yrs",
                                            "Nat_gt_60_yrs",
                                            "Nat_total_crude",
                                        ].indexOf(col.id) !== -1
                                    ) {
                                        finalKey = `${id}__${col.id}`;
                                    } else if (
                                        id ===
                                            "HIV_HIV_ART_number_at_the_end_of_reporting_period" &&
                                        col.id.indexOf("Nat_") !== -1
                                    ) {
                                        finalKey = `HIV_number_at_the_end_of_reporting_period_HIV_ART_${col.id}`;
                                    }
                                    if (reverse) {
                                        finalKey = `${col.id}_${id}`;
                                    }
                                    if (onlyRow) {
                                        finalKey = id;
                                    }
                                    return (
                                        <Td
                                            key={`${id}_${col.id}`}
                                            borderColor="#DDDDDD"
                                            borderWidth="thin"
                                            borderStyle="solid"
                                            textAlign="center"
                                            title={JSON.stringify(
                                                data[finalKey]?.expression,
                                                null,
                                                2
                                            )}
                                        >
                                            {data[finalKey]?.value}
                                            {/* {finalKey} */}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
}

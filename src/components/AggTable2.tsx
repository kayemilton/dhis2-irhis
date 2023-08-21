import { Stack, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Dictionary } from "lodash";
import React from "react";

export default function AggTable2({
    columns,
    rows,
    data,
    reverse,
    onlyRow,
}: {
    columns: Array<Array<{ id: string; name: string; span?: number }>>;
    rows: Array<any>;
    data: Dictionary<{ value: string; expression: string }>;
    reverse?: boolean;
    onlyRow?: boolean;
}) {
    return (
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
                                textAlign="center"
                                textTransform="none"
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
    );
}

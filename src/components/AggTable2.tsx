import { Stack, Table, Tbody, Td, Th, Thead, Tr, Box } from "@chakra-ui/react";
import { Dictionary } from "lodash";
import React from "react";
import { useElementSize } from "usehooks-ts";

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
    const [squareRef, { height, width }] = useElementSize();

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

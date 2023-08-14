import {
    Stack,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { findMerged } from "../utils";
import { Dictionary } from "lodash";

export default function AggTable({
    refugeeColumns,
    nationalColumns,
    rows,
    data,
    reverse,
    onlyRow,
}: {
    refugeeColumns: Array<Array<{ id: string; name: string; span?: number }>>;
    nationalColumns?: Array<Array<{ id: string; name: string; span?: number }>>;
    rows: Array<any>;
    data: Dictionary<{ value: string; expression: string }>;
    reverse?: boolean;
    onlyRow?: boolean;
}) {
    const refugees = findMerged(refugeeColumns);
    const nationals =
        nationalColumns !== undefined ? findMerged(nationalColumns) : undefined;
    return (
        <Stack>
            <Table variant="unstyled" size="sm">
                <Thead>
                    {refugees.map((col, index) => (
                        <Tr key={index}>
                            {index === 0 && (
                                <Th
                                    borderColor="#DDDDDD"
                                    borderWidth="thin"
                                    borderStyle="solid"
                                    rowSpan={refugees.length}
                                ></Th>
                            )}
                            {col.map((col) => (
                                <Th
                                    borderColor="#DDDDDD"
                                    borderWidth="thin"
                                    borderStyle="solid"
                                    colSpan={col.span}
                                    textAlign="center"
                                >
                                    {col.name}
                                </Th>
                            ))}

                            {nationals !== undefined && index < nationals.length
                                ? nationals[index].map((col) => (
                                      <Th
                                          borderColor="#DDDDDD"
                                          borderWidth="thin"
                                          borderStyle="solid"
                                          colSpan={col.span}
                                          rowSpan={
                                              index === nationals.length - 1
                                                  ? refugees.length -
                                                    nationals.length +
                                                    1
                                                  : 1
                                          }
                                          textAlign="center"
                                      >
                                          {col.name}
                                      </Th>
                                  ))
                                : null}
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

                            {refugees.length > 0 &&
                                refugees[refugees.length - 1].map((col) => {
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
                                        </Td>
                                    );
                                })}

                            {nationals !== undefined
                                ? nationals[nationals.length - 1].map((col) => {
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
                                              title={data[finalKey]?.expression}
                                          >
                                              {data[finalKey]?.value}
                                          </Td>
                                      );
                                  })
                                : null}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Stack>
    );
}

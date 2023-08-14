import React from "react";
import {
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Stack,
    Spinner,
} from "@chakra-ui/react";
import dayjs from "dayjs";

import { useHistory } from "../queries";

export default function History() {
    const { error, isError, isLoading, isSuccess, data } = useHistory();
    return (
        <Stack>
            {isLoading && <Spinner />}
            {isSuccess && data && (
                <Stack overflow="auto" h="calc(100vh - 300px)">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Facility</Th>
                                <Th>Date</Th>
                                <Th w="100px">Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((status: any) => (
                                <Tr key={name}>
                                    <Td>{status["HF"]}</Td>
                                    <Td>{dayjs(status["date"]).format()}</Td>
                                    <Td
                                        bg={
                                            status["status"] !== 200
                                                ? "red"
                                                : "green.400"
                                        }
                                    >
                                        {status["status"]}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Stack>
            )}
            {isError && <pre>{JSON.stringify(error)}</pre>}
        </Stack>
    );
}

import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";

export default function TableHeader() {
    return (
        <Thead>
            <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
            </Tr>
        </Thead>
    );
}

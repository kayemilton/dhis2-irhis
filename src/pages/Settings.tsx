import {
    Box,
    Button,
    Input,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useDataEngine } from "@dhis2/app-runtime";
import React, { ChangeEvent, useState } from "react";
import History from "../components/History";
export default function Settings({
    data,
}: {
    data: { username: string; password: string; baseURL: string };
}) {
    const toast = useToast();
    const [user, setUser] = useState<{
        username: string;
        password: string;
        baseURL: string;
    }>(data);
    const engine = useDataEngine();

    const saveSetting = async () => {
        const mutation: any = {
            resource: "dataStore/irhis/user",
            data: user,
        };
        try {
            await engine.query({
                data: {
                    resource: "dataStore/irhis/user",
                },
            });
            engine.mutate({ ...mutation, type: "update" });
        } catch (error) {
            engine.mutate({ ...mutation, type: "create" });
        }

        toast({
            title: "Settings",
            description: `Settings saved successfully`,
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };

    return (
        <Tabs>
            <TabList>
                <Tab>Settings</Tab>
                <Tab>Sync History</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Stack spacing="40px">
                        <Stack w="40%">
                            <Text fontWeight="bold" fontSize="xl">
                                iRHIS API Authentication
                            </Text>

                            <Stack>
                                <Text>URL</Text>
                                <Input
                                    value={user.baseURL}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setUser((prev) => ({
                                            ...prev,
                                            baseURL: e.target.value,
                                        }));
                                        e.persist();
                                    }}
                                />
                            </Stack>
                            <Stack>
                                <Text>Username</Text>
                                <Input
                                    value={user.username}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setUser((prev) => ({
                                            ...prev,
                                            username: e.target.value,
                                        }));
                                        e.persist();
                                    }}
                                />
                            </Stack>
                            <Stack>
                                <Text>Password</Text>
                                <Input
                                    type="password"
                                    value={user.password}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setUser((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }));
                                        e.persist();
                                    }}
                                />
                            </Stack>
                        </Stack>
                        {/* <Stack>
                            <Text fontWeight="bold" fontSize="xl">
                                Synchronization
                            </Text>
                            <FormControl display="flex" alignItems="center">
                                <FormLabel htmlFor="email-alerts" mb="0">
                                    Auto Sync
                                </FormLabel>

                                <Switch />
                            </FormControl>
                        </Stack> */}
                        <Box>
                            <Button onClick={() => saveSetting()}>
                                Save Settings
                            </Button>
                        </Box>
                    </Stack>
                </TabPanel>
                <TabPanel>
                    <History />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

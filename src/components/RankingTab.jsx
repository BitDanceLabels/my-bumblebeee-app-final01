import React from "react";
import PersonalRanking from "./personalRank/PersonalRanking";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const RankingTab = ({ students }) => {
    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>Tuần</Tab>
                    <Tab>Tháng</Tab>
                </TabList>

                <TabPanel>
                    {students?.map((item) => (
                        <PersonalRanking data={item} />

                    ))}
                </TabPanel>
                <TabPanel>
                    {students?.map((item) => (
                        <PersonalRanking data={item} />

                    ))}
                </TabPanel>
            </Tabs>

        </>
    )
}

export default RankingTab;
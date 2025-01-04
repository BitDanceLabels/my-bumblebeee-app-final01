import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from "react-router-dom";
const TabComponents = ({ students }) => {
    const gradient = ['bg-gradient-to-r from-cyan-500 to-blue-500', 'bg-gradient-to-r from-sky-500 to-indigo-500',
        'bg-gradient-to-r from-violet-500 to-fuchsia-500', 'bg-gradient-to-r from-purple-500 to-pink-500']

    const content = ['Âm nhạc', 'Video', 'Quảng cáo', 'Học tập']

    return (
        <div className="w-full md:w-2/3 md:max-h-full h-fit bg-white rounded-lg p-4">
            <Tabs>
                <TabList>
                    <Tab>Thịnh hành, xu hướng</Tab>
                    <Tab>Cá nhân</Tab>
                </TabList>

                <TabPanel>
                    {students?.map((item, idx) => idx < 4 && (
                        <p className={`w-full cursor-pointer rounded-lg my-2 text-white p-2 ${gradient[idx]}`}>{content[idx]}</p>
                    ))}
                </TabPanel>
                <TabPanel>
                    <div className="w-full max-h-[40vh] md:max-h-full overflow-y-auto">
                        <table id="myTable" className='w-full mt-3 stutable'>
                            <tbody>
                                {students.map((stu, idx) => (
                                    <tr key={stu.id}>

                                        <td className='p-2'>{stu.id}</td>
                                        <td className='p-2'>
                                            <Link to={`/object-user/${stu.id}`} className='flex items-center'>
                                                <img src={stu.url} alt="" className='w-10 h-10 rounded-full object-center object-cover' />
                                                <span className='text-light ms-2'>{stu.name}</span>
                                            </Link>
                                        </td>
                                        <td className="hidden md:flex md:p-4">{stu.idObj ? stu.idObj : "None"}</td>
                                        <td>{stu.email}</td>
                                        <td className="hidden md:flex md:p-4">{stu.type ? stu.type : "None"}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default TabComponents;
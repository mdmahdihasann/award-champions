"use client"

import { Button, Drawer, Select } from 'antd';
import { useEffect, useState } from 'react';
import { LuSlidersHorizontal } from 'react-icons/lu';
const HistoryModal = ({ isOpen, onClose, historyData, selectedYear, selectedQuarter, onApply }) => {
    const [year, setYear] = useState(null);
    const [quarter, setQuarter] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setYear(selectedYear);
            setQuarter(selectedQuarter)
        }
    }, [isOpen, selectedYear, selectedQuarter])

    const handleApply = () => {
        onApply({
            year,
            quarter
        })
        onClose();
    }

    return (
        <>

            <Drawer
                title={
                    <div className="flex items-center gap-2">
                        <LuSlidersHorizontal className="text-lg" />
                        <span>Filter History</span>
                    </div>
                }
                closable
                onClose={onClose}
                placement="right"
                open={isOpen}
            >
                <div className="flex flex-col gap-4">

                    <div>
                        <label className="text-sm font-medium">Year</label>
                        <Select
                            placeholder="Select Year"
                            className="w-full mt-1"
                            allowClear
                            value={year === null ? historyData?.selected_year : year}
                            onChange={(value) => setYear(value)}
                            options={historyData?.available_years?.map((y) => ({
                                value: y,
                                label: y,
                            }))}
                        />
                    </div>



                    <div>
                        <label className="text-sm font-medium">Quarter</label>
                        <Select
                            placeholder="Select Quarter"
                            className="w-full mt-1"
                            allowClear
                            onChange={(value) => setQuarter(value)}
                            value={quarter === null ? historyData?.selected_quarter : quarter}
                            options={historyData?.available_quarters?.map((q) => ({
                                value: q,
                                label: q,
                            }))}
                        />
                    </div>

                    <Button
                        type="primary"
                        className="mt-4 bg-[--primary-color]"
                        block
                        onClick={handleApply}
                    >
                        Apply Filter
                    </Button>

                </div>
            </Drawer>
        </>
    );
};
export default HistoryModal;
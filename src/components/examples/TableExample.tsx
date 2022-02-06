import { useEffect } from 'react';
import { Table } from '../table/Table';
import { ITableData } from '../table/types/ITable';
import { useTable } from '../table/useTable';
import { IExampleData, createExampleColumns, createArrayOfExampleData } from './exampleData';

const exampleColumns = createExampleColumns();
const exampleData = createArrayOfExampleData();

export const TableExample = () => {
    const { table, setTableData } = useTable<IExampleData>();

    useEffect(() => {
        const tableData: ITableData<IExampleData> = {
            columns: exampleColumns,
            data: exampleData,
            rowIdFn: (data: IExampleData) => data.id,
        };
        setTableData(tableData);
    }, [setTableData]);

    return (
        <Table table={table} />
    );
};

export default TableExample;

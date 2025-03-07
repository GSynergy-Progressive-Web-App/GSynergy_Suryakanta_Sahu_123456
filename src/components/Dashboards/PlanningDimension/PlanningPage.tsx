import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { RootState, AppDispatch } from '../../../redux/store';
import { updateSalesUnits } from '../../../redux/Slice/dataSlice';
import {
  ColDef,
  ColGroupDef,
  ValueGetterParams,
  CellClassParams,
  CellValueChangedEvent,
} from 'ag-grid-community';

interface DataItem {
  store: string;
  sku: string;
  price: number;
  cost: number;
  [key: string]: string | number; // Allow dynamic week fields
}

const PlanningPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.data.data);

  // Handle cell value changes
  const onCellValueChanged = (params: CellValueChangedEvent<DataItem>) => {
    if (params.colDef.field?.includes('_salesUnits')) {
      dispatch(
        updateSalesUnits({
          rowIndex: params.node?.rowIndex ?? 0, // Ensure rowIndex is a number
          value: params.newValue as number,
          week: params.colDef.field.split('_')[0],
        })
      );
    }
  };

  // Generate column definitions dynamically
  const generateColumns = (): (ColDef<DataItem> | ColGroupDef<DataItem>)[] => {
    const months: Record<string, string[]> = {
      January: ['Week01', 'Week02', 'Week03', 'Week04'],
      February: ['Week05', 'Week06', 'Week07', 'Week08'],
      March: ['Week09', 'Week10', 'Week11', 'Week12'],
    };

    const columns: (ColDef<DataItem> | ColGroupDef<DataItem>)[] = [
      { field: 'store', headerName: 'Store', pinned: 'left', width: 120 },
      { field: 'sku', headerName: 'SKU', pinned: 'left', width: 120 },
    ];

    Object.entries(months).forEach(([month, weeks]) => {
      const monthGroup: ColGroupDef<DataItem> = {
        headerName: month,
        children: weeks.flatMap((week) => [
          {
            field: `${week}_salesUnits`,
            headerName: 'Sales Units',
            editable: true,
            type: 'numericColumn',
            width: 120,
          },
          {
            field: `${week}_salesDollars`,
            headerName: 'Sales Dollars',
            valueGetter: (params: ValueGetterParams<DataItem>): string => {
              const salesUnits =
                (params.data?.[`${week}_salesUnits`] as number) || 0;
              const price = params.data?.price || 0;
              return `$${(salesUnits * price).toFixed(2)}`;
            },
            width: 140,
          },
          {
            field: `${week}_gmDollars`,
            headerName: 'GM Dollars',
            valueGetter: (params: ValueGetterParams<DataItem>): string => {
              const salesUnits =
                (params.data?.[`${week}_salesUnits`] as number) || 0;
              const price = params.data?.price || 0;
              const cost = params.data?.cost || 0;
              return `$${(salesUnits * price - salesUnits * cost).toFixed(2)}`;
            },
            width: 140,
          },
          {
            field: `${week}_gmPercent`,
            headerName: 'GM %',
            valueGetter: (params: ValueGetterParams<DataItem>): string => {
              const salesUnits =
                (params.data?.[`${week}_salesUnits`] as number) || 0;
              const price = params.data?.price || 0;
              const cost = params.data?.cost || 0;
              const salesDollars = salesUnits * price;
              const gmDollars = salesDollars - salesUnits * cost;
              return salesDollars
                ? `${((gmDollars / salesDollars) * 100).toFixed(2)}%`
                : '0%';
            },
            cellStyle: (params: CellClassParams) => {
              const value = parseFloat(params.value);
              if (value >= 40)
                return { backgroundColor: 'green', color: 'white' };
              if (value >= 10)
                return { backgroundColor: 'yellow', color: 'black' };
              if (value > 5)
                return { backgroundColor: 'orange', color: 'white' };
              return { backgroundColor: 'red', color: 'white' };
            },
            width: 100,
          },
        ]),
      };
      columns.push(monthGroup);
    });

    return columns;
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: 600,
        width: '100%',
        overflowX: 'auto',
      }}
    >
      <AgGridReact
        rowData={data}
        columnDefs={generateColumns()}
        onCellValueChanged={onCellValueChanged}
        defaultColDef={{
          resizable: true,
          minWidth: 100,
          flex: 1,
        }}
        domLayout="autoHeight"
        suppressHorizontalScroll={false}
      />
    </div>
  );
};

export default PlanningPage;

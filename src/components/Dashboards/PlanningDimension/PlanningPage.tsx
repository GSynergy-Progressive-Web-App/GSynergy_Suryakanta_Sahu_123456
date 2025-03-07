import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { RootState, AppDispatch } from '../../../redux/store';
import { updateSalesUnits } from '../../../redux/Slice/dataSlice';

const PlanningPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.data.data);

  const onCellValueChanged = (params: any) => {
    if (params.colDef.field?.includes('_salesUnits')) {
      dispatch(
        updateSalesUnits({
          rowIndex: params.node.rowIndex,
          value: params.newValue,
          week: params.colDef.field.split('_')[0],
        })
      );
    }
  };

  const generateColumns = () => {
    const months = {
      January: ['Week01', 'Week02', 'Week03', 'Week04'],
      February: ['Week05', 'Week06', 'Week07', 'Week08'],
      March: ['Week09', 'Week10', 'Week11', 'Week12'],
    };

    const columns: any[] = [
      { field: 'store', headerName: 'Store', pinned: 'left', width: 120 },
      { field: 'sku', headerName: 'SKU', pinned: 'left', width: 120 },
    ];

    Object.entries(months).forEach(([month, weeks]) => {
      columns.push({
        headerName: month,
        children: weeks.map((week) => ({
          headerName: week,
          children: [
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
              valueGetter: (params: any): string => {
                const salesUnits = params.data?.[`${week}_salesUnits`] || 0;
                const price = params.data?.price || 0;
                return `$${(salesUnits * price).toFixed(2)}`;
              },
              width: 140,
            },
            {
              field: `${week}_gmDollars`,
              headerName: 'GM Dollars',
              valueGetter: (params: any): string => {
                const salesUnits = params.data?.[`${week}_salesUnits`] || 0;
                const price = params.data?.price || 0;
                const cost = params.data?.cost || 0;
                return `$${(salesUnits * price - salesUnits * cost).toFixed(
                  2
                )}`;
              },
              width: 140,
            },
            {
              field: `${week}_gmPercent`,
              headerName: 'GM %',
              valueGetter: (params: any): string => {
                const salesUnits = params.data?.[`${week}_salesUnits`] || 0;
                const price = params.data?.price || 0;
                const cost = params.data?.cost || 0;
                const salesDollars = salesUnits * price;
                const gmDollars = salesDollars - salesUnits * cost;
                return salesDollars
                  ? `${((gmDollars / salesDollars) * 100).toFixed(2)}%`
                  : '0%';
              },
              cellStyle: (params: any) => {
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
          ],
        })),
      });
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

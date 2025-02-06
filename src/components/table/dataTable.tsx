import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

type DataType = {
  id: number;
  userId: number;
  title: string;
};

type DataTableProps = {
  url: string;
  searchParam?: { column: string; param: string; scope: string };
};

const DataTable: React.FC<DataTableProps> = ({ url, searchParam }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError("Failed to fetch data");
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    if (!searchParam) {
      setFilteredData(data);
    } else {
      const { column, param, scope } = searchParam;
      if (column === "any") {
        const filtered = data.filter((item) =>
          Object.values(item).some((value) =>
            scope === "exact"
              ? String(value).toLowerCase() === param.toLowerCase()
              : String(value).toLowerCase().includes(param.toLowerCase())
          )
        );
        setFilteredData(filtered);
      } else {
        const filtered = data.filter((item) =>
          scope === "exact"
            ? String(item[column]).toLowerCase() === param.toLowerCase()
            : String(item[column]).toLowerCase().includes(param.toLowerCase())
        );
        setFilteredData(filtered);
      }
    }
  }, [data, searchParam]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "userId", headerName: "User ID", width: 70 },
    {
      field: "title",
      headerName: "Title",
      width: 500,
      valueGetter: (value, row) => row.title,
    },
  ];

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) return <CircularProgress />;
  if (error)
    return (
      <div>
        <p>{error}</p>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </div>
    );

  return (
    <DataGrid
      rows={filteredData}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 25,
          },
        },
      }}
      disableRowSelectionOnClick
      disableColumnFilter
      disableColumnMenu
    />
  );
};

export default DataTable;

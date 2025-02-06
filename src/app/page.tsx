"use client";

import { useState } from "react";
import DataTable from "@/components/table/dataTable";
import Footer from "@/components/common/footer/footer";
import DataFilter from "@/components/table/dataFilter";
import Grid from "@mui/material/Grid2";
import styles from "./page.module.scss";
import Header from "@/components/common/header/header";

export default function Home() {
  const [filterParams, setFilterParams] = useState({
    column: "any",
    param: "",
    scope: "contains",
  });
  const handleFilterChange = (filter: {
    column: string;
    param: string;
    scope: string;
  }) => {
    setFilterParams(filter);
  };

  return (
    <div className={styles.page}>
      <Header />
      <Grid className={styles.grid} container spacing={2}>
        <Grid className={styles.filterColumn} size={{ xs: 12, md: 4, lg: 3 }}>
          <DataFilter onFilterChange={handleFilterChange} />
        </Grid>
        <Grid className={styles.mainColumn} size={{ xs: 12, md: 8, lg: 9 }}>
          <main className={styles.main}>
            <DataTable
              url="https://jsonplaceholder.typicode.com/todos"
              searchParam={filterParams}
            />
          </main>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

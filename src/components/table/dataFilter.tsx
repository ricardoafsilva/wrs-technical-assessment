import { useState } from "react";
import {
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import "./dataFilter.scss";

interface DataFilterProps {
  onFilterChange: (filter: {
    column: string;
    param: string;
    scope: string;
  }) => void;
}

export default function DataFilter({ onFilterChange }: DataFilterProps) {
  const [searchColumn, setSearchColumn] = useState("any");
  const [searchParam, setSearchParam] = useState("");
  const [searchScope, setSearchScope] = useState("contains");

  const handleSearchColumnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFilterChange({
      column: event.target.value,
      param: searchParam,
      scope: searchScope,
    });
    setSearchColumn(event.target.value);
  };

  const handleSearchParamChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFilterChange({
      column: searchColumn,
      param: event.target.value,
      scope: searchScope,
    });
    setSearchParam(event.target.value);
  };

  const handleSearchScopeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFilterChange({
      column: searchColumn,
      param: searchParam,
      scope: event.target.value,
    });
    setSearchScope(event.target.value);
  };

  return (
    <Stack className="filterStack" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
      <div>
        <Typography variant="body1">Column</Typography>
        <RadioGroup
          aria-label="column"
          name="column"
          value={searchColumn}
          onChange={handleSearchColumnChange}
          row
        >
          <FormControlLabel value="any" label="Any" control={<Radio />} />
          <FormControlLabel value="id" label="ID" control={<Radio />} />
          <FormControlLabel
            value="userId"
            label="User ID"
            control={<Radio />}
          />
          <FormControlLabel value="title" label="Title" control={<Radio />} />
        </RadioGroup>
      </div>
      <div>
        <Typography variant="body1">Scope</Typography>
        <RadioGroup
          aria-label="scope"
          name="scope"
          value={searchScope}
          onChange={handleSearchScopeChange}
          row
        >
          <FormControlLabel
            value="contains"
            label="Contains"
            control={<Radio />}
          />
          <FormControlLabel value="exact" label="Exact" control={<Radio />} />
        </RadioGroup>
      </div>
      <div>
        <TextField
          variant="outlined"
          value={searchParam}
          onChange={handleSearchParamChange}
          placeholder="Search..."
          fullWidth
        />
      </div>
    </Stack>
  );
}

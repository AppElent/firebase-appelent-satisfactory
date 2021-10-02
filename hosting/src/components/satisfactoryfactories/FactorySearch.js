import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const FactorySearch = ({
  search, setSearch, ...props
}) => (
  <Box {...props}>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box>
            <TextField
              fullWidth
              onChange={setSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search factories"
              value={search}
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default FactorySearch;

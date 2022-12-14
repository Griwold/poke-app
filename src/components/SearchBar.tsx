import { SetStateAction, FC, Dispatch } from 'react'
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton
} from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { styled } from '@mui/material/styles'

interface SearchBarType {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    onSearch: () => void;
}

const CustomInput = styled(OutlinedInput)`
    background-color: white;
    border-radius: 8px;
`

const SearchBar: FC<SearchBarType> = ({ text, setText, onSearch }) => {

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
            <InputLabel size='small' color='secondary' htmlFor="outlined-adornment-search">Search pokemon</InputLabel>
            <CustomInput
                id="outlined-adornment-search"
                size='small'
                color='secondary'
                value={text}
                onChange={(str) => setText(str.target.value)}
                onKeyUp={(e) => (e.key === 'Enter') && onSearch()}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="search"
                            edge="end"
                            onClick={onSearch}
                            onMouseDown={handleMouseDownPassword}
                        >
                            <SearchOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                }
                label="Search pokemon"
            />
        </FormControl>
    )
}

export default SearchBar
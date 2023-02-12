import { AsyncPaginate } from "react-select-async-paginate"
import { useState } from "react"
import { GEO_API_URL } from "../../api"
import { GEO_API_KEY } from "../../App";


const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null)

    const geoApiOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${GEO_API_KEY}`,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.region}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData)
        onSearchChange(searchData)
    }

    return (
        <AsyncPaginate
            placeholder="Buscar tu ciudad..."
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search
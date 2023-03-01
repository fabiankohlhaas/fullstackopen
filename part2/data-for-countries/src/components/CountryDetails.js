const CountryDetails = ({countryName, capital, area, languages, flag, alt}) => {
    const countryDetailsStyles = {
        margin: "0px",
        padding: "0px"
    }

    return (
        <div style={countryDetailsStyles}>
            <h1 className="countryDetails">{countryName}</h1>
            <p style={countryDetailsStyles}>capital {capital}</p>
            <p style={countryDetailsStyles}>area {area}</p>
            <h2>languages:</h2>
            <ul>
                {languages.map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={flag} alt={alt}></img>

        </div>
      
    
    )
}

export default CountryDetails
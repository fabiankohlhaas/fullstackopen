const CountryName = ({ countryName, setSelection }) => {
  const countryNameStyles = {
    margin: '0px',
    padding: '0px'
  }

  return (
    <div>
      <p style={countryNameStyles}>
        {countryName}
        <button onClick={() => setSelection(countryName)}>show</button>
      </p>
    </div>
  )
}

export default CountryName

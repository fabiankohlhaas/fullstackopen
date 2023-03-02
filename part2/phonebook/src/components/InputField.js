const InputField = ({ name, value, onChange }) => {
  return (
    <div>
      {name} <input value={value} onChange={onChange} />
    </div>
  )
}

export default InputField

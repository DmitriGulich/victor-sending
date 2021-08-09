const renderField = ({
    className,
    input,
    label,
    type,
    inline,
    meta: { touched, error, warning }
  }) => (
    <div className={inline}>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className={className}/>
        {touched &&
          ((error && <span className="input-error">{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

export default renderField;
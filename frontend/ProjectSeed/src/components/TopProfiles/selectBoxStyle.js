export const selectBoxStyle = () => {

    const customStyles = {
      container: (provided) => ({
        ...provided,
        width: '100%',
        fontWeight:"200",
        fontSize:"small",
      }),
      control: (provided) => ({
        ...provided,
        backgroundColor: 'var(--main-boxes-color)',
        border: 'none',
        boxShadow: 'none',
        borderRadius: '0.75rem',
        '&:hover': {
          border: 'none',
        },
        '&:focus': {
          outline: 'none',
        },
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: 'var(--main-boxes-color)',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }),
      menuList: (provided) => ({
        ...provided,
        padding: '0'
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? 'var(--secondary-boxes-color)'
          : 'var(--main-boxes-color)',
        color: 'var(--theme-text-color)',
        fontWeight: '200',
        '&:hover': {
          backgroundColor: 'var(--secondary-boxes-color)',
          color: 'var(--theme-text-color)',
        },
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: 'var(--main-boxes-color)', // Proper main box color for selected items
        borderRadius: '0.5rem',
        padding: '0.2rem 0.5rem',
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color: 'var(--theme-text-color)', // Proper theme text color in selected items
        fontWeight: 'bold',
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        color: 'red', // Red cross
        '&:hover': {
          backgroundColor: 'rgba(255, 0, 0, 0.2)', // Light red hover for the cross
          color: 'darkred', // Darker red hover effect
        },
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'var(--theme-text-color)', // Theme text color
      }),
      placeholder: (provided) => ({
        ...provided,
        color: 'var(--theme-text-color)', // Theme text color for placeholder
      }),
    };
  
    return customStyles;
  }
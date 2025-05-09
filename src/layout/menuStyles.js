export const getMenuItemStyle = (theme, isActive = false) => {
    const isDark = theme.palette.mode === 'dark';
  
    return {
      fontSize: '1.25rem',
      fontWeight: isActive ? 'bold' : '600',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      paddingY: 1.5,
      px: 2,
      borderRadius: '8px',
      textTransform: 'capitalize',
      transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
      backgroundColor: isActive
        ? isDark ? '#1976d2' : '#e3f2fd'
        : 'transparent',
      color: isActive
        ? isDark ? '#fff' : '#000'
        : isDark ? '#cfd8dc' : '#555',
      '& .MuiSvgIcon-root': {
        fontSize: '1.8rem',
        color: isActive
          ? isDark ? '#fff' : '#1976d2'
          : isDark ? '#cfd8dc' : '#888',
      },
      '&:hover': {
        backgroundColor: isDark
          ? 'rgba(33, 150, 243, 0.2)'
          : 'rgba(25, 118, 210, 0.08)',
        color: isDark ? '#fff' : '#000',
        '& .MuiSvgIcon-root': {
          color: isDark ? '#fff' : '#1976d2',
        },
      },
    };
  };
  